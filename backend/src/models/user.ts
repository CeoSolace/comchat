import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar: { type: String },
  discriminator: { type: String },
  isOwner: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const User = mongoose.model('User', UserSchema)

TODO: Store per‑user settings and preferences