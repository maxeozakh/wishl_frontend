import { useState } from 'react'
import { IWish } from '../../Wish/Wish'
import { nanoid } from 'nanoid'
import { useDecrypt } from './useDecrypt'

export interface EncryptedData {
  uid: string
  secrets: unknown
}

const ArrayBufferToString = (buf: ArrayBufferLike) => {
  return String.fromCharCode.apply(null, new Uint8Array(buf))
}

export const useEncrypt = (content: IWish[]) => {
  const [isGenerating, setIsGenerating] = useState<null | boolean>(null)

  const getEncrypted = async () => {
    setIsGenerating(true)

    const key = await window.crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 128 },
      true, // extractable
      ['encrypt', 'decrypt'],
    )
    console.log(key)
    const objectKey = (await window.crypto.subtle.exportKey('jwk', key)).k
    console.log(objectKey)

    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: new Uint8Array(12) /* don't reuse key! */ },
      key,
      new TextEncoder().encode(JSON.stringify(content)),
    )
    const encryptedString = ArrayBufferToString(encrypted)

    setIsGenerating(false)
    return {
      uid: nanoid(),
      secrets: encryptedString,
    }
  }

  return { isGenerating, getEncrypted }
}
