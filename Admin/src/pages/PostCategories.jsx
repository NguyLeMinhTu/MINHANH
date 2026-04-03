import React, { useState, useEffect } from 'react'
import { sileo } from 'sileo'
import { Plus, Pencil, Trash2, Tag, RefreshCw, Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostCategories, deletePostCategory, updatePostCategory } from '../app/slices/postCategorySlice'
import PostCategoryFormModal from '../components/PostCategoryFormModal'
import Title from '../components/Title'

const statusStyle = {
    true: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    false: 'bg-gray-50 text-gray-400 border border-gray-100',
}

const PostCategories = () => {
    const dispatch = useDispatch()
    const { items: categories, status: catStatus } = useSelector(state => state.postCategories)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    useEffect(() => {
        dispatch(fetchPostCategories())
    }, [dispatch])

    const isFiltered = search !== '' || statusFilter !== 'all'

    const filteredCategories = Array.isArray(categories) ? categories.filter(cat => {
        const matchesSearch = cat.tenDanhMuc.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'true' ? cat.trangThai !== false : cat.trangThai === false)
        return matchesSearch && matchesStatus
    }) : []

    const handleDelete = (cat) => {
        sileo.action({
            title: 'Xác nhận xóa danh mục?',
            description: `Bạn có chắc muốn XÓA VĨNH VIỄN danh mục "${cat.tenDanhMuc}"? Thao tác này không thể hoàn tác.`,
            button: {
                title: 'Xác nhận xóa',
                onClick: () => {
                    sileo.promise(dispatch(deletePostCategory(cat.danhMucBaiVietId)).unwrap(), {
                        loading: { title: 'Đang xử lý...', description: `Đang xóa "${cat.tenDanhMuc}"` },
                        success: () => {
                            dispatch(fetchPostCategories());
                            return { title: 'Đã xóa danh mục thành công!' };
                        },
                        error: (err) => ({ title: 'Lỗi', description: (err.message || JSON.stringify(err)) })
                    });
                }
            }
        });
    }

    const handleRestore = (cat) => {
        sileo.action({
            title: 'Khôi phục danh mục?',
            description: `Bạn có muốn bật hiển thị lại danh mục bài viết "${cat.tenDanhMuc}" không?`,
            button: {
                title: 'Khôi phục',
                onClick: () => {
                    const payload = {
                        tenDanhMuc: cat.tenDanhMuc,
                        slug: cat.slug,
                        moTa: cat.moTa,
                        trangThai: true
                    };
                    sileo.promise(dispatch(updatePostCategory({ id: cat.danhMucBaiVietId, data: payload })).unwrap(), {
                        loading: { title: 'Đang xử lý...', description: `Đang khôi phục "${cat.tenDanhMuc}"` },
                        success: () => {
                            dispatch(fetchPostCategories());
                            return { title: 'Đã khôi phục thành công!' };
                        },
                        error: (err) => ({ title: 'Lỗi', description: (err.message || JSON.stringify(err)) })
                    });
                }
            }
        });
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
                <Title text1="Danh mục" text2="bài viết" subText="Quản lý phân loại tin tức (Hỗ trợ ẩn/hiện chuyên mục)" />
                <button onClick={openAddModal} className="flex items-center gap-2 bg-linear-to-b from-primary-600 to-primary-700/60 hover:from-primary-600 hover:to-primary-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95 mb-8">
                    <Plus size={16} />
                    Thêm danh mục
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-between gap-6">
                    {/* Tabs for Status */}
                    <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200">
                        {[
                            { label: 'Tất cả', value: 'all' },
                            { label: 'Đang hiển thị', value: 'true' },
                            { label: 'Tạm ẩn', value: 'false' }
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setStatusFilter(tab.value)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${statusFilter === tab.value
                                    ? 'bg-primary-800 text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative flex-1 min-w-[280px] max-w-sm ml-auto">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm danh mục..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white border border-gray-200 pl-10 pr-4 py-2 w-full text-[13px] rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-300"
                        />
                    </div>

                    {isFiltered && (
                        <button
                            onClick={() => {
                                setSearch('')
                                setStatusFilter('all')
                            }}
                            className="text-[11px] font-bold text-gray-400 hover:text-primary-600 transition-colors px-2"
                        >
                            Làm mới
                        </button>
                    )}
                </div>

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
                            ) : (!filteredCategories || filteredCategories.length === 0) ? (
                                <tr><td colSpan="4" className="text-center py-10 text-gray-400 italic">Hệ thống chưa có danh mục nào</td></tr>
                            ) : filteredCategories.map(cat => (
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
                                                <button onClick={() => handleDelete(cat)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-all bg-white border border-red-100 shadow-sm" title="Xóa vĩnh viễn">
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
