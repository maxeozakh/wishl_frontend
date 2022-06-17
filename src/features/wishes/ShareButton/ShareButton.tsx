import React from 'react'
import { useSelector } from 'react-redux'
import { getWishes } from '../slice'
import { useUploadWishList } from '../useUploadWishList'

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
          <a href={`${window.location}?i=${uid}#${key}`}>{`${window.location}?i=...#${key?.slice(
            5,
          )}`}</a>
        </div>
      )}
    </div>
  )
}
