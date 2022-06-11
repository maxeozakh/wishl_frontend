import { WishInterface } from '../../Wish/Wish'
import { useEncrypt } from './useEncrypt'
import { endpoints, useFetch } from './useFetch'

export const useUploadWishList = (wishes: WishInterface[]) => {
  const { encryptedData, isGenerating } = useEncrypt(wishes)
  const { request } = useFetch(endpoints.createWishList)

  const upload = () => {
    if (!isGenerating) request('POST', encryptedData)
    else console.log('Still generating...')
  }

  return {
    upload,
    uid: encryptedData?.uid,
  }
}
