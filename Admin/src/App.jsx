import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Products from './pages/Products'
import ProductCategories from './pages/ProductCategories'
import PostCategories from './pages/PostCategories'
import Posts from './pages/Posts'
import Consultations from './pages/Consultations'
import Settings from './pages/Settings'
import Slides from './pages/Slides'
import FAQ from './pages/FAQ'
import Contacts from './pages/Contacts'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="product-categories" element={<ProductCategories />} />
        <Route path="post-categories" element={<PostCategories />} />
        <Route path="posts" element={<Posts />} />
        <Route path="consultations" element={<Consultations />} />
        <Route path="settings" element={<Settings />} />
        <Route path="slides" element={<Slides />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
