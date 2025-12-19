import mongoose from 'mongoose'

const DMThreadSchema = new mongoose.Schema({
  userIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  lastMessageAt: { type: Date, default: Date.now }
})

export const DMThread = mongoose.model('DMThread', DMThreadSchema)

TODO: Add DM settings like disappearing messages