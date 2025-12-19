import { Request, Response } from 'express'
import { User, Block, Ignore } from '../models'

export async function getUser(req: Request, res: Response) {
  const { id } = req.params
  const user = await User.findById(id, 'username avatar discriminator isOwner')
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json(user)
}

export async function blockUser(req: Request, res: Response) {
  const blocker: any = (req as any).user
  const { id } = req.params
  if (blocker.id === id) {
    return res.status(400).json({ error: 'Cannot block yourself' })
  }
  await Block.updateOne({ blockerId: blocker.id, blockedId: id }, {}, { upsert: true })
  res.json({ blocked: true })
}

export async function unblockUser(req: Request, res: Response) {
  const blocker: any = (req as any).user
  const { id } = req.params
  await Block.deleteOne({ blockerId: blocker.id, blockedId: id })
  res.json({ blocked: false })
}

export async function ignoreUser(req: Request, res: Response) {
  const ignorer: any = (req as any).user
  const { id } = req.params
  if (ignorer.id === id) {
    return res.status(400).json({ error: 'Cannot ignore yourself' })
  }
  await Ignore.updateOne({ ignorerId: ignorer.id, ignoredId: id }, {}, { upsert: true })
  res.json({ ignored: true })
}

export async function unignoreUser(req: Request, res: Response) {
  const ignorer: any = (req as any).user
  const { id } = req.params
  await Ignore.deleteOne({ ignorerId: ignorer.id, ignoredId: id })
  res.json({ ignored: false })
}

// TODO: Add user settings update endpoint