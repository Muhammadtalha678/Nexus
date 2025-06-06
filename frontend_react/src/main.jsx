import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/Authcontext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
)
