import { endpoints, useFetch } from '../../common/useFetch'
import { useDecrypt } from '../crypto/useDecrypt'

export const useDownloadWishList = ({ uid, keyForDecrypt }) => {
  const { request, data, isFetching } = useFetch()
  if (isFetching === null) request(`${endpoints.getWishList}/${uid}`, 'GET')
  const { decryptedData } = useDecrypt(data?.secrets, keyForDecrypt)
  if (decryptedData) return decryptedData
}
