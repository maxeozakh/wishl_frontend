import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWish, getWishes } from '../wishesSlice'

export const NewWishForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: null,
    description: null,
    id: nanoid(),
  })
  const dispatch = useDispatch()
  const wishes = useSelector(getWishes)
  const title = wishes.length > 0 ? 'your wishlist ✨' : 'add something to your wishlist ✨'

  return (
    <div>
      <h1>{title}</h1>
      <hr />
      <br />
      <div>
        <input
          onChange={(event) => setFormData({ ...formData, title: event.target.value })}
          placeholder="title"
        ></input>
      </div>
      <div>
        <input
          onChange={(event) => setFormData({ ...formData, description: event.target.value })}
          placeholder="description"
        ></input>
      </div>
      <button onClick={() => dispatch(addWish(formData))}>+ wish</button>
    </div>
  )
}
