import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'RoleGroup', required: true },
  name: { type: String, required: true },
  bitset: { type: Number, required: true },
  icon: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
})

export const Role = mongoose.model('Role', RoleSchema)

TODO: Add role color and position