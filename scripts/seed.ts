import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const uri = process.env.MONGODB_URI || ''

async function seed() {
  if (!uri) {
    console.error('MONGODB_URI is not defined')
    return
  }
  await mongoose.connect(uri)
  const models = require('../backend/src/models')
  const User = models.User
  const Hub = models.Hub
  const RoleGroup = models.RoleGroup
  const Role = models.Role
  const Membership = models.Membership
  
  const user = await User.findOne()
  if (!user) {
    console.error('No users found to assign as owner')
    return
  }
  const hub = new Hub({ name: 'Demo Hub', ownerId: user.id })
  await hub.save()
  const roleGroup = new RoleGroup({ hubId: hub.id, name: 'Default Roles' })
  await roleGroup.save()
  const adminRole = new Role({ groupId: roleGroup.id, name: 'Admin', bitset: models.PermissionFlags.Administrator, icon: '🛡️' })
  await adminRole.save()
  const memberRole = new Role({ groupId: roleGroup.id, name: 'Member', bitset: models.PermissionFlags.ViewChannels | models.PermissionFlags.ReadMessageHistory | models.PermissionFlags.SendMessages, icon: '👤' })
  await memberRole.save()
  const membership = new Membership({ userId: user.id, hubId: hub.id, roles: [adminRole.id] })
  await membership.save()
  console.log('Seed completed')
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error(err)
  mongoose.disconnect()
})

TODO: Add more seeded data such as channels and categories