import React from 'react'
import { UploadImage } from '../UploadImage/UploadImage'
import { useCreateForm } from './useCreateForm'

export const CreateForm: React.FC = () => {
  const { formData, setFormData, handleAddWish, handleUpload, title } = useCreateForm()

  return (
    <div role="form">
      <h1 role="title">{title}</h1>
      <hr />
      <br />
      <div>
        <input
          onChange={(event) => setFormData({ ...formData, title: event.target.value })}
          placeholder="title"
          role="input-title"
        />
      </div>
      <div>
        <input
          onChange={(event) => setFormData({ ...formData, description: event.target.value })}
          placeholder="description"
          role="input-description"
        />
      </div>
      <UploadImage handleUpload={handleUpload} />
      <button role="button" onClick={handleAddWish}>
        add wish
      </button>
    </div>
  )
}
