import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
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
    { to: '/users', icon: Users, label: 'Người dùng' },
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
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${isActive
        ? 'bg-[#DAA06D] text-white shadow-sm'
        : 'text-gray-500 hover:bg-[#DAA06D]/10 hover:text-[#DAA06D]'
    } ${isCollapsed ? 'justify-center' : ''}`

const Sidebar = ({ isOpen }) => {
    const [managementOpen, setManagementOpen] = useState(true)
    const location = useLocation()

    const isManagementActive = managementItems.some((item) =>
        location.pathname.startsWith(item.to)
    )

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-40 shadow-sm ${isOpen ? 'w-64' : 'w-16'
                }`}
        >
            {/* Logo */}
            <div
                className={`flex items-center gap-3 h-16 border-b border-gray-100 shrink-0 ${isOpen ? 'px-5' : 'justify-center'
                    }`}
            >
                {/* <div className="w-8 h-8 bg-[#DAA06D] rounded-lg flex items-center justify-center shrink-0 shadow-lg"> */}
                {/* <span className="text-white font-bold text-sm">M</span> */}
                <img src={logo} alt="Logo" className="size-20" />
                {/* </div> */}
                {isOpen && (
                    <div>
                        <p className="font-bold text-gray-800 text-sm leading-tight">Minh Anh</p>
                        <p className="text-[#DAA06D] text-xs">Trang quản trị</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 scrollbar-thin">
                {/* Dashboard */}
                <NavLink
                    to="/"
                    end
                    title={!isOpen ? 'Dashboard' : undefined}
                    className={({ isActive }) => navLinkClass(isActive, !isOpen)}
                >
                    <LayoutDashboard size={20} className="shrink-0" />
                    {isOpen && <span>Dashboard</span>}
                </NavLink>

                {/* Section Divider */}
                {isOpen ? (
                    <div className="pt-3 pb-1">
                        <button
                            onClick={() => setManagementOpen(!managementOpen)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${isManagementActive
                                ? 'text-[#DAA06D]'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <span>Quản lý</span>
                            <span className="transition-transform duration-200">
                                {managementOpen ? (
                                    <ChevronDown size={14} />
                                ) : (
                                    <ChevronRight size={14} />
                                )}
                            </span>
                        </button>
                    </div>
                ) : (
                    <div className="py-2">
                        <div className="border-t border-gray-100" />
                    </div>
                )}

                {/* Management Items */}
                <div
                    className={`space-y-0.5 overflow-hidden transition-all duration-300 ${isOpen && !managementOpen ? 'max-h-0' : 'max-h-96'
                        }`}
                >
                    {managementItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            title={!isOpen ? label : undefined}
                            className={({ isActive }) =>
                                isOpen
                                    ? `flex items-center gap-3 rounded-lg pl-5 pr-3 py-2 text-sm transition-all duration-150 ${isActive
                                        ? 'bg-[#DAA06D] text-white shadow-sm'
                                        : 'text-gray-500 hover:bg-[#DAA06D]/10 hover:text-[#DAA06D]'
                                    }`
                                    : navLinkClass(isActive, true)
                            }
                        >
                            <Icon size={isOpen ? 17 : 20} className="shrink-0" />
                            {isOpen && <span>{label}</span>}
                        </NavLink>
                    ))}
                </div>

                {/* Config Section */}
                <div className="pt-3 pb-1">
                    {isOpen ? (
                        <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Hệ thống
                        </p>
                    ) : (
                        <div className="border-t border-gray-100 mb-1" />
                    )}
                </div>

                {configItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        title={!isOpen ? label : undefined}
                        className={({ isActive }) => navLinkClass(isActive, !isOpen)}
                    >
                        <Icon size={20} className="shrink-0" />
                        {isOpen && <span>{label}</span>}
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
