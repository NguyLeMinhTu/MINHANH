import React from 'react'
import { Plus, Pencil, Trash2, FolderOpen } from 'lucide-react'
import { danhMucBaiViet, baiViet } from '../assets/assets'

const getPostCount = (dmId) => baiViet.filter(b => b.danh_muc_bai_viet_id === dmId).length

const PostCategories = () => {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">DANH MỤC BÀI VIẾT</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Quản lý danh mục bài viết</p>
                </div>
                <button className="flex items-center gap-2 bg-[#DAA06D] hover:bg-[#c08850] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <Plus size={16} />
                    Thêm danh mục
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-3 font-medium">Tên danh mục</th>
                                <th className="text-left px-6 py-3 font-medium">Đường dẫn</th>
                                <th className="text-left px-6 py-3 font-medium">Bài viết</th>
                                <th className="text-left px-6 py-3 font-medium">Trạng thái</th>
                                <th className="text-left px-6 py-3 font-medium">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {danhMucBaiViet.map((cat) => (
                                <tr key={cat.danh_muc_bai_viet_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                                                <FolderOpen size={16} />
                                            </div>
                                            <span className="font-medium text-gray-800">{cat.ten_danh_muc}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-400 font-mono text-xs">{cat.slug}</td>
                                    <td className="px-6 py-3.5 text-gray-600">{getPostCount(cat.danh_muc_bai_viet_id)} bài viết</td>
                                    <td className="px-6 py-3.5">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                            Hiển thị
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 rounded-lg hover:bg-[#DAA06D]/10 text-gray-400 hover:text-[#DAA06D] transition-colors">
                                                <Pencil size={15} />
                                            </button>
                                            <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
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

export default PostCategories
