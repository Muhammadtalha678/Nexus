import axios from "axios";
import { createContext, useContext,useEffect,useState } from "react";
import { AppRoutes } from "../constants/AppRoutes";

const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true); // added loading state
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoading(false);
            return;
          }
        console.log("Auth context useEffect run when page refresh by f5", user, token);
        if (token && !user) {
            get_user_info(token)        
        }
    }, [])
    
    const get_user_info = async (token) => {
        try {
            const response = await axios.get(AppRoutes.myInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
            setUser(response?.data?.data)
            
        } catch (error) {
            const status = error.response?.status
            const apiErrors = error.response?.data?.errors || {};
            if (status === 401 || status === 403) {
                localStorage.removeItem('authToken')
                setUser(null)
            }
            
        }finally {
            setLoading(false); //  ensure we mark loading complete
          }
    }
    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        navigate('/login')
        // window.location.href = '/login';
      };
    return <AuthContext.Provider value={{user,setUser,loading,logout}}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export {AuthContextProvider,useAuth}