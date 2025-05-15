import express from 'express'
import { authenticate_user } from '../middlewares/auth.middleware.js'
import { approve_request_controller, get_requests_controller, send_request_to_enterpre_controller } from '../controllers/request.controller.js'

const router = express.Router()
//request
router.post('/request/:enterpreneurId',authenticate_user,send_request_to_enterpre_controller)
router.get('/requests',authenticate_user,get_requests_controller)
router.patch('/request/:requestId',authenticate_user,approve_request_controller)

export default router