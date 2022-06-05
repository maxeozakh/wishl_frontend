import { useEffect } from 'react'
import { useDecrypt } from './useDecrypt'
import { endpoints, useFetch } from './useFetch'

export const useDownloadWishList = (hash) => {
  const { request, data, isFetching } = useFetch(`${endpoints.getWishList}/${hash}`)
  if (isFetching === null) request('GET')
  //   console.log(data)
  const { decryptedData, isDecrypting } = useDecrypt(data?.secrets, hash)
  //   console.log(isDecrypting)
  // content.then((res) => console.log(res))
  if (decryptedData) return decryptedData
}
