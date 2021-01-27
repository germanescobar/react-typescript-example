import * as express from 'express'
import * as curriculum from './controllers/curriculum'
import * as admin from './controllers/admin'
import * as auth from './controllers/auth'
import { requireUser, requireAdmin } from './middlewares'

const router = express.Router()

router.get('/curriculum', curriculum.getCurriculum)
router.get('/curriculum/:sectionId/:lessonId', requireUser, curriculum.getLesson)
router.get('/me/completions', requireUser, curriculum.getUserCompletions)
router.post('/curriculum/:sectionId/:lessonId/complete', requireUser, curriculum.completeLesson)

router.post('/login', auth.login)
router.post('/signup', auth.signup)
router.get('/me', requireUser, auth.getUser)
router.get('/invitations/validate', auth.validateInvitation)
router.post('/passwords/forgot', auth.forgotPassword)
router.get('/passwords/validate-token', auth.validatePasswordToken)
router.patch('/passwords/reset', auth.resetPassword)

router.get('/admin/users', requireAdmin, admin.getUsers)
router.get('/admin/invitations', requireAdmin, admin.getInvitations)
router.post('/admin/invitations', requireAdmin, admin.createInvitation)
router.delete('/admin/invitations/:id', requireAdmin, admin.getInvitation)
router.post('/admin/invitations/:id/resend', requireAdmin, admin.resendInvitation)

export default router
