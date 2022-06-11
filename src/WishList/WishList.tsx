import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDownloadWishList } from '../common/hooks/useDownloadWishList'
import { useUploadWishList } from '../common/hooks/useUploadWishList'
import { WishInterface, Wish } from '../Wish/Wish'
import { getWishes } from '../wishesSlice'

export const WishList: React.FC = () => {
  const wishes = useSelector(getWishes)
  console.log('wishes', wishes)

  useEffect(() => {
    console.log('wishes in component', wishes)
  }, [wishes])

  return (
    <div>
      {wishes.map((wish, i) => {
        const { title, description, imageURL, id } = wish
        return <Wish id={id} key={i} title={title} description={description} imageURL={imageURL} />
      })}
    </div>
  )
}
