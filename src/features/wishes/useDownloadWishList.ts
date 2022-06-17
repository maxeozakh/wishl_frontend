import { endpoints, useFetch } from '../../common/useFetch'
import { useDecrypt } from '../crypto/useDecrypt'

export const useDownloadWishList = ({ uid, keyForDecrypt }) => {
  const { request, data, isFetching } = useFetch(`${endpoints.getWishList}/${uid}`)
  if (isFetching === null) request('GET')
  const { decryptedData } = useDecrypt(data?.secrets, keyForDecrypt)
  if (decryptedData) return decryptedData
}
