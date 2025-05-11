export const sendResponse = (res,status_code,isError,errors,data) => {
    res.status(status_code).json({
        isError,errors,data
    })
}