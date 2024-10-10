import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import router from './assets/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer/>
      <RouterProvider router={router}/>
  </StrictMode>,
)
