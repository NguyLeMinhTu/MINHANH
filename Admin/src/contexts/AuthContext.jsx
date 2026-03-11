import React, { createContext, useContext, useState } from 'react'
import { nguoiDung } from '../assets/assets'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('admin_user')
        return stored ? JSON.parse(stored) : null
    })

    const login = (email, password) => {
        const found = nguoiDung.find(
            (u) => u.email === email && u.mat_khau === password && u.vai_tro === 'admin'
        )
        if (found) {
            const { mat_khau, reset_token, reset_token_expire, ...safeUser } = found
            setUser(safeUser)
            localStorage.setItem('admin_user', JSON.stringify(safeUser))
            return true
        }
        return false
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
