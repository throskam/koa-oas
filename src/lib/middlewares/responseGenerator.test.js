const createResponseGeneratorMiddleware = require('./responseGenerator')

describe('Basics', () => {
  const middleware = createResponseGeneratorMiddleware()

  it('should do nothing when a response is defined', async () => {
    const next = jest.fn()

    const ctx = {
      state: {
        oas: {
          response: {}
        }
      }
    }

    await middleware(ctx, next)

    expect(next).toHaveBeenCalled()
  })

  const responses = {
    200: {
      content: {
        'application/json': {}
      }
    },
    '2XX': {
      content: {
        'application/json': {}
      }
    },
    300: {
      content: {
        'application/json': {}
      }
    },
    '3XX': {
      content: {
        'application/json': {}
      }
    },
    400: {
      content: {
        'application/json': {}
      }
    },
    404: {
      content: {
        'application/json': {}
      }
    },
    default: {
      content: {
        'application/json': {}
      }
    }
  }

  const removeKey = (o, key) => {
    const { [key]: omit, ...res } = o
    return res
  }

  const removeKeys = (o, keys) => {
    return keys.reduce((acc, key) => {
      return removeKey(acc, key)
    }, o)
  }

  const dataset = [
    [removeKeys(responses, []), 200, 200, 'application/json'],
    [removeKeys(responses, [200]), '2XX', 200, 'application/json'],
    [removeKeys(responses, [200, '2XX']), 300, 300, 'application/json'],
    [removeKeys(responses, [200, '2XX', 300]), '3XX', 300, 'application/json'],
    [removeKeys(responses, [200, '2XX', 300, '3XX']), 'default', 200, 'application/json'],
    [removeKeys(responses, [200, '2XX', 300, '3XX', 'default']), 400, 400, 'application/json']
  ]

  it.each(dataset)('should generate the most approriate response', async (responses, statusKey, status, mediaType) => {
    expect.assertions(3)

    const response = { key: 'value' }

    const next = jest.fn()
    const responseGenerator = jest.fn().mockReturnValue(response)

    const ctx = {
      state: {
        oas: {
          operation: {
            responses
          },
          impl: {
            responseGenerator
          }
        }
      }
    }

    await middleware(ctx, next)

    expect(responseGenerator).toHaveBeenCalledWith({ status, mediaType })
    expect(next).toHaveBeenCalled()

    expect(ctx.state.oas.response).toStrictEqual({
      status,
      mediaType,
      ...response
    })
  })
})

describe('Custom options', () => {
  const type = 'default-content-type'

  const middleware = createResponseGeneratorMiddleware({ defaultResponseContentType: type })

  it('should use the default response content type', async () => {
    expect.assertions(2)

    const responses = {
      200: {
        content: {
          'application/json': {},
          [type]: {}
        }
      }
    }

    const next = jest.fn()
    const responseGenerator = jest.fn()

    const ctx = {
      state: {
        oas: {
          operation: {
            responses
          },
          impl: {
            responseGenerator
          }
        }
      }
    }

    await middleware(ctx, next)

    expect(responseGenerator).toHaveBeenCalledWith({ status: 200, mediaType: type })
    expect(ctx.state.oas.response).toMatchObject({
      mediaType: type
    })
  })
})
