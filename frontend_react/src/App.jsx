import './App.css'
import { Route, Routes,Navigate } from 'react-router'
import Register from './pages/register'
import Login from './pages/login'
import DashboardLayout from './components/layouts/DashboardLayout'
import InvestorDashboard from './pages/dashboard/investor'
import EntrepreneurDashboard from './pages/dashboard/entrepreneur'
import VerifyEmail from './pages/verify-email'
import {useAuth} from './context/Authcontext'
import NotFound from './components/not-found'
import Profile from './pages/profile/profile'
function App() {
  const {user} = useAuth()
  // console.log(user);
  const getDashboardRedirect = () => {
    if (!user) return <Navigate to="/login" />;
    return <Navigate to={user.role === 'investor' ? '/dashboard/investor' : '/dashboard/entrepreneur'} />;
  };

  return (
    <Routes>
      <Route path='/register' element={!user ? <Register/> :getDashboardRedirect()} />
      <Route path='/login' element={!user ? <Login /> :  getDashboardRedirect()}/>
      <Route path='/verify-email' element={!user? <VerifyEmail />: getDashboardRedirect()} />
       {/* Protected Dashboard Routes */}
      <Route element={user? <DashboardLayout /> : <Navigate to={'/login'}/>}>
        <Route path="/dashboard" element={getDashboardRedirect()} />
        <Route path="/dashboard/investor" element={user?.role === 'investor' ? <InvestorDashboard /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/entrepreneur" element={user?.role === 'entrepreneur' ? <EntrepreneurDashboard /> : <Navigate to="/dashboard" />} />

        {/* Protected profile Routes */}
        <Route path='/profile' element={<Profile/>} />
      </Route>
      <Route path='*' element={<NotFound/>} />
   </Routes>
  )
}

export default App
