import React from 'react'
import { useSelector } from 'react-redux'
import { useUploadWishList } from '../common/hooks/useUploadWishList'
import { getWishes } from '../wishesSlice'

export const ShareButton: React.FC = () => {
  const wishes = useSelector(getWishes)
  const { uid, key, upload, data } = useUploadWishList(wishes)

  return (
    <div>
      {wishes.length > 0 && (
        <div>
          <hr />
          <br />
          <button onClick={upload}>share</button>
        </div>
      )}
      {data && (
        <div>
          <br />
          <a href={`${window.location}?i=${uid}#${key}`}>{`${window.location}?i=...#${key?.slice(5)}`}</a>
        </div>
      )}
    </div>
  )
}
