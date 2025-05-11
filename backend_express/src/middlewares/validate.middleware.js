import { sendResponse } from "../lib/helpers/sendResponse.js";

export const validate_request = (validationSchema) => (req, res, next) => {
    const { error } = validationSchema.validate(req.body, { abortEarly: false })//means sb aik sath validate
    print("error joi" ,error)
    if (error) {
        // Transform Joi error details to field-wise messages
        const fieldErrors = {};
        error.details.forEach(detail => {
            const field = detail.path[0] //get error name
            if (!fieldErrors[field]) {
                fieldErrors[field] = detail.message
            }
        });
        return sendResponse(res,400,true,fieldErrors,null)
    }
    next()
    
}