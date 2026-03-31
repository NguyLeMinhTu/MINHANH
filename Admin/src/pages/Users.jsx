import React, { useState } from 'react'
import { Search, Plus, Mail, Phone, Lock, Unlock } from 'lucide-react'
import { nguoiDung } from '../assets/assets'

const roleLabel = { admin: 'Admin', user: 'Khách hàng' }
const roleStyle = { admin: 'bg-primary-500/10 text-primary-600', user: 'bg-gray-100 text-gray-600' }
const statusStyle = { true: 'bg-emerald-100 text-emerald-700', false: 'bg-red-100 text-red-700' }

const Users = () => {
    const [search, setSearch] = useState('')
    const filtered = nguoiDung.filter((u) =>
        u.ten.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">DANH SÁCH NGƯỜI DÙNG</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Quản lý thông tin tài khoản người dùng</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
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
                            {filtered.map((user) => (
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
                                        <button className="p-1.5 rounded-lg hover:bg-primary-500/10 text-gray-400 hover:text-primary-600 transition-colors" title={user.trang_thai ? 'Khóa' : 'Mở khóa'}>
                                            {user.trang_thai ? <Lock size={15} /> : <Unlock size={15} />}
                                        </button>
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

export default Users
