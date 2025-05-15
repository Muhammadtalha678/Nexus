import { sendResponse } from '../lib/helpers/sendResponse.js'
import RequestModel from '../models/request.model.js'
import UserModel from '../models/user.model.js'
import mongoose from 'mongoose'

const get_requests_controller = async (req, res) => {
    try {
        const { role} = req.user;
        console.log(role);
        
        // if (role !== 'entrepreneur' || role !=='investor') {
        //     return sendResponse(res, 403, true, { general: "Unauthorized access" }, null);
        // }
        const allRequests = await RequestModel.find()
        return sendResponse(res, 200, false, {}, {message: "Get all Requests successfully",allRequests });
    } catch (error) {
        return sendResponse(res, 500, true, { general: `Something went wrong: ${error.message}` }, null);
    }
}

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
                const {status} = req.body
        if (status !== 'Pending') {
            return sendResponse(res, 400, true, { general: "Status must be Pending" }, null);
                    
        }
         // ✅ Check for existing request
        const existingRequest = await RequestModel.findOne({
        investorId: _id,
        enterpreneurId: enterpreneurId
      });
  
      if (existingRequest) {
        return sendResponse(res, 409, true, { general: "Request already sent to this entrepreneur" }, null);
      }
        const sendRequest = await RequestModel.create({
            investorId: _id,
            enterpreneurId: enterpreneurId,
            status:status
        })
        
        
        return sendResponse(res, 200, false, {}, {message: "Reuest send successfully",sendRequest });
    } catch (error) {
        return sendResponse(res, 500, true, { general: `Something went wrong: ${error.message}` }, null);
    }
}

const approve_request_controller = async (req,res) => {
    try {
        const { role,_id } = req.user
        if (role !== 'entrepreneur') {
            return sendResponse(res, 403, true, { general: "Unauthorized access" }, null);
        }
        const { requestId } = req.params
        const { status } = req.body
        if (status !== 'Accepted') {
            return sendResponse(res, 400, true, { general: "Status must be Accepted" }, null);
                    
        }
         // ✅ Make sure the request exists and belongs to this entrepreneur
        const existingRequest = await RequestModel.findById(requestId);
        if (!existingRequest) {
        return sendResponse(res, 404, true, { general: "Request not found" }, null);
        }
        if (existingRequest.enterpreneurId !== _id) {
            return sendResponse(res, 403, true, { general: "You can only approve requests sent to you" }, null);
          }
        // ✅ Update status
        existingRequest.status = 'Accepted';
        await existingRequest.save();
        return sendResponse(res, 200, false, {}, {
            message: "Request accepted successfully",
            updatedRequest: existingRequest,
          });
     } catch (error) {
        
         return sendResponse(res, 500, true, { general: `Something went wrong: ${error.message}` }, null);
    }
}

export{get_requests_controller,send_request_to_enterpre_controller,approve_request_controller}