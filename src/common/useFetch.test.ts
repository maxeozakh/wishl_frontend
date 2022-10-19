import { act, renderHook, cleanup } from '@testing-library/react-hooks'
import { useFetch } from './useFetch'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}))

describe('useFetch', () => {
  const setupFetchStub = (data: Record<string, unknown>, isOk = true) => {
    return function fetchStub() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            json: () => Promise.resolve(data),
            ok: isOk,
          })
        }, 10 + Math.random() * 100)
      })
    }
  }

  const globalFetch = global.fetch
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(setupFetchStub({}))
  })
  afterAll(() => {
    // @ts-expect-error not much sence in types for mock
    global.fetch.mockClear()
    global.fetch = globalFetch
  })
  afterEach(() => {
    cleanup()
  })

  const endpoint = 'https://api.github.com/users/octocat'
  test('return isFetching, data, error, request', async () => {
    const { result } = renderHook(() => useFetch())

    const { isFetching, data, error, request } = result.current
    expect(isFetching).toBe(null)
    expect(data).toBe(null)
    expect(error).toBe(null)
    expect(typeof request).toBe('function')
  })

  test('isFetching is true before response', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch())

    act(() => {
      result.current.request(endpoint)
    })

    const resultBeforeResponse = result.current
    await waitForNextUpdate()
    expect(resultBeforeResponse.isFetching).toBe(true)
  })

  test('isFetching is false after response', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch())

    act(() => {
      result.current.request(endpoint)
    })

    await waitForNextUpdate()
    expect(result.current.isFetching).toBe(false)
  })

  test('data is null before response', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch())

    act(() => {
      result.current.request(endpoint)
    })
    const resultBeforeResponse = result.current
    await waitForNextUpdate()

    expect(resultBeforeResponse.data).toBe(null)
  })

  test('data is set after response', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch())

    act(() => {
      result.current.request(endpoint)
    })

    await waitForNextUpdate()
    expect(result.current.data).toEqual({})
  })

  test('error is null before response', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch())

    act(() => {
      result.current.request(endpoint)
    })
    const resultBeforeResponse = result.current
    await waitForNextUpdate()

    expect(resultBeforeResponse.error).toBe(null)
  })

  test('error is set after response if server response isnt ok', async () => {
    global.fetch = jest.fn().mockImplementation(setupFetchStub({}, false))
    const { result, waitForNextUpdate } = renderHook(() => useFetch())

    act(() => {
      result.current.request(endpoint)
    })

    await waitForNextUpdate()
    expect(result.current.error?.toString()).toBe('Error')
  })
})
