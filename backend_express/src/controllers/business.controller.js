import { sendResponse } from "../lib/helpers/sendResponse.js"
import UserModel from "../models/user.model.js"

const entrepreneurs_controller = async (req, res) => {
    try {
        const { role } = req.user
        console.log(role);
        
        if (role !== 'investor') {
            return sendResponse(res, 400, true, { general: "Invalid user role" }, null)
        }
        const allEntrepreneurs = await UserModel.find({ role: 'investor' })
        return sendResponse(res, 200, false, null, {allEntrepreneurs })
    } catch (error) {
        
    }
}
const investors_controller = async (req, res) => {
    try {
        const { role } = req.user
        if (role !== 'entrepreneur') {
            return sendResponse(res, 400, true, { general: "Invalid user role" }, null)
        }
        const allInvestors = await UserModel.find({ role: 'entrepreneur' })
        return sendResponse(res, 200, false, null, {allInvestors })
        
    } catch (error) {
         sendResponse(res, 500, true, {general:`Something went wrong ${error}`},null)
    }
}

export {entrepreneurs_controller,investors_controller}