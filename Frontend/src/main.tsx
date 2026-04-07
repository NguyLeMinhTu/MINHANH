import { createRoot } from 'react-dom/client'
import { Toaster } from 'sileo'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <Toaster position="top-center" options={{ duration: 3500 }} />
  </BrowserRouter>,
)
