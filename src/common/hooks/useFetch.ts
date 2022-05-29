import { useEffect, useState } from 'react'
import { EncryptedData } from './useEncrypt'

interface UseFetch {
  isFetching: boolean
  data: Record<string, unknown>
  error: Error
  request: (method?: string, body?: EncryptedData) => void
}

export const useFetch = (endpoint: string): UseFetch => {
  const [isFetching, setIsFetching] = useState<null | boolean>(null)
  const [data, setData] = useState<Record<string, unknown>>(null)
  const [error, setError] = useState<Error>(null)
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
