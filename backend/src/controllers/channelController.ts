import { Request, Response } from 'express'
import { Channel, Message, Membership, Role, PermissionFlags } from '../models'
import { parseMentions } from '../utils/mentionParser'
import { applyOverride } from '../utils/permissions'

export async function createChannel(req: Request, res: Response) {
  const user: any = (req as any).user
  const { hubId, categoryId, name } = req.body
  if (!hubId || !name) {
    return res.status(400).json({ error: 'hubId and name are required' })
  }
  
  const membership = await Membership.findOne({ userId: user.id, hubId })
  if (!membership) {
    return res.status(403).json({ error: 'Not a member' })
  }
  const roles = await Role.find({ _id: { $in: membership.roles } })
  let perms = 0
  roles.forEach((r) => (perms |= r.bitset))
  if ((perms & PermissionFlags.ManageChannels) !== PermissionFlags.ManageChannels && (perms & PermissionFlags.Administrator) !== PermissionFlags.Administrator) {
    return res.status(403).json({ error: 'Missing permission' })
  }
  const channel = await Channel.create({ hubId, categoryId, name })
  res.status(201).json(channel)
}

export async function getMessages(req: Request, res: Response) {
  const user: any = (req as any).user
  const { channelId } = req.params
  const { before, limit } = req.query
  const messagesLimit = Math.min(parseInt(limit as string) || 50, 100)
  const query: any = { channelId }
  if (before) {
    query._id = { $lt: before }
  }
  const messages = await Message.find(query).sort({ _id: -1 }).limit(messagesLimit)
  res.json(messages.reverse())
}

export async function postMessage(req: Request, res: Response) {
  const user: any = (req as any).user
  const { channelId } = req.params
  const { content } = req.body
  if (!content) {
    return res.status(400).json({ error: 'Content required' })
  }
  const mentions = parseMentions(content)
  const message = await Message.create({ channelId, userId: user.id, content, mentions })
  res.status(201).json(message)
}

export async function deleteMessage(req: Request, res: Response) {
  const user: any = (req as any).user
  const { channelId, messageId } = req.params as any
  const message = await Message.findById(messageId)
  if (!message) {
    return res.status(404).json({ error: 'Message not found' })
  }
  if (message.userId.toString() !== user.id.toString()) {
    return res.status(403).json({ error: 'Cannot delete others messages' })
  }
  await Message.deleteOne({ _id: messageId })
  res.json({ deleted: true })
}

// TODO: Add edit message and reaction handling