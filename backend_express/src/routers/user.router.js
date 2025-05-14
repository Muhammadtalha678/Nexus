import express from 'express'
import { authenticate_user } from '../middlewares/auth.middleware.js'
import {user_controller, user_profile_controller} from '../controllers/user.controller.js'
const router = express.Router()

router.get('/myInfo',authenticate_user,user_controller)
router.put('/profile',authenticate_user,user_profile_controller)

export default router