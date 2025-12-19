import mongoose from 'mongoose'

const ApiKeySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  keyHash: { type: String, required: true },
  scopes: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
})

export const ApiKey = mongoose.model('ApiKey', ApiKeySchema)

// TODO: Add last used timestamp and revocation state