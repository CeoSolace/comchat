import mongoose from 'mongoose'

const WebhookSchema = new mongoose.Schema({
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  name: { type: String, required: true },
  tokenHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export const Webhook = mongoose.model('Webhook', WebhookSchema)

TODO: Add last used timestamp and expiration