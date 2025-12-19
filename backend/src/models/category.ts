import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  hubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hub', required: true },
  name: { type: String, required: true },
  order: { type: Number, default: 0 }
})

export const Category = mongoose.model('Category', CategorySchema)

// TODO: Track visibility and channel count