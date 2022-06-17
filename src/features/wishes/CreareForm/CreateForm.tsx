import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWishes, addWish } from '../slice'
import { WishInterface } from '../Wish/Wish'

interface FormData {
  title: string | null
  description: string | null
  id: string
}

export const CreateForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: null,
    description: null,
    id: nanoid(),
  })
  const dispatch = useDispatch()
  const wishes = useSelector(getWishes)
  const title = wishes.length > 0 ? 'your wishlist ✨' : 'add something to your wishlist ✨'

  const handleAddWish = () => {
    dispatch(addWish(formData as WishInterface))
  }

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
      <button onClick={handleAddWish}>+ wish</button>
    </div>
  )
}