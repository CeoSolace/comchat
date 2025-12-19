export async function generateKey(): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt'])
}

export async function encrypt(content: string, key: CryptoKey) {
  const encoder = new TextEncoder()
  const data = encoder.encode(content)
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data)
  return {
    iv: Buffer.from(iv).toString('hex'),
    data: Buffer.from(encrypted).toString('hex')
  }
}

export async function decrypt(ciphertext: { iv: string; data: string }, key: CryptoKey) {
  const iv = Uint8Array.from(Buffer.from(ciphertext.iv, 'hex'))
  const encryptedData = Buffer.from(ciphertext.data, 'hex')
  const decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encryptedData)
  return new TextDecoder().decode(decrypted)
}

TODO: Derive keys from user secrets and handle device storage