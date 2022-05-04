import { useState } from 'react'

export const useFetch = (endpoint: string) => {
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const request = async (method: string, body?: any) => {
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
  return [isFetching, data, error, request]
}
