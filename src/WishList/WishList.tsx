import React from 'react'
import { IWish, Wish } from '../Wish/Wish'
import { useFetch } from '../common/hooks/useFetch'

export const WishList: React.FC = () => {
  const wishes: IWish[] = [
    {
      title: 'first wish ever',
      description: 'here',
    },
  ]
  // const { request } = useFetch('/something')

  return (
    <div>
      {wishes.map((wish, i) => {
        const { title, description } = wish
        return <Wish key={i} title={title} description={description} />
      })}
    </div>
  )
}
