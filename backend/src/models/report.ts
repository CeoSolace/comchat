import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema({
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  reason: { type: String, required: true },
  messageSnapshot: { type: Object },
  createdAt: { type: Date, default: Date.now }
})

export const Report = mongoose.model('Report', ReportSchema)

// TODO: Add report state and moderator notes