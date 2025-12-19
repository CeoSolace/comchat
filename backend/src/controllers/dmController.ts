import { Request, Response } from 'express'
import { DMThread, EncryptedDMMessage } from '../models'

export async function getThreads(req: Request, res: Response) {
  const user: any = (req as any).user
  const threads = await DMThread.find({ userIds: user.id }).sort({ lastMessageAt: -1 })
  res.json(threads)
}

export async function openThread(req: Request, res: Response) {
  const user: any = (req as any).user
  const { userId } = req.body
  if (userId === user.id) {
    return res.status(400).json({ error: 'Cannot DM yourself' })
  }
  let thread = await DMThread.findOne({ userIds: { $all: [user.id, userId] } })
  if (!thread) {
    thread = await DMThread.create({ userIds: [user.id, userId] })
  }
  res.json(thread)
}

export async function getDmMessages(req: Request, res: Response) {
  const user: any = (req as any).user
  const { threadId } = req.params
  const thread = await DMThread.findById(threadId)
  if (!thread || !thread.userIds.includes(user.id)) {
    return res.status(403).json({ error: 'Not a member of this thread' })
  }
  const messages = await EncryptedDMMessage.find({ threadId }).sort({ _id: 1 })
  res.json(messages)
}

export async function sendDmMessage(req: Request, res: Response) {
  const user: any = (req as any).user
  const { threadId } = req.params
  const { ciphertext } = req.body
  const thread = await DMThread.findById(threadId)
  if (!thread || !thread.userIds.includes(user.id)) {
    return res.status(403).json({ error: 'Not a member of this thread' })
  }
  const message = await EncryptedDMMessage.create({ threadId, senderId: user.id, ciphertext })
  await DMThread.updateOne({ _id: threadId }, { lastMessageAt: message.createdAt })
  res.status(201).json(message)
}

// TODO: Add DM deletion and attachments