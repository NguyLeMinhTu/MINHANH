import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import axiosInstance from '../utils/axiosConfig'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('admin_user')
        return stored ? JSON.parse(stored) : null
    })
    const intervalRef = useRef(null)

    // Polling: cứ 30 giây check /auth/me một lần
    // Nếu token hết hạn, backend trả 401 → axiosConfig redirect về /login
    useEffect(() => {
        if (user) {
            intervalRef.current = setInterval(async () => {
                try {
                    await axiosInstance.get('/auth/me')
                } catch (error) {
                    // axiosConfig đã xử lý redirect về /login khi 401
                    // Dọn dẹp state local
                    setUser(null)
                    localStorage.removeItem('admin_user')
                    clearInterval(intervalRef.current)
                }
            }, 30 * 1000) // 30 giây poll 1 lần
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [user])

    const login = async (email, matKhau) => {
        try {
            const data = await axiosInstance.post('/auth/login', { email, matKhau });
            
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
        if (intervalRef.current) clearInterval(intervalRef.current)
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
