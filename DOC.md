<a name="module_koa-oas"></a>

## koa-oas

* [koa-oas](#module_koa-oas)
    * [~middleware(document, controller, option)](#module_koa-oas..middleware) ⇒ <code>function</code>
    * [~Option](#module_koa-oas..Option) : <code>Object</code>

<a name="module_koa-oas..middleware"></a>

### koa-oas~middleware(document, controller, option) ⇒ <code>function</code>
Create a OpenAPI specification Koa middleware.

**Kind**: inner method of [<code>koa-oas</code>](#module_koa-oas)  
**Returns**: <code>function</code> - The Koa middleware  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>string</code> | Anything that swagger-parser may handle |
| controller | <code>Object</code> | Middlewares map with operation id as key |
| option | <code>module:koa-oas~option</code> | The option map |

<a name="module_koa-oas..Option"></a>

### koa-oas~Option : <code>Object</code>
Option.

**Kind**: inner typedef of [<code>koa-oas</code>](#module_koa-oas)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| useRequestCoercer | <code>boolean</code> | Use the request coercer [true] |
| useRequestValidator | <code>boolean</code> | Use the request validator [true] |
| useResponseGenerator | <code>boolean</code> | Use the response generator [true] |
| useResponseCoercer | <code>boolean</code> | Use the response coercer [true] |
| useResponseValidator | <code>boolean</code> | Use the response validator [true] |
| defaultRequestContentType | <code>string</code> | The default request content type when no specified [application/json] |
| defaultResponseContentType | <code>string</code> | The default response content type when no specified [application/json] |
| format | <code>string</code> | The format map (see [@throskam/oas-impl](https://github.com/throskam/oas-impl/blob/master/DOC.md#option--object)) |

