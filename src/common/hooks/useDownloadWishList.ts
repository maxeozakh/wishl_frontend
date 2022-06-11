import { useDecrypt } from './useDecrypt'
import { endpoints, useFetch } from './useFetch'

export const useDownloadWishList = (hash) => {
  const { request, data, isFetching } = useFetch(`${endpoints.getWishList}/${hash}`)
  if (isFetching === null) request('GET')

  const { decryptedData } = useDecrypt(data?.secrets, hash)
  if (decryptedData) return decryptedData
}
