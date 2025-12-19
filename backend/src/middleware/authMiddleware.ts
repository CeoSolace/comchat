import { Request, Response, NextFunction } from 'express'
import { User } from '../models'

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const session: any = (req as any).session
  if (!session || !session.userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const user = await User.findById(session.userId)
  if (!user) {
    return res.status(401).json({ error: 'Invalid session' })
  }
  ;(req as any).user = user
  next()
}

TODO: Add token based auth fallback for API keys