import { Request, Response } from 'express'
import { Report, Hub, User } from '../models'

export async function getReports(req: Request, res: Response) {
  const user: any = (req as any).user
  if (!user.isOwner) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  const reports = await Report.find().sort({ createdAt: -1 })
  res.json(reports)
}

export async function dismissReport(req: Request, res: Response) {
  const user: any = (req as any).user
  if (!user.isOwner) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  const { id } = req.params
  await Report.deleteOne({ _id: id })
  res.json({ dismissed: true })
}

export async function globalBanUser(req: Request, res: Response) {
  const user: any = (req as any).user
  if (!user.isOwner) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  const { id } = req.params
  const target = await User.findById(id)
  if (!target) {
    return res.status(404).json({ error: 'User not found' })
  }
  await User.updateOne({ _id: id }, { $set: { banned: true } })
  res.json({ banned: true })
}

// TODO: Add search and audit log endpoints