import React, { useEffect } from 'react'
import { useDownloadWishList } from '../common/hooks/useDownloadWishList'
import { useUploadWishList } from '../common/hooks/useUploadWishList'
import { IWish, Wish } from '../Wish/Wish'

export const WishList: React.FC = () => {
  const wishes: IWish[] = [
    {
      title: 'first wish ever',
      description: 'here',
    },
  ]

  const { upload, uid } = useUploadWishList(wishes)

  const decryptedData = useDownloadWishList('5m9JajJHvmKGlgilkgzOFw')
  useEffect(() => {
    if (decryptedData) {
      console.log(decryptedData)
    }
  }, [decryptedData])

  return (
    <div>
      {wishes.map((wish, i) => {
        const { title, description } = wish
        return <Wish key={i} title={title} description={description} />
      })}
      <button onClick={upload}>upload</button>
      {/* <button onClick={upload}>download</button> */}
    </div>
  )
}
