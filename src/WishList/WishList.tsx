import React from 'react'
import { IWish, Wish } from '../Wish/Wish'

export const WishList: React.FC = () => {
  const wishes: IWish[] = [
    {
      title: 'first wish ever',
      description: 'here',
    },
  ]
  return (
    <div>
      {wishes.map((wish, i) => {
        const { title, description } = wish
        return <Wish key={i} title={title} description={description} />
      })}
    </div>
  )
}
