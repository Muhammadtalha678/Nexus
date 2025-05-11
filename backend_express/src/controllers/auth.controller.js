import bcrypt from 'bcrypt'
import { sendResponse } from '../lib/helpers/sendResponse.js'
import UserModel from '../models/user.model.js'
const register_controller = async (req, res) => {
    try {
        let { name, email, password,role } = req.body
        const user = await UserModel.findOne({ email })
        if (user) return sendResponse(res, 409, true, { email: "User already register" }, null)
        
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        
        const hash_password = await bcrypt.hash(password,10)
        password = hash_password
        
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
        
        const new_user = new UserModel({
            name,email,password,role,otpExpiresAt,verificationToken
        })

        await new_user.save()
        return sendResponse(res,200,false,{},{email:new_user.email,name:new_user.name,message:"User Registered Succesfully, OTP sent to email."})

    } catch (error) {
        return sendResponse(res,500,true,{ general: error.message },null)
    }
}

export {register_controller}