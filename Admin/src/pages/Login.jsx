import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react'
import logo from '../assets/logo.jpg'

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        if (error) setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.email || !form.password) {
            setError('Vui lòng nhập đầy đủ thông tin.')
            return
        }
        setLoading(true)
        setTimeout(() => {
            const ok = login(form.email, form.password)
            if (ok) {
                navigate('/', { replace: true })
            } else {
                setError('Email hoặc mật khẩu không đúng, hoặc tài khoản không có quyền admin.')
            }
            setLoading(false)
        }, 400)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#2d1800] to-slate-900 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#DAA06D]/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="size-18 rounded-2xl flex items-center justify-center shadow-lg shadow-[#DAA06D]/30 mb-4">
                            {/* <span className="text-white font-bold text-2xl">M</span> */}
                            <img src={logo} alt="Logo" className="size-18" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">MINHANH Admin</h1>
                        <p className="text-slate-400 text-sm mt-1">Đăng nhập để tiếp tục</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Error */}
                        {error && (
                            <div className="flex items-start gap-2.5 bg-red-500/15 border border-red-500/30 text-red-300 rounded-xl px-4 py-3 text-sm">
                                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="admin@gmail.com"
                                autoComplete="username"
                                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#DAA06D] focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    className="w-full px-4 py-3 pr-11 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#DAA06D] focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                                >
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-[#DAA06D] hover:bg-[#e0b07d] disabled:bg-[#a87040] disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors mt-2 shadow-lg shadow-[#DAA06D]/20"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    Đăng nhập
                                </>
                            )}
                        </button>
                    </form>

                    {/* Hint */}
                    <p className="text-center text-xs text-slate-600 mt-6">
                        Demo: admin@gmail.com / admin123
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
