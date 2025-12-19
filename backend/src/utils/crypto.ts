import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12

export interface CipherText {
  iv: string
  tag: string
  data: string
}

export function encrypt(content: string, key: Buffer): CipherText {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([cipher.update(content, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return {
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
    data: encrypted.toString('hex')
  }
}

export function decrypt(ciphertext: CipherText, key: Buffer): string {
  const iv = Buffer.from(ciphertext.iv, 'hex')
  const tag = Buffer.from(ciphertext.tag, 'hex')
  const encryptedData = Buffer.from(ciphertext.data, 'hex')
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(tag)
  const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()])
  return decrypted.toString('utf8')
}

TODO: Support key rotation and per‑device keys