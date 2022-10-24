import React from 'react'
import { useUploadImage } from './useUploadImage'

interface UploadImageProps {
  handleUpload: (imageURL: string) => void
}

export const UploadImage: React.FC<UploadImageProps> = ({ handleUpload }) => {
  const { isFetching, imageURL, setSelectedImage } = useUploadImage(handleUpload)

  return (
    <div role="upload-image">
      {isFetching && <div>Loading...</div>}
      {imageURL && (
        <div>
          <img alt="image of the wish" width={'250px'} src={imageURL} />
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
