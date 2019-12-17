module.exports = (option = {}) => {
  return async (ctx, next) => {
    if (ctx.state.oas.response) {
      return next()
    }

    const responses = ctx.state.oas.operation.responses
    const statusKeys = Object.keys(responses)
    const numericals = statusKeys.filter(Number)
    const successes = numericals.filter(n => n >= 200 && n < 300)
    const redirections = numericals.filter(n => n >= 300 && n < 400)

    // Choose the most approriate status key (2XX, 3XX, default or first)
    const statusKey = successes.length ? Math.min(successes)
      : responses['2XX'] ? '2XX'
        : redirections.length ? Math.min(redirections)
          : responses['3XX'] ? '3XX'
            : responses['default'] ? 'default'
              : statusKeys[0]

    // Choose the most appropriate media type (default or first)
    const mediaType = !responses[statusKey].content ? undefined
      : responses[statusKey].content[option.defaultResponseContentType] ? option.defaultResponseContentType
        : Object.keys(responses[statusKey].content)[0]

    // Convert the status key to a valid status code.
    const status = !isNaN(Number(statusKey)) ? Number(statusKey)
      : statusKey.includes('XX') ? statusKey.slice(0, 1) * 100
        : 200

    ctx.state.oas.response = {
      status,
      mediaType,
      ...ctx.state.oas.impl.responseGenerator({
        status,
        mediaType
      })
    }

    return next()
  }
}
