import React, { useState } from 'react'
import { sileo } from 'sileo'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { AlertCircle, User, Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import logo from '../assets/logo.png'
import logo_login from '../assets/logo_login.png'

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.email || !form.password) {
            setError('Vui lòng nhập đầy đủ thông tin để tiếp tục.')
            sileo.error({ title: 'Thiếu thông tin', description: 'Vui lòng nhập đầy đủ email và mật khẩu.' })
            return
        }
        setLoading(true)
        try {
            const ok = await login(form.email, form.password)
            if (ok) {
                sileo.success({ title: 'Đăng nhập thành công!', description: 'Chào mừng trở lại trang quản trị.' })
                navigate('/', { replace: true })
            } else {
                setError('Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại.')
                sileo.error({ title: 'Đăng nhập thất bại', description: 'Email hoặc mật khẩu không chính xác.' })
            }
        } catch (err) {
            sileo.error({ title: 'Lỗi hệ thống', description: 'Có lỗi xảy ra trong quá trình đăng nhập.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-surface-100 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-primary-100 selection:text-primary-700">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-200/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-primary-300/20 rounded-full blur-[100px]"></div>

                {/* Background Watermark Logo */}
                <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] opacity-[0.3] -rotate-12 pointer-events-none">
                    <img src={logo} alt="" className="w-full h-full object-contain" />
                </div>

                {/* Bottom Right Small Logo */}
                <div className="absolute bottom-10 right-10 opacity-70 hover:opacity-100 transition-all duration-500">
                    <img src={logo} alt="Logo Small" className="h-15 w-auto object-contain" />
                </div>
            </div>

            <div className="w-full max-w-[1000px] flex flex-col items-center gap-10 z-10">
                <div className="flex flex-col items-center gap-2">
                </div>

                <div className="w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-white/40 relative">

                    {/* Left Side - Brand Showcase */}
                    <div className="w-full md:w-[42%] bg-primary-600 p-12 md:p-16 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                        {/* Decorative Patterns */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="1.5" fill="white" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#dots)" />
                            </svg>
                        </div>

                        <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary-400 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-primary-800 rounded-full blur-2xl opacity-60"></div>

                        <div className="relative z-10 space-y-10 flex flex-col justify-center min-h-full">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold tracking-widest uppercase self-start">
                                <ShieldCheck size={14} className="text-primary-100" />
                                Secure Access
                            </div>

                            <div className="flex flex-col items-center">
                                <img src={logo_login} alt="Minh Anh Logo" className="h-36 w-auto brightness-0 invert drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-3xl font-medium tracking-wide text-primary-100/90 italic">
                                    Admin Control Panel
                                </h3>
                                <p className="text-primary-100 font-medium leading-relaxed max-w-xs transition-all duration-500 hover:text-white">
                                    Hệ thống quản trị thông minh, giúp bạn quản lý dữ liệu một cách hiệu quả và chuyên nghiệp nhất.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Auth Form */}
                    <div className="w-full md:w-[50%] p-10 md:p-12 flex flex-col justify-center bg-white/40">
                        <div className="max-w-md mx-auto w-full">
                            <div className="mb-10 text-center md:text-left">
                                <h2 className="text-3xl font-semibold text-golden-earth-800 mb-3 tracking-tight">WELCOME BACK!</h2>
                                <p className="text-slate-500 font-medium">Nhập thông tin để bắt đầu phiên làm việc.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Error Message with Animation */}
                                {error && (
                                    <div className="flex items-center gap-3 bg-red-50 text-red-600 rounded-2xl px-5 py-4 text-sm border border-red-100/50 animate-shake shadow-sm shadow-red-100">
                                        <AlertCircle size={18} className="shrink-0" />
                                        <p className="font-semibold">{error}</p>
                                    </div>
                                )}

                                {/* Inputs Container */}
                                <div className="space-y-4">
                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                                        <div className="group relative">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-primary-500">
                                                <User size={20} className="text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="abc@example.com"
                                                className="w-full pl-14 pr-5 py-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white transition-all duration-300 shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mật khẩu</label>
                                        <div className="group relative">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-primary-500">
                                                <Lock size={20} className="text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                            </div>
                                            <input
                                                type={showPass ? 'text' : 'password'}
                                                name="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                placeholder="Nhập mật khẩu"
                                                className="w-full pl-14 pr-20 py-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white transition-all duration-300 shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPass(!showPass)}
                                                className="absolute inset-y-0 right-0 pr-5 flex items-center text-[10px] font-bold text-slate-400 hover:text-primary-600 transition-colors uppercase tracking-[0.2em]"
                                                tabIndex="-1"
                                            >
                                                {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Utils */}
                                <div className="flex items-center justify-between text-sm px-1">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer sr-only" />
                                            <div className="w-5 h-5 bg-slate-100 border-2 border-slate-200 rounded-lg transition-all peer-checked:bg-primary-600 peer-checked:border-primary-600"></div>
                                            <svg className="absolute w-3.5 h-3.5 text-white left-[3px] opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-600 font-bold group-hover:text-slate-900 transition-colors">Ghi nhớ tôi</span>
                                    </label>
                                    <button type="button" className="text-primary-600 hover:text-primary-700 font-bold tracking-tight transition-colors">Quên mật khẩu?</button>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white disabled:bg-primary-300 disabled:cursor-not-allowed font-bold py-5 rounded-2xl transition-all duration-300 mt-6 shadow-primary-500 hover:shadow-primary-600 hover:-translate-y-1 active:translate-y-0 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                    {loading ? (
                                        <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>ĐĂNG NHẬP NGAY</span>
                                            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Hint */}
                            <div className="mt-10 text-center">
                                <div className="inline-flex gap-4 p-2.5 bg-slate-100/50 rounded-2xl border border-slate-100">
                                    <span className="text-[11px] font-bold text-slate-500">USER: admin@gmail.com</span>
                                    <div className="w-px h-3 bg-slate-300 self-center"></div>
                                    <span className="text-[11px] font-bold text-slate-500">PASS: admin123</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shimmer { animation: shimmer 1.5s infinite; }
                .animate-shake { animation: shake 0.4s ease-in-out 0s 2; }
            `}} />
        </div>
    )
}

export default Login
