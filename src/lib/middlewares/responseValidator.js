module.exports = (option = {}) => {
  return async (ctx, next) => {
    if (!ctx.state.oas.response) {
      return next()
    }

    const errors = ctx.state.oas.impl.responseValidator(ctx.state.oas.response)

    if (errors.length) {
      ctx.throw(500, { errors })
    }

    return next()
  }
}
