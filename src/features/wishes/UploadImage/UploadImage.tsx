import React from 'react'
import { useUploadImage } from './useUploadImage'

interface UploadImageProps {
  handleUpload: (imageURL: string) => void
}

export const UploadImage: React.FC<UploadImageProps> = ({ handleUpload }) => {
  const { isFetching, imageURL, setSelectedImage } = useUploadImage(handleUpload)

  return (
    <div data-testid="upload-image">
      {isFetching && <div data-testid="upload-image-loader">Loading...</div>}
      {imageURL && (
        <div>
          <img
            data-testid="upload-image-img"
            alt="image of the wish"
            width={'250px'}
            src={imageURL}
          />
        </div>
      )}
      <br />
      <br />
      <input
        data-testid="upload-image-input"
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
