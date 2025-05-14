import express from 'express'
import {authenticate_user} from '../middlewares/auth.middleware.js'
import { entrepreneurs_controller, investors_controller } from '../controllers/business.controller.js'
const router = express.Router()
router.get('/entrepreneurs', authenticate_user,entrepreneurs_controller)
router.get('/investors', authenticate_user, investors_controller)

export default router