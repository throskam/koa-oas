module.exports = (option = {}) => {
  return async (ctx, next) => {
    const errors = ctx.state.oas.impl.requestValidator(ctx.state.oas.request)

    if (errors.length) {
      ctx.throw(400, errors)
    }

    return next()
  }
}
