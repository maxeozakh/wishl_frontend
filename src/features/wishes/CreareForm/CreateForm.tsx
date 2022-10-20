import React from 'react'
import { UploadImage } from './UploadImage'
import { useCreateForm } from './useCreateForm'

export const CreateForm: React.FC = () => {
  const { formData, setFormData, handleAddWish, handleUpload, title } = useCreateForm()

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
      <UploadImage handleUpload={handleUpload} />
      <button onClick={handleAddWish}>add wish</button>
    </div>
  )
}
