import express from 'express'
import { authenticate_user } from '../middlewares/auth.middleware.js'
import { get_requests_controller, send_request_to_enterpre_controller } from '../controllers/request.controller.js'

const router = express.Router()
//request
router.post('/request/:enterpreneurId',authenticate_user,send_request_to_enterpre_controller)
router.get('/requests',authenticate_user,get_requests_controller)

export default router