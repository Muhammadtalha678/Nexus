import bcrypt from 'bcrypt'
import { sendResponse } from '../lib/helpers/sendResponse.js'
import UserModel from '../models/user.model.js'
import {send_verification_mail} from '../lib/helpers/mailerService.js'
import {generateAccessToken} from '../lib/tokens/generate.token.js'
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

        try {
            await send_verification_mail(email,verificationToken)
        } catch (error) {
            // Rollback user creation if email sending fails
                        // await UserModal.findByIdAndDelete(newUSer._id)
                        return sendResponse(res, 500, true, { general: "Failed to send verification email. Please try again." }, null);
        }

        await new_user.save()
        return sendResponse(res,200,false,{},{email:new_user.email,name:new_user.name,message:"User Registered Succesfully, OTP sent to email."})

    } catch (error) {
        return sendResponse(res,500,true,{ general: error.message },null)
    }
}

const verify_email_controller = async (req, res) => {
    try {
        let {email,token} = req.body

        const find_user = await UserModel.findOne({ email })
        if (!find_user) {
            return sendResponse(res,401,true,{email:"User not found"},null)
        }

        // if (find_user.otpExpiresAt < Date.now()) throw new Error("OTP has expired");
        if (find_user.otpExpiresAt < Date.now()) return sendResponse(res, 400, true, { general: "OTP has expired" }, null);
        
        if (find_user.verificationToken !== token) return sendResponse(res, 400, true, {otp:"Invalid OTP"}, null); 
        
        find_user.isVerified = true
        find_user.verificationToken = undefined
        await find_user.save()
        return sendResponse(res, 200, false, {}, {message:"OTP verified successfully"});


    } catch (error) {
         return sendResponse(res,500,true,{ general: error.message },null)
    }
}

const resend_email_controller = async (req, res) => {
    try {
        let { email } = req.body
        // find user
                const findUser = await UserModel.findOne({email})
                if (!findUser) {
                    return sendResponse(res,401,true,{email:"User not found"},null)
        }
        if (findUser.isVerified) return sendResponse(res,401,true,{general:"User already verified"},null) 
        // 6-digit OTP generate karna
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); 
        
        findUser.verificationToken = verificationToken;
        findUser.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
        try {
                    await send_verification_mail(email,verificationToken)
                    
                } catch (emailError) {
                    // Rollback user creation if email sending fails
                    // await UserModal.findByIdAndDelete(newUSer._id)
                    return sendResponse(res, 500, true, { general: "Failed to send verification email. Please try again." }, null);
        }
        await findUser.save();
                
                                return sendResponse(res, 200, false,{}, {message:"OTP resend successfully"});

    } catch (error) {
        return sendResponse(res,500,true,{ general: error.message },null)
    }
} 

const login_controller = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) return sendResponse(res, 409, true, { email: "User is not registered" }, null)
        
        if (!user.isVerified) {
                    return sendResponse(res,409,true,{isVerified:user.isVerified,otpExpiresAt:user.otpExpiresAt,general:"Please verify your email before logging in."},null)
                    
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return sendResponse(res, 401, true, { email: "Invalid email or password" }, null);
        const accessToken = generateAccessToken({id:user._id,email:user.email,role:user.role})
         return sendResponse(res,200,false,{},{email:user.email,role:user.role,accessToken,message:"User Login Successfully"})
        
    } catch (error) {
        return sendResponse(res,500,true,{ general: error.message },null)
    }
}
export {register_controller,verify_email_controller,login_controller,resend_email_controller}