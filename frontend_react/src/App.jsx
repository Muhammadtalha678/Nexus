import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Register from './pages/register'
import Login from './pages/login'
import DashboardLayout from './components/layouts/DashboardLayout'
import InvestorDashboard from './pages/dashboard/investor'
import EntrepreneurDashboard from './pages/dashboard/entrepreneur'
import VerifyEmail from './pages/verify-email'

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/verify-email' element={<VerifyEmail />} />
      <Route element={<DashboardLayout />}>
        
       <Route path='/dashboard/investor' element={<InvestorDashboard/>} />
       <Route path='/dashboard/entrepreneur' element={<EntrepreneurDashboard/>} />
      </Route>
   </Routes>
  )
}

export default App
