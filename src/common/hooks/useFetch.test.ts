describe('useFetch', () => {
  it('return isFetching, data, error, rqst', () => {
    const { result } = renderHook(() => useFetch<{ name: string }>('/api/users/1'))

    expect(result.current).toEqual([false, null, null, expect.any(Function)])
  })
})
