import React, { createContext, useContext, useState } from 'react'
import axiosInstance from '../utils/axiosConfig'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('admin_user')
        return stored ? JSON.parse(stored) : null
    })

    const login = async (email, matKhau) => {
        try {
            const data = await axiosInstance.post('/auth/login', { email, matKhau });
            
            // Xử lý thành công
            if (data && data.vaiTro === 'admin') {
                setUser(data)
                localStorage.setItem('admin_user', JSON.stringify(data))
                return true
            } else {
                console.warn("Tài khoản không có quyền Admin");
                return false
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error)
            return false
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('admin_user')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
