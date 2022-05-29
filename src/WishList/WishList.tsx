import React, { useEffect, useState } from 'react'
import { EncryptedData, useEncrypt } from '../common/hooks/useEncrypt'
import { useFetch } from '../common/hooks/useFetch'
import { IWish, Wish } from '../Wish/Wish'

export const WishList: React.FC = () => {
  const wishes: IWish[] = [
    {
      title: 'first wish ever',
      description: 'here',
    },
  ]

  const { isGenerating, getEncrypted } = useEncrypt(wishes)
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
    if (data) console.log('data', data)
    if (error) console.log('error', error)
  }, [data])

  return (
    <div>
      {wishes.map((wish, i) => {
        const { title, description } = wish
        return <Wish key={i} title={title} description={description} />
      })}
      {/* <button onClick={handleClick}>upload</button> */}
    </div>
  )
}
