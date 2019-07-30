const createActionMiddleware = require('./action')

describe('Basic', () => {
  const middleware = createActionMiddleware()

  it('should do nothing when no action is defined', async () => {
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

  it('should call the action and set the response', async () => {
    expect.assertions(3)

    const type = 'content-type'
    const status = 200
    const headerSent = { key: 'value' }
    const body = 'some body'

    const action = jest.fn()
    const next = jest.fn()

    const ctx = {
      type,
      status,
      headerSent,
      body,
      state: {
        oas: {
          action
        }
      }
    }

    await middleware(ctx, next)

    expect(action).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()

    expect(ctx.state.oas.response).toStrictEqual({
      mediaType: type,
      status,
      header: headerSent,
      content: body
    })
  })
})

describe('Custom options', () => {
  const type = 'default-content-type'

  const option = {
    defaultResponseContentType: type
  }

  const middleware = createActionMiddleware(option)

  it('should return the default response content type when none is defined', async () => {
    expect.assertions(1)

    const action = jest.fn()
    const next = jest.fn()

    const ctx = {
      state: {
        oas: {
          action
        }
      }
    }

    await middleware(ctx, next)

    expect(ctx.state.oas.response).toMatchObject({
      mediaType: type
    })
  })
})
