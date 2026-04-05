import React, { useState, useEffect } from 'react'
import { Search, Plus, Mail, Phone, Lock, Unlock } from 'lucide-react'
import { nguoiDung } from '../assets/assets'
import Title from '../components/Title'

const roleLabel = { admin: 'Admin', user: 'Khách hàng' }
const roleStyle = { admin: 'bg-primary-500/10 text-primary-600', user: 'bg-gray-100 text-gray-600' }
const statusStyle = { true: 'bg-emerald-100 text-emerald-700', false: 'bg-red-100 text-red-700' }

const Users = () => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const filtered = nguoiDung.filter((u) =>
        u.ten.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    const paginatedItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <Title text1="Danh sách" text2="người dùng" subText="Quản lý thông tin tài khoản và phân quyền người dùng" />
                <button className="flex items-center gap-2 bg-linear-to-b from-primary-600 to-primary-700/60 hover:from-primary-600 hover:to-primary-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95 mb-8">
                    <Plus size={16} />
                    Thêm người dùng
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-sm">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-3 font-medium">Người dùng</th>
                                <th className="text-left px-6 py-3 font-medium">Liên hệ</th>
                                <th className="text-left px-6 py-3 font-medium">Vai trò</th>
                                <th className="text-left px-6 py-3 font-medium">Trạng thái</th>
                                <th className="text-left px-6 py-3 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedItems.map((user) => (
                                <tr key={user.nguoi_dung_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3">
                                            {user.anh_dai_dien ? (
                                                <img src={user.anh_dai_dien} alt={user.ten} className="w-9 h-9 rounded-full object-cover shrink-0" />
                                            ) : (
                                                <div className="w-9 h-9 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center font-semibold text-sm shrink-0">
                                                    {user.ten.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-gray-800">{user.ten}</p>
                                                <p className="text-xs text-gray-400">{user.gioi_tinh}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className="space-y-0.5">
                                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                                <Mail size={12} /> {user.email}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                                <Phone size={12} /> {user.so_dien_thoai}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleStyle[user.vai_tro]}`}>
                                            {roleLabel[user.vai_tro]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[user.trang_thai]}`}>
                                            {user.trang_thai ? 'Hoạt động' : 'Đã khóa'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <button className={`p-1.5 rounded-lg transition-all bg-white border shadow-sm ${user.trang_thai ? 'hover:bg-red-50 text-gray-400 hover:text-red-500 border-gray-100' : 'hover:bg-emerald-50 text-emerald-500 border-emerald-100'}`} title={user.trang_thai ? 'Khóa bản ghi' : 'Mở khóa bản ghi'}>
                                            {user.trang_thai ? <Lock size={14} /> : <Unlock size={14} />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-center relative">
                        <p className="text-xs text-gray-500 italic absolute left-6 hidden sm:block">
                            Hiển thị {paginatedItems.length} mục trên tổng số {filtered.length}
                        </p>
                        <div className="flex gap-1.5">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-white disabled:opacity-40 transition-colors"
                            >
                                Trước
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-all ${currentPage === i + 1 ? 'bg-primary-500 text-white shadow-sm' : 'hover:bg-white border border-transparent hover:border-gray-200 text-gray-600'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-white disabled:opacity-40 transition-colors"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Users
