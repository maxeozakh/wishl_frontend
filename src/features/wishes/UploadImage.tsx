import React, { useCallback, useEffect, useState } from 'react'
import { endpoints, useFetch } from '../../common/useFetch'

export const UploadImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const { request, data } = useFetch()

  useEffect(() => {
    if (!selectedImage) {
      return
    }

    let formData = new FormData()
    formData.append('file', selectedImage)

    request(endpoints.uploadImage, 'POST', formData)
  }, [selectedImage])

  /*
    old approach below
  */
  // const [s3Data, setS3Data] = useState<{ fields: Record<string, string>; url: string } | null>(null)

  // const { request, data } = useFetch(
  //   `${endpoints.getS3SignedRequest}?file_name=${selectedImage?.name}&file_type=${selectedImage?.type}`,
  // )

  // const { request: s3UploadRequest, data: s3UploadData } = useFetch(s3Data?.url)

  // const getSignedRequest = useCallback(async () => {
  //   request()
  // }, [request, selectedImage])

  // useEffect(() => {
  //   if (selectedImage) {
  //     getSignedRequest()
  //   }
  // }, [selectedImage])

  // useEffect(() => {
  //   if (data) {
  //     setS3Data(data.data)
  //   }
  // }, [data])

  // useEffect(() => {
  //   if (s3Data) {
  //     const postData = new FormData()
  //     for (const key in s3Data.fields) {
  //       postData.append(key, s3Data.fields[key])
  //     }

  //     postData.append('signatureVersion', 'v4')
  //     postData.append('file', selectedImage)

  //     console.log('key', postData.get('key'))

  //     s3UploadRequest('POST', postData, true)
  //   }
  // }, [s3Data])

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
          setSelectedImage(event?.target?.files[0])
        }}
      />
    </div>
  )
}
