# OpenAPI Specification Koa Middleware

Koa middleware for OpenAPI v3 specification.

## Features

- OpenAPI v3
- request coercion
- request validation
- response coercion
- response generator
- response validation

## Installation

`npm install @throskam/koa-oas`

## Usage

```
const  Koa = require('koa')
const oas = require('@throskam/koa-oas')

const app = new Koa()

// Error handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    /**
     * Statuses:
     * 400: Invalid request, see err.errors for details
     * 404: No route found
     * 500: Invalid response, see err.errors for details
     * 501: No implementation
     */
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
})

const spec = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Hello API',
    license: {
      name: 'MIT'
    }
  },
  servers: [{
    'url': 'http://example.com/v1'
  }],
  paths: {
    '/hello/{name}': {
      get: {
        summary: 'Greets the given name',
        operationId: 'greeting',
        tags: [
          'greet'
        ],
        parameters: [
          {
            name: 'name',
            in: 'path',
            description: 'The name to greet',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Greeting',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                  example: 'Hello Steve!'
                }
              }
            }
          }
        }
      }
    }
  }
}

app.use(oas(spec, {
  //** Add or remove a '/' to toggle response generation.
  greeting: ctx => {
    ctx.body = `Hello ${ctx.state.oas.request.path.name}!`
  }
  //*/
}))

app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
   */
  console.log(err)
});

app.listen(3000)
```

## Documentation

See [DOC.md](DOC.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Roadmap

- [feature] mock (post, delete, ...)
- [feature] handle head request ?
- [feature] security middleware
- [test] memory leak, footprint, performance, ...
