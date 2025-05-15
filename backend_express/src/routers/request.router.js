import express from 'express'
import { authenticate_user } from '../middlewares/auth.middleware.js'
import { send_request_to_enterpre_controller } from '../controllers/request.controller.js'

const router = express.Router()

router.post('/request/:enterpreneurId',authenticate_user,send_request_to_enterpre_controller)

export default router