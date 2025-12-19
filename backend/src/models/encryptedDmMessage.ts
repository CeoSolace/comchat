import mongoose from 'mongoose'

const CipherSchema = new mongoose.Schema({
  iv: { type: String, required: true },
  tag: { type: String, required: true },
  data: { type: String, required: true }
}, { _id: false })

const EncryptedDMMessageSchema = new mongoose.Schema({
  threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'DMThread', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ciphertext: { type: CipherSchema, required: true },
  createdAt: { type: Date, default: Date.now }
})

export const EncryptedDMMessage = mongoose.model('EncryptedDMMessage', EncryptedDMMessageSchema)

// TODO: Add support for message expiry