import React from 'react'
import { useDispatch } from 'react-redux'
import { addWishList } from './slice'
import { useDownloadWishList } from './useDownloadWishList'

interface DownloadProps {
  keyForDecrypt: string
  uid: string
}

export const Download: React.FC<DownloadProps> = ({ keyForDecrypt, uid }) => {
  const data = useDownloadWishList({ uid, keyForDecrypt })
  const dispatch = useDispatch()
  if (data) {
    dispatch(addWishList(data))
  }

  return <></>
}
