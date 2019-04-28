/**
 * @module koa-oas
 * @typicalname oas
 */

/**
 * Option.
 * @typedef {Object} Option
 * @property {Object} request
 * @property {string} request.type
 * @property {boolean} request.coercer
 * @property {boolean} request.validator
 * @property {Object} response
 * @property {number} response.status
 * @property {string} response.type
 * @property {boolean} response.coercer
 * @property {boolean} response.validator
 * @property {boolean} response.generator
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
