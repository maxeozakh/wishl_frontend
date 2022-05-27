import { act, renderHook } from '@testing-library/react-hooks'
import { useFetch } from './useFetch'

describe('useFetch', () => {
  const setupFetchStub = (data: any) => {
    return function fetchStub(url: string) {
      return new Promise((resolve) => {
        resolve({
          json: () =>
            Promise.resolve({
              data,
            }),
          ok: true,
        })
      })
    }
  }
  const globalFetch = global.fetch

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(setupFetchStub({}))
  })

  afterAll(() => {
    global.fetch.mockClear()
    global.fetch = globalFetch
  })

  test('return isFetching, data, error, request', async () => {
    const endpoint = 'https://api.github.com/users/octocat'

    const { result } = renderHook(() => useFetch(endpoint))

    const { isFetching, data, error, request } = result.current
    expect(isFetching).toBe(false)
    expect(data).toBe(null)
    expect(error).toBe(null)
    expect(typeof request).toBe('function')
  })

  test('isFetching is true when request is called', async () => {
    const endpoint = 'https://api.github.com/users/octocat'

    const { result, waitForNextUpdate } = renderHook(() => useFetch(endpoint))

    const { isFetching, request } = result.current
    expect(isFetching).toBe(false)
    // act(() => {
    request()
    // })
    await waitForNextUpdate()
    expect(isFetching).toBe(true)
  })
})
