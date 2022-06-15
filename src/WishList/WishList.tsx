import React from 'react'
import { useSelector } from 'react-redux'
import { Wish } from '../Wish/Wish'
import { getWishes } from '../wishesSlice'

export const WishList: React.FC = () => {
  const wishes = useSelector(getWishes)

  return (
    <div>
      {wishes.map((wish, i) => {
        const { title, description, imageURL, id } = wish
        return <Wish id={id} key={i} title={title} description={description} imageURL={imageURL} />
      })}
    </div>
  )
}
