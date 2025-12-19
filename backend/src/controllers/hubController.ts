import { Request, Response } from 'express'
import { Hub, Category, Channel, Membership, RoleGroup, Role, PermissionFlags } from '../models'

export async function getMyHubs(req: Request, res: Response) {
  const user: any = (req as any).user
  const memberships = await Membership.find({ userId: user.id })
  const hubIds = memberships.map((m) => m.hubId)
  const hubs = await Hub.find({ _id: { $in: hubIds } })
  res.json(hubs)
}

export async function createHub(req: Request, res: Response) {
  const user: any = (req as any).user
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ error: 'Name is required' })
  }
  const hub = await Hub.create({ name, ownerId: user.id })
  
  const category = await Category.create({ hubId: hub.id, name: 'General' })
  const channel = await Channel.create({ hubId: hub.id, categoryId: category.id, name: 'general' })
  const roleGroup = await RoleGroup.create({ hubId: hub.id, name: 'Default' })
  const adminRole = await Role.create({ groupId: roleGroup.id, name: 'Owner', bitset: PermissionFlags.Administrator, icon: '👑' })
  const memberRole = await Role.create({ groupId: roleGroup.id, name: 'Member', bitset: PermissionFlags.ViewChannels | PermissionFlags.ReadMessageHistory | PermissionFlags.SendMessages, icon: '👤' })
  await Membership.create({ userId: user.id, hubId: hub.id, roles: [adminRole.id] })
  res.status(201).json({ hub })
}

export async function getHub(req: Request, res: Response) {
  const user: any = (req as any).user
  const { id } = req.params
  
  const membership = await Membership.findOne({ userId: user.id, hubId: id })
  if (!membership) {
    return res.status(403).json({ error: 'Not a member' })
  }
  const hub = await Hub.findById(id)
  if (!hub) {
    return res.status(404).json({ error: 'Hub not found' })
  }
  const categories = await Category.find({ hubId: id })
  const channels = await Channel.find({ hubId: id })
  res.json({ hub, categories, channels })
}

export async function deleteHub(req: Request, res: Response) {
  const user: any = (req as any).user
  const { id } = req.params
  const hub = await Hub.findById(id)
  if (!hub) {
    return res.status(404).json({ error: 'Hub not found' })
  }
  if (hub.ownerId.toString() !== user.id.toString()) {
    return res.status(403).json({ error: 'Only the owner can delete this hub' })
  }
  await Hub.deleteOne({ _id: id })
  await Category.deleteMany({ hubId: id })
  await Channel.deleteMany({ hubId: id })
  await Membership.deleteMany({ hubId: id })
  res.json({ deleted: true })
}

TODO: Implement hub settings update and member management