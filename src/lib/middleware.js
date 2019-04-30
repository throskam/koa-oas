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
    useRequestCoercer: true,
    useRequestValidator: true,
    useResponseGenerator: true,
    useResponseCoercer: true,
    useResponseValidator: true,
    defaultRequestContentType: 'application/json',
    defaultResponseContentType: 'application/json',
    ...option
  }

  return compose([
    context(document, controller, setting),
    ...(setting.useRequestCoercer ? [requestCoercer(setting)] : []),
    ...(setting.useRequestValidator ? [requestValidator(setting)] : []),
    action(setting),
    ...(setting.useResponseGenerator ? [responseGenerator(setting)] : []),
    ...(setting.useResponseCoercer ? [responseCoercer(setting)] : []),
    ...(setting.useResponseValidator ? [responseValidator(setting)] : [])
  ])
}
