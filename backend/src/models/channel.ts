import mongoose from 'mongoose'

const OverrideSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  allow: { type: Number, default: 0 },
  deny: { type: Number, default: 0 }
}, { _id: false })

const ChannelSchema = new mongoose.Schema({
  hubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hub', required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  name: { type: String, required: true },
  type: { type: String, enum: ['text', 'voice'], default: 'text' },
  order: { type: Number, default: 0 },
  overrides: { type: [OverrideSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
})

export const Channel = mongoose.model('Channel', ChannelSchema)

TODO: Add slow mode, topic and pinned messages