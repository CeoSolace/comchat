import { Router } from 'express'
import { requireAuth } from '../middleware/authMiddleware'
import { createChannel, getMessages, postMessage, deleteMessage } from '../controllers/channelController'
import { PermissionFlags } from '../models'
import { requireChannelPermission } from '../middleware/permissions'

export const router = Router()

router.post('/', requireAuth, createChannel)
router.get('/:channelId/messages', requireAuth, requireChannelPermission(PermissionFlags.ReadMessageHistory), getMessages)
router.post('/:channelId/messages', requireAuth, requireChannelPermission(PermissionFlags.SendMessages), postMessage)
router.delete('/:channelId/messages/:messageId', requireAuth, deleteMessage)

TODO: Add channel update and delete routes