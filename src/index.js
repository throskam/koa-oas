/**
 * @module koa-oas
 * @typicalname oas
 */

/**
 * Option.
 * @typedef {Object} Option
 * @property {boolean} useRequestCoercer - Use the request coercer [true]
 * @property {boolean} useRequestValidator - Use the request validator [true]
 * @property {boolean} useResponseGenerator - Use the response generator [true]
 * @property {boolean} useResponseCoercer - Use the response coercer [true]
 * @property {boolean} useResponseValidator - Use the response validator [true]
 * @property {string} defaultRequestContentType - The default request content type when no specified [application/json]
 * @property {string} defaultResponseContentType - The default response content type when no specified [application/json]
 */

/**
 * Create a OpenAPI specification Koa middleware.
 * @function middleware
 * @param {string} document - Anything that swagger-parser may handle
 * @param {Object} controller - Middlewares map with operation id as key
 * @param {module:koa-oas~option} option - The option map
 * @returns {function} The Koa middleware
 */
module.exports = require('./lib/middleware')
