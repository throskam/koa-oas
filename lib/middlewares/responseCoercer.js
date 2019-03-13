module.exports = (option = {}) => {
  return async (ctx, next) => {
    if (!ctx.state.oas.response) {
      return next()
    }

    ctx.state.oas.response = {
      ...ctx.state.oas.response,
      ...ctx.state.oas.impl.responseCoercer(ctx.state.oas.response)
    }

    return next()
  }
}
