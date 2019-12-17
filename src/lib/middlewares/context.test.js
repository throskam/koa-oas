jest.mock('@throskam/oas-impl')

const oas = require('@throskam/oas-impl')

const createContextMiddleware = require('./context')

describe('Basics', () => {
  const route = {
    definition: {},
    operation: {},
    path: '',
    impl: {}
  }

  const dispatch = jest.fn().mockReturnValue(route)

  const document = {}

  oas.mockReturnValue(dispatch)

  const middleware = createContextMiddleware(document)

  it('should set the status, headers, content type and body', async () => {
    expect.assertions(4)

    const status = 200
    const header = { key: 'value' }
    const content = { foo: 'bar' }
    const mediaType = 'application/json'

    const ctx = {
      method: '',
      path: '',
      headers: {},
      request: {},
      req: {},
      state: {},
      set: jest.fn(() => {
        ctx.headerSent = header
      })
    }

    const next = jest.fn(() => {
      ctx.state.oas.response = {
        mediaType,
        status,
        header,
        content
      }
    })

    await middleware(ctx, next)

    expect(ctx.status).toStrictEqual(status)
    expect(ctx.headerSent).toStrictEqual(header)
    expect(ctx.type).toStrictEqual(mediaType)
    expect(ctx.body).toStrictEqual(content)
  })

  it('should normalize the method and path', async () => {
    expect.assertions(1)

    const method = '  GET  '
    const normalizedMethod = 'get'
    const path = '  /test/  '
    const normalizedPath = '/test'

    const ctx = {
      method,
      path,
      headers: {},
      request: {},
      req: {},
      state: {},
      set: jest.fn()
    }

    const next = jest.fn(() => {
      ctx.state.oas.response = true
    })

    await middleware(ctx, next)

    expect(dispatch).toHaveBeenCalledWith(normalizedMethod, normalizedPath)
  })

  it('should throw 501 when no implementation is defined', async () => {
    expect.assertions(1)

    const next = jest.fn()

    const throw_ = jest.fn(() => {
      throw new Error()
    })

    const ctx = {
      method: '',
      path: '',
      headers: {},
      request: {},
      req: {},
      state: {},
      set: jest.fn(),
      throw: throw_
    }

    try {
      await middleware(ctx, next)
    } catch (err) {
      // ignore
    }

    expect(throw_).toHaveBeenCalledWith(501)
  })

  it('should throw 404 when no route match', async () => {
    expect.assertions(1)

    const next = jest.fn()

    const throw_ = jest.fn(() => {
      throw new Error()
    })

    dispatch.mockReturnValue(null)

    const ctx = {
      method: '',
      path: '',
      headers: {},
      request: {},
      req: {},
      state: {},
      set: jest.fn(),
      throw: throw_
    }

    try {
      await middleware(ctx, next)
    } catch (err) {
      // ignore
    }

    expect(throw_).toHaveBeenCalledWith(404)
  })
})
