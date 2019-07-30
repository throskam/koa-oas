const createRequestCoercerMiddleware = require('./requestCoercer')

const middleware = createRequestCoercerMiddleware()

it('should coerce the request', async () => {
  expect.assertions(3)

  const request = { key: '1' }
  const coercedRequest = { key: 1 }
  const requestCoercer = jest.fn().mockReturnValue(coercedRequest)
  const next = jest.fn()

  const ctx = {
    state: {
      oas: {
        request,
        impl: {
          requestCoercer
        }
      }
    }
  }

  await middleware(ctx, next)

  expect(requestCoercer).toHaveBeenCalled()
  expect(next).toHaveBeenCalled()

  expect(ctx.state.oas.request).toStrictEqual(coercedRequest)
})

it('should keep additional request properties', async () => {
  expect.assertions(1)

  const request = { key: '1', foo: 'bar' }
  const coercedRequest = { key: 1 }
  const requestCoercer = jest.fn().mockReturnValue(coercedRequest)
  const next = jest.fn()

  const ctx = {
    state: {
      oas: {
        request,
        impl: {
          requestCoercer
        }
      }
    }
  }

  await middleware(ctx, next)

  expect(ctx.state.oas.request).toStrictEqual({
    ...request,
    ...coercedRequest
  })
})
