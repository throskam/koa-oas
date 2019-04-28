module.exports = (option = {}) => {
  return async (ctx, next) => {
    if (ctx.state.oas.response) {
      return next()
    }

    ctx.state.oas.response = {
      mediaType: ctx.type || option.response.type,
      status: option.response.status
    }

    ctx.state.oas.response = {
      ...ctx.state.oas.response,
      ...ctx.state.oas.impl.responseGenerator(ctx.state.oas.response)
    }

    return next()
  }
}
