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
                role:entrepreneur.role,
                name: entrepreneur.name,
                company: entrepreneur.organization,
                pitchSummary:entrepreneur.pitchSummary || entrepreneur.bio || "Experienced investor looking for next opportunity"
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
                role:investor.role,
                name: investor.name,
                startup:investor.startupName,
                pitchSummary:investor.pitchSummary,
            }
        })
        return sendResponse(res, 200, false, null, {allInvestors })
        
    } catch (error) {
         sendResponse(res, 500, true, {general:`Something went wrong ${error}`},null)
    }
}

export {entrepreneurs_controller,investors_controller}