import express from 'express'
import { validateRequest } from '../middlewares/validate.middlware.js'
import {register_validation} from '../lib/validations/auth.validation.js'
import { register_controller } from '../controllers/auth.controller.js'
const router = express.Router()

router.post('/register',validateRequest(register_validation),register_controller)

export default router