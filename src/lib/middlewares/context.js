const bath = require('bath').default
const oas = require('@throskam/oas-impl')

const resolver = (document) => {
  const parser = oas.parser()
  const dispatch = parser(document).then(definition => oas.dispatcher(definition))

  return async (method, path) => (await dispatch)(method, path)
}

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
  const resolve = resolver(document)
  const param = memoizer(template => bath(template).params)
  const impl = memoizer(operation => ({
    requestCoercer: oas.requestCoercer(operation),
    requestValidator: oas.requestValidator(operation),
    responseCoercer: oas.responseCoercer(operation),
    responseGenerator: oas.responseGenerator(operation),
    responseValidator: oas.responseValidator(operation)
  }))

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

    const route = await resolve(method, path)

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
      impl: impl(route.method + route.path, route.operation),
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
