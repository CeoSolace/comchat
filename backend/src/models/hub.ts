import mongoose from 'mongoose'

const HubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  banner: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export const Hub = mongoose.model('Hub', HubSchema)

TODO: Add hub settings and subscription tier