import { useState } from 'react'
import { useFetch, endpoints } from '../../common/useFetch'
import { useEncrypt } from '../crypto/useEncrypt'
import { WishInterface } from './Wish/Wish'

export const useUploadWishList = (wishes: WishInterface[]) => {
  const [encryptedData, setEncryptedData] = useState<null | {
    uid: string
    decryptKey: string
    secrets: string
  }>(null)
  const { isGenerating, getEncrypted } = useEncrypt(wishes)
  const { request, data } = useFetch()

  const upload = () => {
    if (isGenerating === null) {
      getEncrypted().then((res) => {
        res && request(endpoints.createWishList, 'POST', JSON.stringify(res))
        setEncryptedData(res)
      })
    } else console.log('Still generating...')
  }

  return {
    upload,
    data,
    uid: encryptedData?.uid,
    key: encryptedData?.decryptKey,
  }
}
