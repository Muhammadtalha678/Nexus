import { sendResponse } from "../lib/helpers/sendResponse.js"
import UserModel from "../models/user.model.js"

const entrepreneurs_controller = async (req, res) => {
    try {
        const { role } = req.user
        console.log('investor',role);
        
        if (role !== 'investor') {
            return sendResponse(res, 400, true, { general: "Invalid user role" }, null)
        }
        let allEntrepreneur = await UserModel.find({ role: 'entrepreneur' })
        allEntrepreneur = allEntrepreneur.map((entrepreneur) => {
            return {
                id:entrepreneur._id,
                role:entrepreneur.role,
                name: entrepreneur.name,
                startup:entrepreneur.startupName,
                pitchSummary:entrepreneur.pitchSummary 
            }
        })
        return sendResponse(res, 200, false, null, {allEntrepreneur })
    } catch (error) {
        sendResponse(res, 500, true, {general:`Something went wrong ${error}`},null)

    }
}
const investors_controller = async (req, res) => {
    try {
        const { role } = req.user
        console.log("entrepreneur",role);
        
        if (role !== 'entrepreneur') {
            return sendResponse(res, 400, true, { general: "Invalid user role" }, null)
        }
        let allInvestors = await UserModel.find({ role: 'investor' })
        allInvestors = allInvestors.map((investor) => {
            return {
                id:investor._id,
                role:investor.role,
                name: investor.name,
                company: investor.organization,
                pitchSummary:investor.pitchSummary || investor.bio || "Experienced investor looking for next opportunity",
            }
        })
        return sendResponse(res, 200, false, null, {allInvestors })
        
    } catch (error) {
         sendResponse(res, 500, true, {general:`Something went wrong ${error}`},null)
    }
}

export {entrepreneurs_controller,investors_controller}