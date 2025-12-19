import { Router } from 'express'
import { requireAuth } from '../middleware/authMiddleware'
import { getReports, dismissReport, globalBanUser } from '../controllers/adminController'

export const router = Router()

router.get('/reports', requireAuth, getReports)
router.delete('/reports/:id', requireAuth, dismissReport)
router.post('/ban/:id', requireAuth, globalBanUser)

// TODO: Add endpoints for hub deletion and maintenance mode