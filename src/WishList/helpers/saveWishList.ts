import { useEffect, useState } from 'react'
import { EncryptedData, useEncrypt } from '../../common/hooks/useEncrypt'
import { useFetch } from '../../common/hooks/useFetch'
import { IWish } from '../../Wish/Wish'

export const saveWishList = (WishList: IWish[]) => {
  const { isGenerating, getEncrypted } = useEncrypt(WishList)
  const [encryptedData, setEncryptedData] = useState<null | EncryptedData>(null)

  useEffect(() => {
    if (isGenerating === null) {
      getEncrypted().then((data) => {
        setEncryptedData(data)
      })
    }
  }, [isGenerating])

  const { isFetching, request, data, error } = useFetch('http://127.0.0.1:5000/create')
  useEffect(() => {
    if (encryptedData && isFetching === null) {
      request('POST', encryptedData)
    }
  }, [encryptedData])

  useEffect(() => {
    if (data) console.log('data from server', data)
    if (error) console.log('error from server', error)
  }, [data, error])
}
