const createResponseCoercerMiddleware = require('./responseCoercer')

const middleware = createResponseCoercerMiddleware()

it('should do nothign when no response is defined', async () => {
  expect.assertions(1)

  const next = jest.fn()

  const ctx = {
    state: {
      oas: {}
    }
  }

  await middleware(ctx, next)

  expect(next).toHaveBeenCalled()
})

it('should coerce the response', async () => {
  expect.assertions(3)

  const response = { key: '1' }
  const coercedResponse = { key: 1 }
  const responseCoercer = jest.fn().mockReturnValue(coercedResponse)
  const next = jest.fn()

  const ctx = {
    state: {
      oas: {
        response,
        impl: {
          responseCoercer
        }
      }
    }
  }

  await middleware(ctx, next)

  expect(responseCoercer).toHaveBeenCalled()
  expect(next).toHaveBeenCalled()

  expect(ctx.state.oas.response).toStrictEqual(coercedResponse)
})

it('should keep additional response properties', async () => {
  expect.assertions(1)

  const response = { key: '1', foo: 'bar' }
  const coercedResponse = { key: 1 }
  const responseCoercer = jest.fn().mockReturnValue(coercedResponse)
  const next = jest.fn()

  const ctx = {
    state: {
      oas: {
        response,
        impl: {
          responseCoercer
        }
      }
    }
  }

  await middleware(ctx, next)

  expect(ctx.state.oas.response).toStrictEqual({
    ...response,
    ...coercedResponse
  })
})
