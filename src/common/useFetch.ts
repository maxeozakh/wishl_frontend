import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../features/loader/slice'

interface UseFetch {
  isFetching: boolean | null
  data: Record<string, unknown> | null
  error: Error | null
  request: (
    endpoint: string,
    method?: string,
    body?: BodyInit,
    headers?: Record<string, string>,
  ) => void
}



export const SERVER_ADDRESS = 'https://wishl-backend.herokuapp.com'

export const endpoints = {
  createWishList: `${SERVER_ADDRESS}/create`,
  getWishList: `${SERVER_ADDRESS}`,
  getS3SignedRequest: `${SERVER_ADDRESS}/s3/get_sign`,
  uploadImage: `${SERVER_ADDRESS}/s3/upload`,
}
export const useFetch = (): UseFetch => {
  const dispatch = useDispatch()
  const [isFetching, setIsFetching] = useState<null | boolean>(null)
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isMounted, setMounted] = useState<boolean>(true)

  const request = useCallback(
    async (
      endpoint: string,
      method?: string,
      body?: BodyInit,
      headers?: Record<string, string>,
    ) => {
      isMounted && setIsFetching(true)
      dispatch(setIsLoading(true))
      try {
        const params: RequestInit = {
          mode: 'cors',
          method: method || 'GET',
          headers: headers || { 'Content-Type': 'application/json' },
          body,
        }

        const response = await fetch(endpoint, params)

        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        isMounted && setData(responseData)
      } catch (err) {
        isMounted && setError(err)
      } finally {
        dispatch(setIsLoading(false))
        isMounted && setIsFetching(false)
      }
    },
    [dispatch, isMounted],
  )

  useEffect(() => {
    return () => {
      dispatch(setIsLoading(false))
      setMounted(false)
    }
  }, [dispatch])

  return { isFetching, data, error, request }
}
