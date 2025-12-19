import mongoose from 'mongoose'

const BoostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['Hub', 'Circle'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  tier: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
})

export const Boost = mongoose.model('Boost', BoostSchema)

// TODO: Add expiration and stacking rules