import { useEffect, useState } from 'react'
import { WishInterface } from '../../Wish/Wish'

export interface EncryptedData {
  uid: string
  secrets: unknown
}

const ArrayBufferToString = (buf: ArrayBufferLike) => {
  return String.fromCharCode.apply(null, new Uint8Array(buf))
}

export const useEncrypt = (content: WishInterface[]) => {
  const [isGenerating, setIsGenerating] = useState<null | boolean>(null)
  const [encryptedData, setEncryptedData] = useState<null | EncryptedData>(null)

  useEffect(() => {
    const getEncrypted = async () => {
      setIsGenerating(true)

      const key = await window.crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 128 },
        true, // extractable
        ['encrypt', 'decrypt'],
      )

      const encrypted = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: new Uint8Array(12) /* don't reuse key! */ },
        key,
        new TextEncoder().encode(JSON.stringify(content)),
      )
      const encryptedString = ArrayBufferToString(encrypted)
      const uidAkaKey = (await window.crypto.subtle.exportKey('jwk', key)).k

      setIsGenerating(false)
      setEncryptedData({
        uid: uidAkaKey,
        secrets: encryptedString,
      })
    }

    if (encryptedData === null && isGenerating === null) {
      getEncrypted()
    }
  }, [content, encryptedData, isGenerating])

  return { isGenerating, encryptedData }
}
