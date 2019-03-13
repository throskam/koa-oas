module.exports = (option = {}) => {
  return async (ctx, next) => {
    if (!ctx.state.oas.action) {
      return next()
    }

    await ctx.state.oas.action(ctx, next)

    ctx.state.oas.response = {
      mediaType: ctx.type || option.response.type,
      status: ctx.status,
      header: ctx.headerSent,
      content: ctx.body
    }

    return next()
  }
}
