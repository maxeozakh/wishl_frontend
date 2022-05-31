const StringToArrayBuffer = (str) => {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }

  return buf
}

export const useDecrypt = async (encryptedString, key) => {
  const objectKey = (await window.crypto.subtle.exportKey('jwk', key)).k
  const encryptedData = StringToArrayBuffer(encryptedString)
  const keyForDecrypt = await window.crypto.subtle.importKey(
    'jwk',
    {
      k: objectKey,
      alg: 'A128GCM',
      ext: true,
      key_ops: ['encrypt', 'decrypt'],
      kty: 'oct',
    },
    { name: 'AES-GCM', length: 128 },
    false, // extractable
    ['decrypt'],
  )
  console.log(encryptedData)
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) },
    keyForDecrypt,
    encryptedData,
  )
  const decoded = new window.TextDecoder().decode(new Uint8Array(decrypted))
  const content = JSON.parse(decoded)

  return content
}
