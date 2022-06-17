import { useEffect, useState } from 'react'
import { EncryptedData } from '../features/crypto/useEncrypt'

interface UseFetch {
  isFetching: boolean | null
  data: Record<string, unknown> | null
  error: Error | null
  request: (method?: string, body?: EncryptedData) => void
}

export const SERVER_ADDRESS = 'http://127.0.0.1:5000'

export const endpoints = {
  createWishList: `${SERVER_ADDRESS}/create`,
  getWishList: `${SERVER_ADDRESS}`,
}
export const useFetch = (endpoint: string): UseFetch => {
  const [isFetching, setIsFetching] = useState<null | boolean>(null)
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isMounted, setMounted] = useState<boolean>(true)

  const request = async (method = 'GET', body?: EncryptedData) => {
    isMounted && setIsFetching(true)

    try {
      const response = await fetch(endpoint, {
        mode: 'cors',
        method,
        body: JSON.stringify(body),
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
      isMounted && setIsFetching(false)
    }
  }

  useEffect(() => {
    return () => {
      setMounted(false)
    }
  }, [])

  return { isFetching, data, error, request }
}
