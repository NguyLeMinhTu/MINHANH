import React, { useState, useEffect } from 'react'
import { sileo } from 'sileo'
import { Plus, Pencil, Trash2, Tag, RefreshCcw, Search, CornerDownRight } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, deleteCategory, updateCategory } from '../app/slices/categorySlice'
import { fetchProducts } from '../app/slices/productSlice'
import CategoryFormModal from '../components/CategoryFormModal'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import Title from '../components/Title'

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
    const [confirmDeleteCategory, setConfirmDeleteCategory] = useState(null)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchProducts({ page: 0, size: 200 }))
    }, [dispatch])

    const sanPhamList = pageData?.content || []

    const getProductCount = (dmId) => sanPhamList.filter(p => p.danhMuc?.danhMucId === dmId).length

    const isFiltered = search !== '' || statusFilter !== 'all'

    const filteredCategories = Array.isArray(categories) ? categories.filter(cat => {
        const matchesSearch = cat.tenDanhMuc.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'true' ? cat.trangThai !== false : cat.trangThai === false)
        return matchesSearch && matchesStatus
    }) : []

    const parentCategories = isFiltered ? filteredCategories : (Array.isArray(categories) ? categories.filter(d => !d.parent) : [])

    const handleDelete = (cat) => {
        setConfirmDeleteCategory(cat)
    }

    const executeDelete = (cat) => {
        const isParent = !cat.parent;
        const msg = isParent 
            ? `Đang xóa vĩnh viễn "${cat.tenDanhMuc}" cùng tất cả sản phẩm...`
            : `Đang chuyển sản phẩm và xóa "${cat.tenDanhMuc}"...`;

        sileo.promise(dispatch(deleteCategory(cat.danhMucId)).unwrap(), {
            loading: { title: 'Đang xử lý...', description: msg },
            success: () => {
                dispatch(fetchCategories());
                setConfirmDeleteCategory(null);
                return { title: 'Thành công!', description: 'Yêu cầu của bạn đã được thực thi.' };
            },
            error: (err) => ({ title: 'Lỗi', description: err.message || JSON.stringify(err) })
        });
    }

    const handleToggleStatus = (cat) => {
        sileo.action({
            title: 'Khôi phục hiển thị?',
            description: `Bạn có chắc muốn BẬT HIỂN THỊ lại danh mục "${cat.tenDanhMuc}" không?`,
            button: {
                title: 'Khôi phục',
                onClick: () => {
                    const payload = {
                        tenDanhMuc: cat.tenDanhMuc,
                        slug: cat.slug,
                        moTa: cat.moTa,
                        thuTu: cat.thuTu,
                        trangThai: true,
                        hinhAnh: cat.hinhAnh,
                        parentId: cat.parent ? cat.parent.danhMucId : null
                    };

                    sileo.promise(dispatch(updateCategory({ id: cat.danhMucId, data: payload })).unwrap(), {
                        loading: { title: 'Đang xử lý...', description: `Đang bật hiển thị cho "${cat.tenDanhMuc}"` },
                        success: () => {
                            dispatch(fetchCategories());
                            return { title: 'Thành công!', description: 'Danh mục đã hiển thị trở lại.' };
                        },
                        error: (err) => ({ title: 'Lỗi', description: err.message || JSON.stringify(err) })
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

    const renderCategoryRow = (cat, level = 0) => {
        const children = isFiltered ? [] : (Array.isArray(categories) ? categories.filter(c => c.parent?.danhMucId === cat.danhMucId) : []);
        const productCount = getProductCount(cat.danhMucId);

        return (
            <React.Fragment key={cat.danhMucId}>
                <tr className="group border-b border-gray-100 hover:bg-primary-50 transition-colors">
                    <td className="pl-6 pr-4 py-3.5 w-20">
                        <div className="w-10 h-10 rounded border border-gray-100 bg-gray-50 overflow-hidden shadow-sm">
                            <img
                                src={cat.hinhAnh || 'https://placehold.co/100x100?text=No+Img'}
                                alt={cat.tenDanhMuc}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </td>
                    <td className="px-4 py-3.5">
                        <div
                            className="flex items-center gap-2"
                            style={{ paddingLeft: `${level * 1.5}rem` }}
                        >
                            {level > 0 && <CornerDownRight size={16} className="text-gray-400 shrink-0" />}
                            <div className="flex flex-col">
                                <span className={`font-semibold tracking-tight ${level === 0 ? 'text-gray-900 text-[13.5px]' : 'text-gray-600 text-[12.5px]'}`}>
                                    {cat.tenDanhMuc}
                                </span>
                                {level === 0 ? (
                                    <span className="text-[9px] text-primary-600 font-bold uppercase tracking-widest bg-primary-50 px-1.5 py-0.5 rounded border border-primary-100/50 w-fit mt-1">Danh mục gốc</span>
                                ) : (
                                    <span className="text-[9px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">Danh mục con</span>
                                )}
                            </div>
                        </div>
                    </td>
                    <td className="px-4 py-3.5">
                        <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-500 font-mono text-[10px] uppercase border border-gray-200/50">
                            {cat.slug || '—'}
                        </span>
                    </td>
                    <td className="px-4 py-3.5">
                        <p className="text-[11px] text-gray-400 max-w-[200px] truncate italic" title={cat.moTa}>
                            {cat.moTa || 'Không có mô tả'}
                        </p>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                        <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200/50">
                            {productCount}
                        </span>
                    </td>
                    <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${cat.trangThai !== false ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gray-300'}`}></div>
                            <span className={`text-[11px] font-bold uppercase tracking-wider ${cat.trangThai !== false ? 'text-emerald-700' : 'text-gray-400'}`}>
                                {cat.trangThai !== false ? 'Hoạt động' : 'Đã ẩn'}
                            </span>
                        </div>
                    </td>
                    <td className="pl-4 pr-6 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => openEditModal(cat)}
                                className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600 transition-all bg-white border border-gray-100 shadow-sm"
                                title="Chỉnh sửa"
                            >
                                <Pencil size={14} />
                            </button>
                            {cat.trangThai === false ? (
                                <button
                                    onClick={() => handleToggleStatus(cat)}
                                    className="p-1.5 rounded-lg hover:bg-primary-50 text-primary-500 transition-all bg-white border border-primary-100 shadow-sm"
                                    title="Khôi phục"
                                >
                                    <RefreshCcw size={14} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleDelete(cat)}
                                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all bg-white border border-red-100 shadow-sm"
                                    title="Xóa"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                    </td>
                </tr>
                {!isFiltered && children.map(child => renderCategoryRow(child, level + 1))}
            </React.Fragment>
        );
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <Title text1="Danh mục" text2="sản phẩm" subText="Quản lý phân loại và cấu trúc cây danh mục hàng hóa" />
                <button onClick={openAddModal} className="flex items-center gap-2 bg-linear-to-b from-primary-600 to-primary-700/60 hover:from-primary-600 hover:to-primary-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm mb-8">
                    <Plus size={16} />
                    Thêm danh mục
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-between gap-6">
                    {/* Tabs for Status */}
                    <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200">
                        {[
                            { label: 'Tất cả', value: 'all' },
                            { label: 'Hoạt động', value: 'true' },
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

                {/* Categories Table */}
                {catStatus === 'loading' ? (
                    <div className="p-16 text-center text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
                        Đang đồng bộ dữ liệu...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="pl-6 pr-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ảnh</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Danh mục</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Slug</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mô tả</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Hàng hóa</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trạng thái</th>
                                    <th className="pl-4 pr-6 py-3 text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {parentCategories.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-24 text-center text-gray-300 text-[13px] font-medium italic">
                                            Không có danh mục nào được tìm thấy
                                        </td>
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

            {confirmDeleteCategory && (
                <ConfirmDeleteModal
                    category={confirmDeleteCategory}
                    productCount={getProductCount(confirmDeleteCategory.danhMucId)}
                    onConfirm={() => executeDelete(confirmDeleteCategory)}
                    onClose={() => setConfirmDeleteCategory(null)}
                />
            )}
        </div>
    )
}

export default ProductCategories
