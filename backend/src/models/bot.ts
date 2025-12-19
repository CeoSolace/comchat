import mongoose from 'mongoose'

const BotSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  tokenHash: { type: String, required: true },
  scopes: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
})

export const Bot = mongoose.model('Bot', BotSchema)

TODO: Track bot status and permissions