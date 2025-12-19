import mongoose from 'mongoose'

const InviteSchema = new mongoose.Schema({
  hubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hub', required: true },
  inviterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true, unique: true },
  expiresAt: { type: Date },
  maxUses: { type: Number, default: 0 },
  uses: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export const Invite = mongoose.model('Invite', InviteSchema)

TODO: Track assigned roles on invite accept