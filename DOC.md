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

| Name | Type |
| --- | --- |
| request | <code>Object</code> | 
| request.type | <code>string</code> | 
| request.coercer | <code>boolean</code> | 
| request.validator | <code>boolean</code> | 
| response | <code>Object</code> | 
| response.status | <code>number</code> | 
| response.type | <code>string</code> | 
| response.coercer | <code>boolean</code> | 
| response.validator | <code>boolean</code> | 
| response.generator | <code>boolean</code> | 

