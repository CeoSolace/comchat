import mongoose from 'mongoose'

const RoleGroupSchema = new mongoose.Schema({
  hubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hub', required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export const RoleGroup = mongoose.model('RoleGroup', RoleGroupSchema)

// TODO: Add group order and visibility settings