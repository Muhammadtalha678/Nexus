const dev = 'http://localhost:4000/'
const prod = 'https://nexus-backend-lac.vercel.app/'


const BASE_URL = prod


export const AppRoutes = {
    login: BASE_URL + "api/auth/login",
    register: BASE_URL + "api/auth/register",
    verifyEmail: BASE_URL + "api/auth/verify-email",
    resendEmail: BASE_URL + "api/auth/resend-email",
    myInfo: BASE_URL + "api/user/myInfo",
    profile:BASE_URL + "api/user/profile",
    entrepreneurs:BASE_URL + "api/business/entrepreneurs",
    investors:BASE_URL + "api/business/investors",
    investorProfile:BASE_URL + "api/profile/investor",
    enterpreneurProfile: BASE_URL + "api/profile/enterpreneur",
    
    //requests
    getRequest:BASE_URL + "api/requests", 

    sendRequest: BASE_URL + "api/request", 
    
    acceptRequest:BASE_URL + "api/request" 
}