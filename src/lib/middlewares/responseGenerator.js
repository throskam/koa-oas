module.exports = (option = {}) => {
  return async (ctx, next) => {
    if (ctx.state.oas.response) {
      return next()
    }

    ctx.state.oas.response = {
      status: 200,
      mediaType: option.defaultResponseContentType,
      ...ctx.state.oas.impl.responseGenerator({
        status: 200,
        mediaType: option.defaultResponseContentType
      })
    }

    return next()
  }
}
