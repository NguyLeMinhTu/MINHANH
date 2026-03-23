import React, { useEffect } from 'react'
import { Plus, Pencil, Trash2, Tag } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../app/slices/categorySlice'
import { fetchProducts } from '../app/slices/productSlice'

const statusStyle = {
    true: 'bg-emerald-100 text-emerald-700',
    false: 'bg-gray-100 text-gray-600',
}

const ProductCategories = () => {
    const dispatch = useDispatch()
    const { items: categories, status: catStatus } = useSelector(state => state.categories)
    const { data: pageData } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchProducts({ page: 0, size: 200 }))
    }, [dispatch])

    const sanPhamList = pageData?.content || []
    
    const getProductCount = (dmId) => sanPhamList.filter(p => p.danhMuc?.danhMucId === dmId).length

    const parentCategories = Array.isArray(categories) ? categories.filter(d => !d.parent) : []
    const displayCategories = parentCategories.length > 0 ? parentCategories : (Array.isArray(categories) ? categories : [])

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
                {catStatus === 'loading' ? (
                    <div className="p-8 text-center text-gray-500">Đang tải danh mục...</div>
                ) : (
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
                                {displayCategories.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-400">Không có danh mục nào</td>
                                    </tr>
                                ) : displayCategories.map((cat) => (
                                    <tr key={cat.danhMucId} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-[#DAA06D]/10 text-[#DAA06D] flex items-center justify-center">
                                                    <Tag size={16} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{cat.tenDanhMuc}</p>
                                                    <p className="text-xs text-gray-400">{getProductCount(cat.danhMucId)} sản phẩm trực tiếp</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 text-gray-400 font-mono text-xs">{cat.slug || '—'}</td>
                                        <td className="px-6 py-3.5 text-gray-500 max-w-xs truncate">{cat.moTa || '—'}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[cat.trangThai ?? true]}`}>
                                                {cat.trangThai !== false ? 'Hiển thị' : 'Ẩn'}
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
                )}
            </div>
        </div>
    )
}

export default ProductCategories
