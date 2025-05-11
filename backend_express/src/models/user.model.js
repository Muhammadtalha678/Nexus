import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['entrepreneur', 'investor'], required: true },
    isVerified: { type: Boolean, default: false },
    otpExpiresAt: { type: Date, required: true },
    verificationToken: { type: String },
},
    {timestamps:true}
)

const UserModel = mongoose.model('users', UserSchema)

export default UserModel