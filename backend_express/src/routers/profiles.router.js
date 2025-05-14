import express from 'express'
import { authenticate_user } from '../middlewares/auth.middleware.js'
import { enterpreneur_profile_controller, investor_profile_controller } from '../controllers/profiles.controller.js'
const router = express.Router()

router.get('/investor/:id',authenticate_user,investor_profile_controller)
router.get('/enterpreneur/:id',authenticate_user,enterpreneur_profile_controller)

export default router