const dev = 'http://localhost:4000/'
const prod = 'https://nexus-backend-lac.vercel.app/'


const BASE_URL = prod


export const AppRoutes = {
    login: BASE_URL + "api/auth/login",
    register: BASE_URL + "api/auth/register",
    verifyEmail: BASE_URL + "api/auth/verify-email",
    resendEmail: BASE_URL + "api/auth/resend-email",
    addTask: BASE_URL + "task",
    getTask: BASE_URL + "task",
    myInfo: BASE_URL + "user/myInfo",
}