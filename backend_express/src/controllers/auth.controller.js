const register_controller = async(req,res) => {
    try {
        // return sendResponse(res,500,true,{ general: error.message },null)
        
    } catch (error) {
        return sendResponse(res,500,true,{ general: error.message },null)
    }
}

export {register_controller}