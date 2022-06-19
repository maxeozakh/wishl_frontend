import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../features/loader/slice'

interface UseFetch {
  isFetching: boolean | null
  data: Record<string, unknown> | null
  error: Error | null
  request: (endpoint: string, method?: string, body?: unknown) => void
}

export const SERVER_ADDRESS = 'http://127.0.0.1:5000'

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

  const request = async (endpoint: string, method?: string, body?: unknown) => {
    isMounted && setIsFetching(true)
    try {
      dispatch(setIsLoading(true))
      const response = await fetch(endpoint, {
        mode: 'cors',
        method: method || 'GET',
        body,
        headers: { 'Content-Type': 'application/json' },
      })

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
  }

  useEffect(() => {
    return () => {
      dispatch(setIsLoading(false))
      setMounted(false)
    }
  }, [dispatch])

  return { isFetching, data, error, request }
}
