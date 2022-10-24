import { useState, useEffect } from 'react'
import { useFetch, endpoints } from '../../../common/useFetch'

export const useUploadImage = (handleUpload: (imageURL: string) => void) => {
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
  }, [data, handleUpload])

  return {
    selectedImage,
    setSelectedImage,
    imageURL,
    isFetching,
  }
}
