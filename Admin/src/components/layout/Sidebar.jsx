import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'
import {
    LayoutDashboard,
    Users,
    Package,
    Tag,
    FolderOpen,
    FileText,
    MessageSquare,
    Settings,
    Images,
    HelpCircle,
    Mail,
    ChevronDown,
    ChevronRight,
} from 'lucide-react'

const managementItems = [
    // { to: '/users', icon: Users, label: 'Người dùng' },
    { to: '/product-categories', icon: Tag, label: 'Danh mục sản phẩm' },
    { to: '/products', icon: Package, label: 'Sản phẩm' },

    { to: '/post-categories', icon: FolderOpen, label: 'Danh mục bài viết' },
    { to: '/posts', icon: FileText, label: 'Bài viết' },

    { to: '/consultations', icon: MessageSquare, label: 'Yêu cầu tư vấn' },
]

const configItems = [
    { to: '/settings', icon: Settings, label: 'Cấu hình' },
    { to: '/slides', icon: Images, label: 'Slide' },
    { to: '/collections', icon: Images, label: 'Bộ sưu tập' },
    { to: '/faq', icon: HelpCircle, label: 'FAQ' },
    { to: '/contacts', icon: Mail, label: 'Liên hệ' },
]

const navLinkClass = (isActive, isCollapsed) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2 text-[13px] font-bold transition-all duration-300 relative group/link ${isActive
        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 font-black'
        : 'text-gray-500 hover:bg-primary-50 hover:text-primary-600 hover:pl-5'
    } ${isCollapsed ? 'justify-center mx-1' : 'mx-2'}`

const Sidebar = ({ isOpen }) => {
    const [managementOpen, setManagementOpen] = useState(true)
    const location = useLocation()

    const isManagementActive = managementItems.some((item) =>
        location.pathname.startsWith(item.to)
    )

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 flex flex-col transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-40 ${isOpen ? 'w-64' : 'w-20'
                }`}
        >
            {/* Logo */}
            <div
                className={`flex items-center gap-3 h-20 border-b border-gray-50 shrink-0 transition-all duration-500 ${isOpen ? 'px-6' : 'justify-center'
                    }`}
            >
                <img src={logo} alt="Logo" className={`h-10 w-auto transition-transform duration-500 ${!isOpen ? 'scale-110' : ''}`} />
                {isOpen && (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                        <p className="font-black text-gray-900 text-[15px] leading-none tracking-tight">Minh Anh</p>
                        <p className="text-primary-600 text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">Quản trị hệ thống</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-1 space-y-1.5 no-scrollbar">
                {/* Dashboard */}
                <NavLink
                    to="/"
                    end
                    title={!isOpen ? 'Dashboard' : undefined}
                    className={({ isActive }) => navLinkClass(isActive, !isOpen)}
                >
                    {({ isActive }) => (
                        <>
                            <LayoutDashboard size={isOpen ? 18 : 22} className="shrink-0 transition-all duration-300" />
                            <span className={`transition-all duration-300 origin-left ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 hidden'}`}>
                                Tổng quan
                            </span>
                            {isActive && !isOpen && (
                                <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full"></div>
                            )}
                        </>
                    )}
                </NavLink>

                {/* Section Divider */}
                <div className="pt-4 pb-2 px-4">
                    {isOpen ? (
                        <button
                            onClick={() => setManagementOpen(!managementOpen)}
                            className={`w-full flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isManagementActive ? 'text-primary-600' : 'text-gray-300 hover:text-gray-500'
                                }`}
                        >
                            <span>Quản lý</span>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${managementOpen ? '' : '-rotate-90'}`} />
                        </button>
                    ) : (
                        <div className="h-px bg-gray-50 mx-auto w-8" />
                    )}
                </div>

                {/* Management Items */}
                <div
                    className={`space-y-1.5 overflow-hidden transition-all duration-500 ease-in-out ${isOpen && !managementOpen ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
                        }`}
                >
                    {managementItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            title={!isOpen ? label : undefined}
                            className={({ isActive }) => navLinkClass(isActive, !isOpen)}
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon size={isOpen ? 18 : 22} className="shrink-0 transition-all duration-300 group-hover/link:scale-110" />
                                    <span className={`transition-all duration-300 origin-left ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 hidden'}`}>
                                        {label}
                                    </span>
                                    {isActive && !isOpen && (
                                        <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full"></div>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Config Section Divider */}
                <div className="pt-3 pb-2 px-4">
                    {isOpen ? (
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600">
                            Hệ thống
                        </p>
                    ) : (
                        <div className="h-px bg-gray-50 mx-auto w-8" />
                    )}
                </div>

                {configItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        title={!isOpen ? label : undefined}
                        className={({ isActive }) => navLinkClass(isActive, !isOpen)}
                    >
                        {({ isActive }) => (
                            <>
                                <Icon size={isOpen ? 18 : 22} className="shrink-0 transition-all duration-300 group-hover/link:scale-110" />
                                <span className={`transition-all duration-300 origin-left ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 hidden'}`}>
                                    {label}
                                </span>
                                {isActive && !isOpen && (
                                    <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full"></div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            {isOpen && (
                <div className="shrink-0 p-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center">v1.0.0 © 2026 MinAnh</p>
                </div>
            )}
        </aside>
    )
}

export default Sidebar
