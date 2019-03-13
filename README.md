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
import Koa from 'koa'
import oas from 'koa-oas'

const app = new Koa()

const controller = {
  getPets: ctx => ctx.body = 'getPets',
  getPet: ctx => ctx.body = 'getPet ' + ctx.state.oas.request.path.id
}

app.use(oas('/path/to/specification', controller))

app.listen(3000)
```

### Error handling

```
app.use((ctx, next) => {
  try {
    await next()
  } catch (err) {
    switch (err.code) {
      case 400:
        console.log('Invalid request', err.errors)
        break
      case 404:
        console.log('No route found')
        break
      case 500:
        console.log('Invalid response', err.errors)
        break
      case 501:
        console.log('No implementation found')
        break
    }
  }
})
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
