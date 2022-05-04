import { renderHook } from '@testing-library/react-hooks'
import { useFetch } from './useFetch'
describe('useFetch', () => {
  it('return isFetching, data, error, request', () => {
    const { result } = renderHook(() => useFetch('/api/users/1'))

    expect(result.current).toEqual([false, null, null, expect.any(Function)])
  })
})
