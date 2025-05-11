import express from 'express'
import { validate_request } from '../middlewares/validate.middleware.js'
import {register_validation} from '../lib/validations/auth.validation.js'
import { register_controller, verify_email_controller } from '../controllers/auth.controller.js'
const router = express.Router()

router.post('/register',validate_request(register_validation),register_controller)
router.post('/verify-email',verify_email_controller)

export default router