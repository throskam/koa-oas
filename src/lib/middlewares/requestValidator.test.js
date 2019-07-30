const createRequestValidatorMiddleware = require('./requestValidator')

const middleware = createRequestValidatorMiddleware()

it('should continue when no errors are returned', async () => {
  expect.assertions(2)

  const requestValidator = jest.fn().mockReturnValueOnce([])
  const next = jest.fn()

  const ctx = {
    state: {
      oas: {
        impl: {
          requestValidator
        }

      }
    }
  }

  await middleware(ctx, next)

  expect(requestValidator).toHaveBeenCalled()
  expect(next).toHaveBeenCalled()
})

it('should throw when errors are returned', async () => {
  expect.assertions(2)

  const errors = [{}, {}]
  const requestValidator = jest.fn().mockReturnValueOnce(errors)
  const next = jest.fn()
  const throw_ = jest.fn(() => {
    throw new Error()
  })

  const ctx = {
    throw: throw_,
    state: {
      oas: {
        impl: {
          requestValidator
        }

      }
    }
  }

  try {
    await middleware(ctx, next)
  } catch (err) {
    // ignore
  }

  expect(requestValidator).toHaveBeenCalled()
  expect(throw_).toHaveBeenCalledWith(400, { errors })
})
