import React, { useState } from 'react'

export const UploadImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  return (
    <div>
      {selectedImage && (
        <div>
          <img alt="not fount" width={'250px'} src={URL.createObjectURL(selectedImage)} />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
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
          console.log(event?.target?.files[0])
          setSelectedImage(event?.target?.files[0])
        }}
      />
    </div>
  )
}
