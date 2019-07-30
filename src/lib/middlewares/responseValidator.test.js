
const createResponseValidatorMiddleware = require('./responseValidator')

const middleware = createResponseValidatorMiddleware()

it('should do nothing when no response is defined', async () => {
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

it('should continue when no errors are returned', async () => {
  expect.assertions(2)

  const responseValidator = jest.fn().mockReturnValueOnce([])
  const next = jest.fn()

  const ctx = {
    state: {
      oas: {
        response: {},
        impl: {
          responseValidator
        }

      }
    }
  }

  await middleware(ctx, next)

  expect(responseValidator).toHaveBeenCalled()
  expect(next).toHaveBeenCalled()
})

it('should throw when errors are returned', async () => {
  expect.assertions(2)

  const errors = [{}, {}]
  const responseValidator = jest.fn().mockReturnValueOnce(errors)
  const next = jest.fn()

  const throw_ = jest.fn(() => {
    throw new Error()
  })

  const ctx = {
    throw: throw_,
    state: {
      oas: {
        response: {},
        impl: {
          responseValidator
        }

      }
    }
  }

  try {
    await middleware(ctx, next)
  } catch (err) {
    // ignore
  }

  expect(responseValidator).toHaveBeenCalled()
  expect(throw_).toHaveBeenCalledWith(500, { errors })
})
