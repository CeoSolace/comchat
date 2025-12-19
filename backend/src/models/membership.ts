import mongoose from 'mongoose'

const MembershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hub', required: true },
  roles: { type: [mongoose.Schema.Types.ObjectId], ref: 'Role', default: [] },
  joinedAt: { type: Date, default: Date.now }
})

export const Membership = mongoose.model('Membership', MembershipSchema)

// TODO: Track nickname and pending status