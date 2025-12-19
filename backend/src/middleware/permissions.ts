import { Request, Response, NextFunction } from 'express'
import { Membership, Role, Channel, PermissionFlags, applyOverride } from '../models'

export function requireChannelPermission(required: PermissionFlags) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user: any = (req as any).user
    const channelId = req.params.channelId || req.body.channelId
    if (!channelId) {
      return res.status(400).json({ error: 'Channel ID is required' })
    }
    const channel = await Channel.findById(channelId).lean()
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' })
    }
    const membership = await Membership.findOne({ userId: user.id, hubId: channel.hubId })
    if (!membership) {
      return res.status(403).json({ error: 'You are not a member of this hub' })
    }
    const roles = await Role.find({ _id: { $in: membership.roles } })
    let permissions = 0
    roles.forEach((r) => {
      permissions |= r.bitset
    })
    if ((permissions & PermissionFlags.Administrator) === PermissionFlags.Administrator) {
      return next()
    }
    if (channel.overrides) {
      channel.overrides.forEach((override: any) => {
        if (membership.roles.map((r: any) => r.toString()).includes(override.roleId.toString())) {
          permissions = applyOverride(permissions, { allow: override.allow, deny: override.deny })
        }
      })
    }
    if ((permissions & required) !== required) {
      return res.status(403).json({ error: 'Missing permission' })
    }
    next()
  }
}

// TODO: Implement hub‑level permission middleware