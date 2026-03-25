import React, { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Tag, RefreshCcw } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, deleteCategory, updateCategory } from '../app/slices/categorySlice'
import { fetchProducts } from '../app/slices/productSlice'
import CategoryFormModal from '../components/CategoryFormModal'

const statusStyle = {
    true: 'bg-emerald-100 text-emerald-700',
    false: 'bg-gray-100 text-gray-600',
}

const ProductCategories = () => {
    const dispatch = useDispatch()
    const { items: categories, status: catStatus } = useSelector(state => state.categories)
    const { data: pageData } = useSelector(state => state.products)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchProducts({ page: 0, size: 200 }))
    }, [dispatch])

    const sanPhamList = pageData?.content || []
    
    const getProductCount = (dmId) => sanPhamList.filter(p => p.danhMuc?.danhMucId === dmId).length

    const parentCategories = Array.isArray(categories) ? categories.filter(d => !d.parent) : []
    const displayCategories = parentCategories.length > 0 ? parentCategories : (Array.isArray(categories) ? categories : [])

    const handleDelete = async (cat) => {
        if (window.confirm(`Thao tác Không thể Phục Hồi!\nBạn có thật sự muốn VĨNH VIỄN XÓA danh mục "${cat.tenDanhMuc}" không?`)) {
            try {
                await dispatch(deleteCategory(cat.danhMucId)).unwrap();
                dispatch(fetchCategories());
            } catch (error) {
                console.error("Lỗi xóa danh mục:", error);
                let msg = typeof error === 'string' ? error : (error?.message || JSON.stringify(error));
                alert("Lỗi khi xóa danh mục:\n" + msg + "\n(Vui lòng xem Console F12 để biết thêm)");
            }
        }
    }

    const handleToggleStatus = async (cat) => {
        if (window.confirm(`Bạn có chắc muốn BẬT HIỂN THỊ lại danh mục "${cat.tenDanhMuc}" không?`)) {
            try {
                const payload = { 
                    tenDanhMuc: cat.tenDanhMuc,
                    slug: cat.slug,
                    moTa: cat.moTa,
                    thuTu: cat.thuTu,
                    trangThai: true,
                    hinhAnh: cat.hinhAnh,
                    parentId: cat.parent ? cat.parent.danhMucId : null
                };
                await dispatch(updateCategory({ id: cat.danhMucId, data: payload })).unwrap();
                dispatch(fetchCategories());
            } catch (error) {
                console.error("Lỗi bật lại danh mục:", error);
                let msg = typeof error === 'string' ? error : (error?.message || error?.error || JSON.stringify(error));
                alert("Lỗi thao tác API:\n" + msg + "\n(Nhấn F12 mở Console log để xem chi tiết)");
            }
        }
    }

    const openAddModal = () => {
        setEditingCategory(null)
        setIsModalOpen(true)
    }

    const openEditModal = (cat) => {
        setEditingCategory(cat)
        setIsModalOpen(true)
    }

    const renderCategoryRow = (cat, level = 0) => {
        const children = Array.isArray(categories) ? categories.filter(c => c.parent?.danhMucId === cat.danhMucId) : [];
        
        return (
            <React.Fragment key={cat.danhMucId}>
                <tr className={`hover:bg-gray-50 transition-colors ${level > 0 ? 'bg-gray-50/50' : ''}`}>
                    <td className="px-6 py-3.5">
                        <div 
                            className={`flex items-center gap-3 ${level > 0 ? 'border-l-2 border-[#DAA06D]/30 pl-3' : ''}`}
                            style={{ marginLeft: level > 0 ? `${(level - 1) * 1.5 + 2}rem` : '0' }}
                        >
                            <div className={`flex items-center justify-center rounded-lg ${level === 0 ? 'w-9 h-9 bg-[#DAA06D]/10 text-[#DAA06D]' : 'w-8 h-8 bg-white border border-gray-100 text-gray-400'}`}>
                                <Tag size={level === 0 ? 16 : 13} />
                            </div>
                            <div>
                                <p className={`font-medium ${level === 0 ? 'text-gray-800' : 'text-gray-600'}`}>{cat.tenDanhMuc}</p>
                                <p className="text-xs text-gray-400">{getProductCount(cat.danhMucId)} sản phẩm trực tiếp</p>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-400 font-mono text-xs">
                        <div style={{ marginLeft: level > 0 ? `${(level - 1) * 1.5 + 2}rem` : '0' }} className={level > 0 ? "pl-3 border-l-2 border-transparent" : ""}>
                            {cat.slug || '—'}
                        </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-500 max-w-xs truncate">{cat.moTa || '—'}</td>
                    <td className="px-6 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[cat.trangThai ?? true]}`}>
                            {cat.trangThai !== false ? 'Hiển thị' : 'Ẩn'}
                        </span>
                    </td>
                    <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                            <button onClick={() => openEditModal(cat)} title="Sửa" className="p-1.5 rounded-lg hover:bg-[#DAA06D]/10 text-gray-400 hover:text-[#DAA06D] transition-colors">
                                <Pencil size={15} />
                            </button>
                            {cat.trangThai === false ? (
                                <button onClick={() => handleToggleStatus(cat)} title="Khôi phục hiển thị" className="p-1.5 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-500 transition-colors">
                                    <RefreshCcw size={15} />
                                </button>
                            ) : (
                                <button onClick={() => handleDelete(cat)} title="Xóa ẩn (Xóa mềm)" className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={15} />
                                </button>
                            )}
                        </div>
                    </td>
                </tr>
                {children.map(child => renderCategoryRow(child, level + 1))}
            </React.Fragment>
        );
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">DANH MỤC SẢN PHẨM</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Quản lý dữ liệu danh mục sản phẩm</p>
                </div>
                <button onClick={openAddModal} className="flex items-center gap-2 bg-[#DAA06D] hover:bg-[#c08850] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
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
                                {parentCategories.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-400">Không có danh mục nào</td>
                                    </tr>
                                ) : parentCategories.map(cat => renderCategoryRow(cat, 0))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
            {isModalOpen && (
                <CategoryFormModal 
                    category={editingCategory} 
                    categories={Array.isArray(categories) ? categories : []} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </div>
    )
}

export default ProductCategories
