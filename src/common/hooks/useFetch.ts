import { useState } from 'react'

interface UseFetch {
  isFetching: boolean
  data: Record<string, unknown>
  error: Error
  request: (method?: string, body?: Record<string, unknown>) => void
}

export const useFetch = (endpoint: string): UseFetch => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [data, setData] = useState<Record<string, unknown>>(null)
  const [error, setError] = useState<Error>(null)

  const request = async (method = 'GET', body?: Record<string, unknown>) => {
    setIsFetching(true)
    try {
      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })

      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message)
      }
      setData(responseData)
    } catch (err) {
      setError(err)
    } finally {
      setIsFetching(false)
    }
  }

  return { isFetching, data, error, request }
}
