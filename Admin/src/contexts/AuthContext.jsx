import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import axiosInstance from '../utils/axiosConfig'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('admin_user')
        return stored ? JSON.parse(stored) : null
    })
    const intervalRef = useRef(null)

    // Polling & Idle Timer
    useEffect(() => {
        let logoutTimer = null;

        const resetTimer = () => {
            if (logoutTimer) clearTimeout(logoutTimer);
            // 10 phút không tương tác thì logout
            logoutTimer = setTimeout(() => {
                console.warn("User idle for 10 minutes. Logging out...");
                logout();
            }, 10 * 60 * 1000);
        };

        if (user) {
            // 1. Polling check session (30s)
            intervalRef.current = setInterval(async () => {
                try {
                    await axiosInstance.get('/auth/me');
                } catch (error) {
                    setUser(null);
                    localStorage.removeItem('admin_user');
                    clearInterval(intervalRef.current);
                }
            }, 30 * 1000);

            // 2. Idle Timer listeners
            const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
            events.forEach(event => window.addEventListener(event, resetTimer));
            resetTimer(); // Khởi tạo timer lần đầu

            return () => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                if (logoutTimer) clearTimeout(logoutTimer);
                events.forEach(event => window.removeEventListener(event, resetTimer));
            };
        }
    }, [user]);

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
