import mongoose from 'mongoose'

const AuditLogSchema = new mongoose.Schema({
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  targetType: { type: String, required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId },
  details: { type: Object },
  createdAt: { type: Date, default: Date.now }
})

export const AuditLog = mongoose.model('AuditLog', AuditLogSchema)

TODO: Log IP address and user agent