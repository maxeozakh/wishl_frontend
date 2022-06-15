import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useDownloadWishList } from './common/hooks/useDownloadWishList'
import { addWishList } from './wishesSlice'

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
