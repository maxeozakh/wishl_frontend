import React, { useEffect, useState } from 'react'
import { endpoints, useFetch } from '../../../common/useFetch'

interface UploadImageProps {
  handleUpload: (imageURL: string) => void
}

export const UploadImage: React.FC<UploadImageProps> = ({ handleUpload }) => {
  const { request, data, isFetching } = useFetch()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageURL, setImageURL] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedImage) {
      return
    }

    const formData = new FormData()
    formData.append('file', selectedImage)

    request(endpoints.uploadImage, 'POST', formData, {})
  }, [request, selectedImage])

  useEffect(() => {
    if (data) {
      handleUpload(data.url as string)
      setImageURL(data.url as string)
    }
  }, [data])

  return (
    <div role="upload-image">
      {isFetching && <div>Loading...</div>}
      {imageURL && (
        <div>
          <img alt="not fount" width={'250px'} src={imageURL} />
        </div>
      )}
      <br />

      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          if (!event?.target?.files) {
            return
          }
          setSelectedImage(event?.target?.files[0])
        }}
      />
    </div>
  )
}
