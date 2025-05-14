import { sendResponse } from '../lib/helpers/sendResponse.js'
import UserModel from '../models/user.model.js'
import mongoose from 'mongoose'
const investor_profile_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.user;

        if (role !== 'entrepreneur') {
            return sendResponse(res, 403, true, { general: "Unauthorized access" }, null);
        }

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(res, 400, true, { general: "Invalid Investor ID" }, null);
        }

        let investor = await UserModel.findById(id);
        if (!investor || investor.role !== 'investor') {
            return sendResponse(res, 404, true, { general: "Investor not found" }, null);
        }

        investor = {
            name: investor.name,
            role: investor.role,
            bio: investor.bio,
            organization: investor.organization,
            portfolioSize: investor.portfolioSize,
            interests: investor.interests,
            portfolioCompanies: investor.portfolioCompanies
        };

        return sendResponse(res, 200, false, {}, { investor, message: "Investor found successfully" });

    } catch (error) {
        return sendResponse(res, 500, true, { general: `Something went wrong: ${error.message}` }, null);
    }
};

const enterpreneur_profile_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.user;

        if (role !== 'investor') {
            return sendResponse(res, 403, true, { general: "Unauthorized access" }, null);
        }

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(res, 400, true, { general: "Invalid Entrepreneur ID" }, null);
        }

        let entrepreneur = await UserModel.findById(id);
        if (!entrepreneur || entrepreneur.role !== 'entrepreneur') {
            return sendResponse(res, 404, true, { general: "Entrepreneur not found" }, null);
        }

        entrepreneur = {
            name: entrepreneur.name,
            role: entrepreneur.role,
            bio: entrepreneur.bio,
            organization: entrepreneur.organization,
            portfolioSize: entrepreneur.portfolioSize,
            interests: entrepreneur.interests,
            portfolioCompanies: entrepreneur.portfolioCompanies
        };

        return sendResponse(res, 200, false, {}, { entrepreneur, message: "Entrepreneur found successfully" });

    } catch (error) {
        return sendResponse(res, 500, true, { general: `Something went wrong: ${error.message}` }, null);
    }
};

export { investor_profile_controller, enterpreneur_profile_controller };