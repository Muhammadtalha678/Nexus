import * as nodemailer from 'nodemailer'
import {env_config} from '../configs/env.config.js'
const send_verification_mail =async (email,token) => {
    const mail_options = {
        from: `DevHubInternship program`, // Sender address
        to: email, // Recipient address
        subject: 'Verify Your Email', // Subject line
        html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <h2>Welcome to Nexus program Website!</h2>
                <p>Dear User,</p>
                <p>Thank you for registering on our platform. Please use the following OTP to complete your registration:</p>
                <h3 style="background: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center;">
                  ${token}
                </h3>
                <p>If you did not register, please ignore this email.</p>
                <p>Best regards,<br>Nexus program</p>
              </div>
            `, 
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                    user: env_config.EMAIL_USER,
                    pass:env_config.EMAIL_PASS
                }
    }) 

    const info = await transporter.sendMail(mail_options)
  if (info.rejected.length > 0) {
  console.error("Email rejected:", info.rejected);
  throw new Error("Email sending was rejected");
}
}
export {send_verification_mail}