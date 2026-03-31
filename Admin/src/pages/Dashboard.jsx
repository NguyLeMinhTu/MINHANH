import React, { useState, useEffect } from 'react'
import { Eye, Package, FileText, MessageSquare, ArrowUpRight } from 'lucide-react'
import dashboardBg from '../assets/dashboard-bg.png'
import axiosInstance from '../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
    const [statsData, setStatsData] = useState({
        totalProducts: 0,
        activeProducts: 0,
        totalPosts: 0,
        activePosts: 0,
        productCategories: 0,
        newConsultations: 0,
        pageViews: 0,
        recentConsultations: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosInstance.get('/admin/dashboard/stats');
                setStatsData(res);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu dashboard", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const stats = [
        {
            label: 'Lượt truy cập trang',
            value: statsData.pageViews,
            icon: Eye,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            change: `Từ người dùng frontend`,
        },
        {
            label: 'Danh mục sản phẩm',
            value: statsData.productCategories,
            icon: Package,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            change: `${statsData.activeProducts} SP đang kinh doanh`,
        },
        {
            label: 'Bài viết & Tin tức',
            value: statsData.totalPosts,
            icon: FileText,
            color: 'text-indigo-500',
            bg: 'bg-indigo-50',
            change: `${statsData.activePosts} bài viết công khai`,
        },
        {
            label: 'Yêu cầu tư vấn mới',
            value: statsData.newConsultations,
            icon: MessageSquare,
            color: 'text-rose-500',
            bg: 'bg-rose-50',
            change: `Cần phản hồi sớm`,
        },
    ]

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour >= 5 && hour < 12) return 'Chào buổi sáng'
        if (hour >= 12 && hour < 18) return 'Chào buổi chiều'
        if (hour >= 18 && hour < 22) return 'Chào buổi tối'
        return 'Chúc ngủ ngon' // For late night/early morning
    }

    if (loading) {
        return <div className="p-20 text-center text-neutral-400 font-medium tracking-wide animate-pulse">Đang đồng bộ dữ liệu hệ thống...</div>
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section - Compact Premium Light Mood */}
            <div className="relative overflow-hidden rounded-[32px] bg-linear-to-br from-surface-50 to-surface-100 px-8 py-10 shadow-lg border border-primary-500/10">
                {/* Image Section - Compact on the right */}
                <div className="absolute right-0 top-0 bottom-0 w-2/5 z-0 hidden lg:block overflow-hidden">
                    <img
                        src={dashboardBg}
                        alt="workshop"
                        className="w-full h-full object-cover opacity-70 rounded-l-[80px] shadow-[-20px_0_40px_rgba(218,160,109,0.05)]"
                    />
                    <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-surface-50 via-surface-50/80 to-transparent z-10"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -left-16 -top-16 w-64 h-64 bg-primary-500/5 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Left: Content - High Contrast Dark Text */}
                    <div className="max-w-lg">
                        <div className="inline-flex items-center gap-3 mb-6 bg-white border border-primary-500/20 px-3 py-1.5 rounded-xl shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                            </span>
                            <span className="text-primary-600 text-[9px] font-bold uppercase tracking-[0.25em]">Hệ thống trực tuyến</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-[#2d241e] mb-4 tracking-tight leading-tight">
                            {getGreeting()},<br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-500 to-primary-700">
                                Quản trị viên!
                            </span>
                        </h2>

                        <p className="text-[#8b7e74] text-sm leading-relaxed max-w-sm font-medium">
                            Trung tâm điều phối Minh Anh Uniform. Dữ liệu thời gian thực đã được cập nhật chính xác.
                        </p>
                    </div>

                    {/* Right: Quick Stats - Compact Light Glassmorphism */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 shrink-0">
                        {[
                            { icon: Package, label: 'Sản phẩm', value: statsData.totalProducts, accent: 'bg-blue-500' },
                            { icon: MessageSquare, label: 'Tư vấn mới', value: statsData.newConsultations, accent: 'bg-primary-500' },
                            { icon: FileText, label: 'Bài viết', value: statsData.totalPosts, accent: 'bg-emerald-500' },
                        ].map(({ icon: Icon, label, value, accent }) => (
                            <div key={label} className="group flex items-center gap-5 bg-white/60 backdrop-blur-xl border border-white rounded-2xl px-6 py-4 min-w-[260px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(var(--primary-500),0.1)] hover:bg-white/90 transition-all duration-300">
                                <div className={`w-12 h-12 rounded-xl bg-surface-50 flex items-center justify-center shrink-0 border border-primary-500/10`}>
                                    <Icon size={20} className="text-primary-700" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[#2d241e] text-2xl font-bold leading-none">{value}</p>
                                    <p className="text-[#8b7e74] text-[9px] font-bold uppercase tracking-widest mt-1.5">{label}</p>
                                </div>
                                <div className={`ml-auto w-1 h-8 rounded-full ${accent} opacity-20`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Grid - Premium Minimalist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(({ label, value, icon: Icon, color, bg, change }) => (
                    <div key={label} className="group bg-white rounded-3xl p-7 border border-[#f5f3f0] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_48px_rgba(var(--primary-500),0.08)] hover:border-primary-500/20 transition-all duration-500">
                        <div className="flex items-start justify-between">
                            <div className={`p-3.5 rounded-2xl ${bg} ${color} transition-all duration-500 group-hover:bg-primary-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-500/30`}>
                                <Icon size={24} strokeWidth={1.5} />
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{label}</span>
                                <p className="text-4xl font-bold text-neutral-800 mt-1.5 tracking-tighter">{value}</p>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span className="text-[11px] font-bold text-neutral-400 tracking-tight">{change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Consultations - Main Table */}
                <div className="xl:col-span-2 bg-white rounded-[32px] border border-[#f5f3f0] shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden text-neutral-800 flex flex-col">
                    <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-50 shrink-0">
                        <div>
                            <h3 className="text-xl font-bold text-neutral-800 tracking-tight">Yêu cầu tư vấn gần đây</h3>
                            <p className="text-xs text-neutral-400 font-medium mt-1">Hệ thống ghi nhận 5 yêu cầu mới nhất</p>
                        </div>
                        <button 
                            onClick={() => navigate('/consultations')}
                            className="px-5 py-2.5 text-xs font-bold text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg shadow-primary-500/20"
                        >
                            Xem tất cả yêu cầu
                        </button>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-[10px] text-neutral-300 font-bold uppercase tracking-[0.2em]">
                                    <th className="px-6 py-4">Tên khách hàng</th>
                                    <th className="px-6 py-4">Thông tin liên hệ</th>
                                    <th className="px-6 py-4">Tình trạng</th>
                                    <th className="px-6 py-4">Thời gian</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-50">
                                {statsData.recentConsultations.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-10 py-10 text-center text-sm text-neutral-400">
                                            Chưa có yêu cầu tư vấn nào.
                                        </td>
                                    </tr>
                                ) : statsData.recentConsultations.map((item) => (
                                    <tr key={item.yeuCauId} className="hover:bg-[#fdfcfb] transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-2xl bg-neutral-100 text-neutral-500 flex items-center justify-center font-bold text-sm border border-neutral-200/50 group-hover:bg-primary-500/10 group-hover:text-primary-600 group-hover:border-primary-500/20 transition-all duration-300">
                                                    {(item.tenKhach || 'K').charAt(0)}
                                                </div>
                                                <span className="font-bold text-neutral-700 text-base">{item.tenKhach}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="space-y-1">
                                                <p className="text-sm text-neutral-600 font-bold">{item.soDienThoai}</p>
                                                <p className="text-xs text-neutral-400 font-medium">{item.email || 'Không có email'}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                                item.daXuLy 
                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                                : 'bg-amber-50 text-amber-600 border border-amber-100'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${item.daXuLy ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                                                {item.daXuLy ? 'Đã xử lý' : 'Đang chờ'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-400 text-xs font-bold tabular-nums whitespace-nowrap">
                                            {new Date(item.ngayGui).toLocaleDateString('vi-VN')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Side Widget (Quick Actions or Info) */}
                <div className="space-y-6">
                    <div className="bg-linear-to-br from-primary-500 to-primary-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-lg font-bold mb-2">Tư vấn viên trực tiếp</h4>
                            <p className="text-white/80 text-xs leading-relaxed mb-6">Bạn có thể truy cập nhanh vào danh sách khách hàng từ các kênh mạng xã hội.</p>
                            <button className="w-full bg-white text-primary-600 font-bold py-3 rounded-2xl text-sm shadow-lg hover:bg-neutral-50 transition-colors">
                                Quản lý kênh Zalo
                            </button>
                        </div>
                        <MessageSquare className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 rotate-12" />
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm">
                        <h4 className="font-bold text-neutral-800 mb-4">Các tính năng tiện ích</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0"></div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-700 leading-tight">Thêm sản phẩm mới nhanh</p>
                                    <p className="text-xs text-neutral-400 mt-1 cursor-pointer hover:underline" onClick={() => navigate('/products')}>Chuyển đến trang Sản phẩm</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0"></div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-700 leading-tight">Tùy chỉnh Slider trang chủ</p>
                                    <p className="text-xs text-neutral-400 mt-1 cursor-pointer hover:underline" onClick={() => navigate('/slides')}>Chuyển đến trang Slide</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0"></div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-700 leading-tight">Phản hồi yêu cầu trực tuyến</p>
                                    <p className="text-xs text-neutral-400 mt-1 cursor-pointer hover:underline" onClick={() => navigate('/consultations')}>Xem tất cả tin nhắn</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
