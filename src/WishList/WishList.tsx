import React, { useEffect, useState } from 'react'
import { EncryptedData, useEncrypt } from '../common/hooks/useEncrypt'
import { useFetch } from '../common/hooks/useFetch'
import { IWish, Wish } from '../Wish/Wish'
import { saveWishList } from './helpers/saveWishlist'

export const WishList: React.FC = () => {
  const wishes: IWish[] = [
    {
      title: 'first wish ever',
      description: 'here',
    },
  ]

  saveWishList(wishes)

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
