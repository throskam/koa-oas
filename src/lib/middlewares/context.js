const bath = require('bath').default
const oas = require('@throskam/oas-impl')

const memoizer = (fn) => {
  const cache = {}

  return (key, ...args) => {
    if (cache[key]) {
      return cache[key]
    }

    cache[key] = fn(...args)

    return cache[key]
  }
}

module.exports = (document, controller = {}, option = {}) => {
  const dispatch = oas(document, {
    format: option.format
  })

  const param = memoizer(template => bath(template).params)

  return async (ctx, next) => {
    // Normalize method.
    const method = ctx.method
      .trim()
      .toLowerCase()

    // Normalize path.
    const path = ctx.path
      .trim()
      .replace(/\/+$/, '') // remove trailing slash
      .replace(/^\/*/, '/') // add leading slash

    const route = await dispatch(method, path)

    if (!route) {
      ctx.throw(404)
    }

    ctx.state.oas = {
      definition: route.definition,
      operation: route.operation,
      request: {
        path: param(route.path, route.path)(ctx.path),
        query: { ...ctx.query },
        header: { ...ctx.headers },
        cookie: ctx.headers.cookie,
        content: ctx.body,
        mediaType: ctx.request.type || option.defaultRequestContentType
      },
      response: false,
      impl: route.impl,
      action: controller[route.operation.operationId]
    }

    await next()

    if (!ctx.state.oas.response) {
      ctx.throw(501)
    }

    ctx.set(ctx.state.oas.response.header)
    ctx.body = ctx.state.oas.response.content
  }
}
