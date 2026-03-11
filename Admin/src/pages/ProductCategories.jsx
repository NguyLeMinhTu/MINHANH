import React, { useState } from 'react'
import { Plus, Pencil, Trash2, Tag } from 'lucide-react'
import { danhMucSanPham, sanPham } from '../assets/assets'

const statusStyle = {
    true: 'bg-emerald-100 text-emerald-700',
    false: 'bg-gray-100 text-gray-600',
}

const getProductCount = (dmId) => sanPham.filter(p => p.danh_muc_id === dmId).length

const ProductCategories = () => {
    const categories = danhMucSanPham.filter(d => d.parent_id === null)
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">DANH MỤC SẢN PHẨM</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Quản lý dữ liệu danh mục sản phẩm</p>
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
                                <th className="text-left px-6 py-3 font-medium">Mô tả</th>
                                <th className="text-left px-6 py-3 font-medium">Trạng thái</th>
                                <th className="text-left px-6 py-3 font-medium">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {categories.map((cat) => (
                                <tr key={cat.danh_muc_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-[#DAA06D]/10 text-[#DAA06D] flex items-center justify-center">
                                                <Tag size={16} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{cat.ten_danh_muc}</p>
                                                <p className="text-xs text-gray-400">{getProductCount(cat.danh_muc_id)} sản phẩm trực tiếp</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-400 font-mono text-xs">{cat.slug}</td>
                                    <td className="px-6 py-3.5 text-gray-500 max-w-xs truncate">{cat.mo_ta}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[cat.trang_thai]}`}>
                                            {cat.trang_thai ? 'Hiển thị' : 'Ẩn'}
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

export default ProductCategories
