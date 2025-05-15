import { sendResponse } from '../lib/helpers/sendResponse.js'
import RequestModel from '../models/request.model.js'
import UserModel from '../models/user.model.js'
import mongoose from 'mongoose'
const send_request_to_enterpre_controller = async (req, res) => {
    try {
        const { role,_id } = req.user;
        
        console.log(role)
        console.log(_id)
                if (role !== 'investor') {
                    return sendResponse(res, 403, true, { general: "Unauthorized access" }, null);
        }
        const { enterpreneurId } = req.params
        if (!enterpreneurId || !mongoose.Types.ObjectId.isValid(enterpreneurId)) {
                    return sendResponse(res, 400, true, { general: "Invalid enterpreneur ID" }, null);
                }
        
        const findEnterreneur = await UserModel.findById(enterpreneurId)
        if (!findEnterreneur || findEnterreneur.role !== 'entrepreneur') {
                    return sendResponse(res, 404, true, { general: "Entrepreneur not found" }, null);
        }
        
        const sendRequest = await RequestModel.create({
            investorId: _id,
            enterpreneurId: enterpreneurId,
            status:"Pending"
        })
        
        
        return sendResponse(res, 200, false, {}, {message: "Reuest send successfully",sendRequest });
    } catch (error) {
         return sendResponse(res, 500, true, { general: `Something went wrong: ${error.message}` }, null);
    }
}

export{send_request_to_enterpre_controller}