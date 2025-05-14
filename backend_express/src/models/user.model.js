import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['entrepreneur', 'investor'], required: true },
    isVerified: { type: Boolean, default: false },
    otpExpiresAt: { type: Date, required: true },
    verificationToken: { type: String },
   
    bio: { type: String },// Short professional bio (shared)

    // Fields specific to Entrepreneurs
    startupName: { type: String },   // Name of the startup
    startupDescription: { type: String },   // Full description of startup
    pitchSummary: { type: String },   // Short pitch (shown on dashboard cards)
    fundingGoal: { type: String },   // Target funding amount (e.g., "$500K")
    pitchDeckUrl: { type: String },   // URL to pitch deck (PDF, Slide, etc.)

     // Fields specific to Investors
     organization: { type: String },   // Name of the investor’s company/org
     portfolioSize: { type: String },   // Size of portfolio (e.g., "$5M")
     interests: [{ type: String }],  // Investment interests (e.g., ["HealthTech", "AI"])
     portfolioCompanies: [{ type: String }],  // Optional: names of companies they’ve backed
},
    {timestamps:true}
)

const UserModel = mongoose.model('users', UserSchema)

export default UserModel