import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Bell, Search, ChevronDown, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import axiosInstance from '../../utils/axiosConfig'

const routeTitles = {
    '/': 'Dashboard',
    '/users': 'Người dùng',
    '/products': 'Sản phẩm',
    '/product-categories': 'Danh mục sản phẩm',
    '/post-categories': 'Danh mục bài viết',
    '/posts': 'Bài viết',
    '/consultations': 'Yêu cầu tư vấn',
    '/settings': 'Cấu hình',
    '/slides': 'Slide',
    '/faq': 'FAQ',
    '/contacts': 'Liên hệ',
}

const getBreadcrumb = (pathname) => {
    const managementPaths = [
        '/users', '/products', '/product-categories',
        '/post-categories', '/posts', '/consultations',
    ]
    if (managementPaths.some((p) => pathname.startsWith(p))) {
        return ['Quản lý', routeTitles[pathname]]
    }
    const systemPaths = ['/settings', '/slides', '/faq', '/contacts']
    if (systemPaths.some((p) => pathname.startsWith(p))) {
        return ['Hệ thống', routeTitles[pathname]]
    }
    return [routeTitles[pathname] || 'Admin']
}

const Header = ({ isOpen, onToggle }) => {
    const { user, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [notificationsOpen, setNotificationsOpen] = useState(false)
    const userMenuRef = useRef(null)
    const notificationsRef = useRef(null)
    const breadcrumbs = getBreadcrumb(location.pathname)

    const [unhandledConsultations, setUnhandledConsultations] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchNotifications = async () => {
        try {
            setLoading(true)
            const res = await axiosInstance.get('/admin/yeu-cau-tu-van?daXuLy=false&size=5')
            setUnhandledConsultations(res.content || [])
        } catch (err) {
            console.error('Lỗi khi tải thông báo:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    useEffect(() => {
        fetchNotifications()
        const interval = setInterval(fetchNotifications, 10000) // 10s fallback

        const handleNewConsultation = () => {
            fetchNotifications()
        }

        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false)
            }
            if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
                setNotificationsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        window.addEventListener('new-consultation', handleNewConsultation)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('new-consultation', handleNewConsultation)
            clearInterval(interval)
        }
    }, [])

    return (
        <header
            className={`fixed top-0 right-0 h-16 bg-surface-50/80 backdrop-blur-md border-b border-surface-200 flex items-center justify-between px-5 z-30 transition-all duration-300 ${isOpen ? 'left-64' : 'left-16'
                }`}
        >
            {/* Left: Toggle + Breadcrumb */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggle}
                    className="p-2 rounded-lg text-gray-400 hover:bg-surface-100 hover:text-primary-600 transition-colors"
                    aria-label="Toggle sidebar"
                >
                    <Menu size={20} />
                </button>

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-sm">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={crumb}>
                            {index > 0 && (
                                <span className="text-gray-300 select-none">/</span>
                            )}
                            <span
                                className={
                                    index === breadcrumbs.length - 1
                                        ? 'font-semibold text-gray-800'
                                        : 'text-gray-400'
                                }
                            >
                                {crumb}
                            </span>
                        </React.Fragment>
                    ))}
                </nav>
            </div>

            {/* Right: Search + Notifications + User */}
            <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative hidden md:flex items-center">
                    <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="pl-8 pr-4 py-2 text-sm bg-surface-100 border border-surface-200 rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
                    />
                </div>

                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                    <button
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className={`relative p-2.5 rounded-xl transition-all group ${notificationsOpen ? 'bg-primary-500/10 text-primary-500' : 'text-gray-400 hover:bg-surface-100 hover:text-primary-500'}`}
                    >
                        <Bell 
                            size={21} 
                            strokeWidth={1.5} 
                            className={`transition-transform ${notificationsOpen ? 'rotate-12' : 'group-hover:rotate-12'} ${unhandledConsultations.length > 0 ? 'animate-bell-swing' : ''}`} 
                        />
                        {unhandledConsultations.length > 0 && (
                            <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full ring-2 ring-white shadow-sm animate-bounce-subtle">
                                {unhandledConsultations.length}
                            </span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {notificationsOpen && (
                        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
                            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <h3 className="text-sm font-black text-gray-800 tracking-tight">Thông báo mới</h3>
                                <span className="text-[10px] font-bold text-primary-600 bg-primary-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                                    {unhandledConsultations.length} yêu cầu
                                </span>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {unhandledConsultations.length > 0 ? (
                                    unhandledConsultations.slice(0, 5).map((noti) => (
                                        <div
                                            key={noti.yeuCauId}
                                            onClick={() => {
                                                navigate(`/consultations?search=${noti.soDienThoai}`)
                                                setNotificationsOpen(false)
                                            }}
                                            className="px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer group"
                                        >
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center font-black text-sm shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-all">
                                                    {(noti.tenKhach || 'K').charAt(0)}
                                                </div>
                                                <div className="space-y-0.5 flex-1">
                                                    <p className="text-sm text-gray-800 font-bold leading-tight line-clamp-1">{noti.tenKhach}</p>
                                                    <p className="text-xs text-gray-500 font-medium">{noti.soDienThoai}</p>
                                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">
                                                        {new Date(noti.ngayGui).toLocaleDateString('vi-VN')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-5 py-10 text-center">
                                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Bell size={20} className="text-gray-300" />
                                        </div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Không có thông báo mới</p>
                                    </div>
                                )}
                            </div>
                            {unhandledConsultations.length > 0 && (
                                <button
                                    onClick={() => {
                                        navigate('/consultations')
                                        setNotificationsOpen(false)
                                    }}
                                    className="w-full py-3.5 text-xs font-black text-gray-500 hover:text-primary-600 hover:bg-primary-500/5 transition-all uppercase tracking-widest border-t border-surface-50"
                                >
                                    Xem tất cả yêu cầu
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* User Dropdown */}
                <div className="relative" ref={userMenuRef}>
                    <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-2 pl-2 pr-2 py-1.5 rounded-lg hover:bg-surface-100 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm shrink-0">
                            {user?.anh_dai_dien
                                ? <img src={user.anh_dai_dien} alt={user.ten} className="w-full h-full object-cover" />
                                : <div className="w-full h-full bg-linear-to-br from-primary-600 to-primary-400 flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">{user?.ten?.charAt(0) ?? 'A'}</span>
                                </div>
                            }
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-bold text-gray-700 leading-tight">{user?.ten ?? 'Admin'}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight mt-0.5">Quản trị</p>
                        </div>
                        <ChevronDown
                            size={14}
                            className={`text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                            <div className="px-5 py-3 border-b border-gray-50 mb-1">
                                <p className="text-sm font-bold text-gray-800">{user?.ten ?? 'Admin'}</p>
                                <p className="text-[11px] text-gray-400 font-medium truncate">{user?.email ?? 'admin@minhanh.vn'}</p>
                            </div>
                            <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-500 hover:bg-primary-50 rounded-lg hover:text-primary-600 transition-colors mx-1 w-[calc(100%-8px)]">
                                <User size={16} />
                                <span className="font-medium">Hồ sơ cá nhân</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-500 hover:bg-primary-50 rounded-lg hover:text-primary-600 transition-colors mx-1 w-[calc(100%-8px)]">
                                <Settings size={16} />
                                <span className="font-medium">Cài đặt tài khoản</span>
                            </button>
                            <div className="border-t border-gray-50 mt-1 pt-1">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors mx-1 w-[calc(100%-8px)]"
                                >
                                    <LogOut size={16} />
                                    <span className="font-semibold">Đăng xuất</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
