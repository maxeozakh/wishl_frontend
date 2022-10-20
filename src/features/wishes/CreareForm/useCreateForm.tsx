import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWishes, addWish } from '../slice'
import { WishInterface } from '../Wish/Wish'

interface FormData {
  title: string | null
  description: string | null
  id: string
  imageURL?: string
}

export const useCreateForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: null,
    description: null,
    id: nanoid(),
  })
  const dispatch = useDispatch()
  const wishes = useSelector(getWishes)
  const title = wishes.length > 0 ? 'your wishlist ✨' : 'add something to your wishlist ✨'

  const handleAddWish = useCallback(() => {
    dispatch(addWish(formData as WishInterface))
  }, [dispatch, formData])

  const handleUpload = useCallback(
    (imageURL: string) => {
      setFormData({ ...formData, imageURL })
    },
    [formData],
  )

  return { formData, setFormData, handleAddWish, handleUpload, title }
}
