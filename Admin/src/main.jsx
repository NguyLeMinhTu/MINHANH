import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'sileo'
// import 'sileo/dist/styles.css'
import { store } from './app/store'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="top-center" theme="dark" options={{ duration: 3500 }} />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
