import { useState } from 'react'
import { IWish } from '../../Wish/Wish'
import { nanoid } from 'nanoid'

export interface EncryptedData {
  uid: string
  secrets: unknown
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

    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: new Uint8Array(12) /* don't reuse key! */ },
      key,
      new TextEncoder().encode(JSON.stringify(content)),
    )

    const body: EncryptedData = {
      uid: nanoid(),
      secrets: nanoid(),
    }
    setIsGenerating(false)

    return body
  }

  return { isGenerating, getEncrypted }
}
