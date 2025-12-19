import { Router } from 'express'
import { requireAuth } from '../middleware/authMiddleware'
import { getMyHubs, createHub, getHub, deleteHub } from '../controllers/hubController'

export const router = Router()

router.get('/', requireAuth, getMyHubs)
router.post('/', requireAuth, createHub)
router.get('/:id', requireAuth, getHub)
router.delete('/:id', requireAuth, deleteHub)

// TODO: Add routes for categories, members and invites