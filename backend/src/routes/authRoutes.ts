import { Router } from 'express'
import { login, callback, logout, me } from '../controllers/authController'
import { requireAuth } from '../middleware/authMiddleware'

export const router = Router()

router.get('/discord', login)
router.get('/callback', callback)
router.post('/logout', logout)
router.get('/me', requireAuth, me)

// TODO: Add route to revoke sessions