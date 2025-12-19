import mongoose from 'mongoose'

const MentionSchema = new mongoose.Schema({
  userIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  roleIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'Role', default: [] },
  everyone: { type: Boolean, default: false },
  here: { type: Boolean, default: false }
}, { _id: false })

const MessageSchema = new mongoose.Schema({
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  mentions: { type: MentionSchema, default: {} },
  attachments: { type: [String], default: [] },
  reactions: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date },
  deletedAt: { type: Date }
})

export const Message = mongoose.model('Message', MessageSchema)

// TODO: Add thread replies and embed metadata