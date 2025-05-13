import { sendResponse } from "../lib/helpers/sendResponse.js"

export const user_controller = async (req, res) => {
    try {
        const {name,email,role} = req.user
        sendResponse(res, 200, false, {},{name,email,role})
    } catch (error) {
        sendResponse(res, 500, true, {general:"Something went wrong"},null)
    }
}