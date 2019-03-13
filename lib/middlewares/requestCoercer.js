module.exports = (option = {}) => {
  return async (ctx, next) => {
    ctx.state.oas.request = {
      ...ctx.state.oas.request,
      ...ctx.state.oas.impl.requestCoercer(ctx.state.oas.request)
    }

    return next()
  }
}
