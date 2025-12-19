import { Router } from 'express'
import { requireAuth } from '../middleware/authMiddleware'
import { getUser, blockUser, unblockUser, ignoreUser, unignoreUser } from '../controllers/userController'

export const router = Router()

router.get('/:id', requireAuth, getUser)
router.post('/block/:id', requireAuth, blockUser)
router.delete('/block/:id', requireAuth, unblockUser)
router.post('/ignore/:id', requireAuth, ignoreUser)
router.delete('/ignore/:id', requireAuth, unignoreUser)

// TODO: Add routes for DM threads and profile updates