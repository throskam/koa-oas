const compose = require('koa-compose')
const context = require('./middlewares/context')
const requestCoercer = require('./middlewares/requestCoercer')
const requestValidator = require('./middlewares/requestValidator')
const responseCoercer = require('./middlewares/responseCoercer')
const responseGenerator = require('./middlewares/responseGenerator')
const responseValidator = require('./middlewares/responseValidator')
const action = require('./middlewares/action')

module.exports = (document, controller = {}, option = {}) => {
  const setting = {
    request: {
      type: 'application/json',
      coercer: true,
      validator: true,
      ...option.request
    },
    response: {
      status: 200,
      type: 'application/json',
      coercer: true,
      validator: true,
      generator: true,
      ...option.response
    }
  }

  return compose([
    context(document, controller, setting),
    ...(setting.request.coercer ? [requestCoercer(setting)] : []),
    ...(setting.request.validator ? [requestValidator(setting)] : []),
    action(setting),
    ...(setting.response.generator ? [responseGenerator(setting)] : []),
    ...(setting.response.coercer ? [responseCoercer(setting)] : []),
    ...(setting.response.validator ? [responseValidator(setting)] : [])
  ])
}
