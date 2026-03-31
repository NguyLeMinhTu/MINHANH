import React, { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Tag, RefreshCw } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostCategories, deletePostCategory, updatePostCategory } from '../app/slices/postCategorySlice'
import PostCategoryFormModal from '../components/PostCategoryFormModal'

const statusStyle = {
    true: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    false: 'bg-gray-50 text-gray-400 border border-gray-100',
}

const PostCategories = () => {
    const dispatch = useDispatch()
    const { items: categories, status: catStatus } = useSelector(state => state.postCategories)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)

    useEffect(() => {
        dispatch(fetchPostCategories())
    }, [dispatch])

    const handleDelete = async (cat) => {
        if (window.confirm(`Bạn có chắc muốn ẨN danh mục "${cat.tenDanhMuc}" không?\n(Bạn có thể bật lại sau)`)) {
            try {
                await dispatch(deletePostCategory(cat.danhMucBaiVietId)).unwrap();
                dispatch(fetchPostCategories());
            } catch (error) {
                console.error("Lỗi ẩn danh mục:", error);
                alert("Lỗi thao tác:\n" + (error?.message || JSON.stringify(error)));
            }
        }
    }

    const handleRestore = async (cat) => {
        try {
            const payload = {
                tenDanhMuc: cat.tenDanhMuc,
                slug: cat.slug,
                moTa: cat.moTa,
                trangThai: true
            };
            await dispatch(updatePostCategory({ id: cat.danhMucBaiVietId, data: payload })).unwrap();
            dispatch(fetchPostCategories());
        } catch (error) {
            console.error("Lỗi bật lại danh mục:", error);
            alert("Lỗi khi khôi phục:\n" + (error?.message || JSON.stringify(error)));
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

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">Danh mục Bài viết</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Quản lý phân loại tin tức (Hỗ trợ ẩn/hiện chuyên mục)</p>
                </div>
                <button onClick={openAddModal} className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95">
                    <Plus size={16} />
                    Thêm danh mục
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-100">
                                <th className="text-left px-6 py-3.5 font-semibold">Tên chuyên mục</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Đường dẫn (Slug)</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Trạng thái</th>
                                <th className="text-right px-6 py-3.5 font-semibold">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {catStatus === 'loading' ? (
                                <tr><td colSpan="4" className="text-center py-10 text-gray-400 italic">Đang tải dữ liệu...</td></tr>
                            ) : (!categories || categories.length === 0) ? (
                                <tr><td colSpan="4" className="text-center py-10 text-gray-400 italic">Hệ thống chưa có danh mục nào</td></tr>
                            ) : categories.map(cat => (
                                <tr key={cat.danhMucBaiVietId} className={`hover:bg-gray-50/50 transition-colors ${cat.trangThai === false ? 'opacity-60' : ''}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`flex items-center justify-center rounded-lg w-8 h-8 ${cat.trangThai === false ? 'bg-gray-100 text-gray-400' : 'bg-amber-50 text-amber-600'}`}>
                                                <Tag size={14} />
                                            </div>
                                            <div>
                                                <span className={`font-semibold block ${cat.trangThai === false ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                                    {cat.tenDanhMuc}
                                                </span>
                                                <span className="text-[10px] text-gray-400 block truncate max-w-[200px]">{cat.moTa || 'Không có mô tả'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 font-mono text-xs italic">{cat.slug}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusStyle[cat.trangThai ?? true]}`}>
                                            {cat.trangThai !== false ? 'Đang hiển thị' : 'Đã ẩn'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEditModal(cat)} className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600 transition-all bg-white border border-gray-100 shadow-sm" title="Chỉnh sửa">
                                                <Pencil size={14} />
                                            </button>
                                            
                                            {cat.trangThai === false ? (
                                                <button onClick={() => handleRestore(cat)} className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-500 transition-all bg-white border border-emerald-100 shadow-sm" title="Hiện lại">
                                                    <RefreshCw size={14} />
                                                </button>
                                            ) : (
                                                <button onClick={() => handleDelete(cat)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-all bg-white border border-red-100 shadow-sm" title="Tạm ẩn">
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <PostCategoryFormModal 
                    category={editingCategory} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </div>
    )
}

export default PostCategories
