import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Bell, Search, ChevronDown, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

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
    const userMenuRef = useRef(null)
    const title = routeTitles[location.pathname] || 'Admin'
    const breadcrumbs = getBreadcrumb(location.pathname)

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <header
            className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-5 z-30 transition-all duration-300 ${isOpen ? 'left-64' : 'left-16'
                }`}
        >
            {/* Left: Toggle + Breadcrumb */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggle}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
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
                        className="pl-8 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-[#DAA06D] focus:border-transparent transition-all"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={userMenuRef}>
                    <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-2 pl-2 pr-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm shrink-0">
                            {user?.anh_dai_dien
                                ? <img src={user.anh_dai_dien} alt={user.ten} className="w-full h-full object-cover" />
                                : <div className="w-full h-full bg-gradient-to-br from-[#DAA06D] to-[#b8844a] flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">{user?.ten?.charAt(0) ?? 'A'}</span>
                                </div>
                            }
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-gray-700 leading-tight">{user?.ten ?? 'Admin'}</p>
                            <p className="text-xs text-gray-400 leading-tight">Quản trị viên</p>
                        </div>
                        <ChevronDown
                            size={15}
                            className={`text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                            <div className="px-4 py-2.5 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-800">{user?.ten ?? 'Admin'}</p>
                                <p className="text-xs text-gray-400">{user?.email ?? ''}</p>
                            </div>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
                                <User size={16} />
                                <span>Hồ sơ</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
                                <Settings size={16} />
                                <span>Cài đặt</span>
                            </button>
                            <div className="border-t border-gray-100 mt-1 pt-1">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={16} />
                                    <span>Đăng xuất</span>
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
