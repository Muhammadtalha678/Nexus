import { sendResponse } from "../lib/helpers/sendResponse.js"
import UserModel from "../models/user.model.js"

const user_controller = async (req, res) => {
    try {
        const {role } = req.user
        if (role === 'entrepreneur') {
            const{id:_id,name,email,role,bio,startupName,startupDescription,pitchSummary,fundingGoal,pitchDeckUrl} = req.user
            sendResponse(res, 200, false, {},{id:_id,name,email,role,bio,startupName,startupDescription,pitchSummary,fundingGoal,pitchDeckUrl})
            
        }
        if (role === 'investor' ){
            const{id:_id,name,email,role,bio,organization,portfolioSize,interests,portfolioCompanies} = req.user
            sendResponse(res, 200, false, {},{id:_id,name,email,role,bio,organization,portfolioSize,interests,portfolioCompanies})
            
        }
        return sendResponse(res, 400, true, { general: "Invalid user role" }, null);
    } catch (error) {
        sendResponse(res, 500, true, {general:"Something went wrong"},null)
    }
}

const user_profile_controller = async (req,res) => {
    try {
        const { id,role } = req.user
        const update = req.body
        if (role === 'entrepreneur') {
            const updatedUser = await UserModel.findByIdAndUpdate(
              id,
                {
                name:update.name,
                bio: update.bio,
                startupName: update.startupName,
                startupDescription: update.startupDescription,
                pitchSummary: update.pitchSummary,
                fundingGoal: update.fundingGoal,
                pitchDeckUrl: update.pitchDeckUrl,
              },
              { new: true }
            );
            return sendResponse(res, 200, false, null, { message: "Profile updated successfully", updatedUser });
          }
      
        if (role === 'investor') {
            const updatedUser = await UserModel.findByIdAndUpdate(
                id,
                {
                    name:update.name,
                    bio: update.bio,
                    organization: update.organization,
                    portfolioSize: update.portfolioSize,
                    interests: update.interests,
                    portfolioCompanies: update.portfolioCompanies,
                },
                { new: true }
            );
            return sendResponse(res, 200, false, null, { message: "Profile updated successfully", updatedUser });
        
        

        
        }
        return sendResponse(res, 400, true, { general: "Invalid user role" }, null);
    } catch (error) {
        sendResponse(res, 500, true, {general:`Something went wrong ${error}`},null)
    }
    
}
export {user_controller,user_profile_controller}