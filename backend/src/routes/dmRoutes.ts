import { Router } from 'express'
import { requireAuth } from '../middleware/authMiddleware'
import { getThreads, openThread, getDmMessages, sendDmMessage } from '../controllers/dmController'

export const router = Router()

router.get('/threads', requireAuth, getThreads)
router.post('/thread', requireAuth, openThread)
router.get('/threads/:threadId/messages', requireAuth, getDmMessages)
router.post('/threads/:threadId/messages', requireAuth, sendDmMessage)

// TODO: Add DM attachments and encryption key exchange