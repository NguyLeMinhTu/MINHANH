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
            // Lưu ý: data lúc này chỉ chứa thông tin user, không chứa token (token nằm trong Cookie)
            if (data && data.vaiTro === 'admin') {
                setUser(data)
                localStorage.setItem('admin_user', JSON.stringify(data))
                return true
            } else if (data && data.vaiTro !== 'admin') {
                console.warn("Tài khoản không có quyền Admin");
                return false
            }
            return false
        } catch (error) {
            console.error("Lỗi đăng nhập:", error)
            return false
        }
    }

    const logout = async () => {
        try {
            await axiosInstance.post('/auth/logout');
        } catch (error) {
            console.error("Lỗi khi gọi API logout:", error);
        } finally {
            setUser(null)
            localStorage.removeItem('admin_user')
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
