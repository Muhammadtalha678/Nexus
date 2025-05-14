import { sendResponse } from "../lib/helpers/sendResponse.js"

const user_controller = async (req, res) => {
    try {
        const {name,email,role} = req.user
        sendResponse(res, 200, false, {},{name,email,role})
    } catch (error) {
        sendResponse(res, 500, true, {general:"Something went wrong"},null)
    }
}

const user_profile_controller = async (req,res) => {
    try {
        const { id } = req.user
        const updates = req.body
        console.log(id);
        console.log(updates);
        
        
        sendResponse(res, 200, false, null, null);
        
    } catch (error) {
        sendResponse(res, 500, true, {general:"Something went wrong"},null)
    }
    
}
export {user_controller,user_profile_controller}