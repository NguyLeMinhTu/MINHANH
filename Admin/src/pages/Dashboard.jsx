import React from 'react'
import { Users, Package, FileText, MessageSquare, ArrowUpRight } from 'lucide-react'
import { nguoiDung, sanPham, baiViet, yeuCauTuVan } from '../assets/assets'

const Dashboard = () => {
    const stats = [
        {
            label: 'Người dùng',
            value: nguoiDung.length,
            icon: Users,
            color: 'bg-blue-500',
            light: 'bg-blue-50 text-blue-600',
            change: `${nguoiDung.filter(u => u.trang_thai).length} đang hoạt động`,
        },
        {
            label: 'Sản phẩm',
            value: sanPham.length,
            icon: Package,
            color: 'bg-emerald-500',
            light: 'bg-emerald-50 text-emerald-600',
            change: `${sanPham.filter(p => p.trang_thai === 'cong_khai').length} công khai`,
        },
        {
            label: 'Bài viết',
            value: baiViet.length,
            icon: FileText,
            color: 'bg-violet-500',
            light: 'bg-violet-50 text-violet-600',
            change: `${baiViet.filter(b => b.trang_thai === 'cong_khai').length} đã xuất bản`,
        },
        {
            label: 'Yêu cầu tư vấn',
            value: yeuCauTuVan.length,
            icon: MessageSquare,
            color: 'bg-amber-500',
            light: 'bg-amber-50 text-amber-600',
            change: `${yeuCauTuVan.filter(y => !y.da_xu_ly).length} chờ xử lý`,
        },
    ]

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#DAA06D] to-[#b8844a] rounded-2xl p-6 text-white shadow-lg">
                <h2 className="text-xl font-bold mb-1">Chào mừng trở lại! 👋</h2>
                <p className="text-[#f5d9b5] text-sm">Đây là tổng quan hoạt động hệ thống hôm nay.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon, color, light, change }) => (
                    <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}>
                                <Icon size={22} className="text-white" />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${light}`}>
                                {change}
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{value}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Consultations Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Yêu cầu tư vấn gần đây</h3>
                    <button className="text-sm text-[#DAA06D] hover:text-[#c08850] font-medium flex items-center gap-1">
                        Xem tất cả <ArrowUpRight size={14} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-3 font-medium">Khách hàng</th>
                                <th className="text-left px-6 py-3 font-medium">Số điện thoại</th>
                                <th className="text-left px-6 py-3 font-medium">Email</th>
                                <th className="text-left px-6 py-3 font-medium">Trạng thái</th>
                                <th className="text-left px-6 py-3 font-medium">Ngày gửi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {yeuCauTuVan.map((item) => (
                                <tr key={item.yeu_cau_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#DAA06D]/20 text-[#DAA06D] flex items-center justify-center text-xs font-semibold shrink-0">
                                                {item.ten_khach.charAt(0)}
                                            </div>
                                            <span className="font-medium text-gray-800">{item.ten_khach}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-500">{item.so_dien_thoai}</td>
                                    <td className="px-6 py-3.5 text-gray-500">{item.email}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.da_xu_ly ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {item.da_xu_ly ? 'Đã xử lý' : 'Chờ xử lý'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-400 text-xs">
                                        {new Date(item.ngay_gui).toLocaleDateString('vi-VN')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
