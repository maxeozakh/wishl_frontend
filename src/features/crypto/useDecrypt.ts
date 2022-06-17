import { useEffect, useState } from 'react'
import { WishInterface } from '../wishes/Wish/Wish'


const StringToArrayBuffer = (str) => {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }

  return buf
}

export const useDecrypt = (encryptedString, key: string) => {
  const [isDecrypting, setIsDecrypting] = useState<null | boolean>(null)
  const [decryptedData, setDecryptedData] = useState<null | WishInterface[]>(null)

  useEffect(() => {
    const getDecrypted = async () => {
      if (!encryptedString) return null

      setIsDecrypting(true)
      const encryptedData = StringToArrayBuffer(encryptedString)
      const keyForDecrypt = await window.crypto.subtle.importKey(
        'jwk',
        {
          k: key,
          alg: 'A128GCM',
          ext: true,
          key_ops: ['encrypt', 'decrypt'],
          kty: 'oct',
        },
        { name: 'AES-GCM', length: 128 },
        false, // extractable
        ['decrypt'],
      )

      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(12) },
        keyForDecrypt,
        encryptedData,
      )
      const decoded = new window.TextDecoder().decode(new Uint8Array(decrypted))
      const content = JSON.parse(decoded)
      setIsDecrypting(false)
      return content
    }

    if (decryptedData === null && isDecrypting === null) {
      getDecrypted().then((res) => {
        return setDecryptedData(res)
      })
    }
  }, [decryptedData, encryptedString, isDecrypting, key])

  return { isDecrypting, decryptedData }
}
