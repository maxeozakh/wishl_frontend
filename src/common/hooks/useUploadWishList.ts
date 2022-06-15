import { useState } from 'react'
import { WishInterface } from '../../Wish/Wish'
import { useEncrypt } from './useEncrypt'
import { endpoints, useFetch } from './useFetch'

export const useUploadWishList = (wishes: WishInterface[]) => {
  const [encryptedData, setEncryptedData] = useState<null | {
    uid: string
    decryptKey: string
    secrets: string
  }>(null)
  const { isGenerating, getEncrypted } = useEncrypt(wishes)
  const { request, data } = useFetch(endpoints.createWishList)

  const upload = () => {
    if (isGenerating === null)
      getEncrypted().then((res) => {
        request('POST', res)
        setEncryptedData(res)
      })
    else console.log('Still generating...')
  }

  return {
    upload,
    data,
    uid: encryptedData?.uid,
    key: encryptedData?.decryptKey,
  }
}
