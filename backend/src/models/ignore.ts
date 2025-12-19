import mongoose from 'mongoose'

const IgnoreSchema = new mongoose.Schema({
  ignorerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ignoredId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
})

export const Ignore = mongoose.model('Ignore', IgnoreSchema)

TODO: Add optional expiration