import React, { useState, useEffect } from 'react';
import { sileo } from 'sileo'
import { Plus, Pencil, Trash2, BookOpen, Search, Eye, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../app/slices/postSlice';
import { fetchPostCategories } from '../app/slices/postCategorySlice';
import PostFormModal from '../components/PostFormModal';
import Title from '../components/Title';

const Posts = () => {
    const dispatch = useDispatch();
    const {
        items: posts = [],
        pagination = { totalElements: 0, totalPages: 0, number: 0, size: 10 },
        status
    } = useSelector(state => state.posts || {});
    const { items: categories } = useSelector(state => state.postCategories);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        dispatch(fetchPostCategories());
    }, [dispatch]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            dispatch(fetchPosts({
                page: 0,
                size: 10,
                search: searchTerm,
                danhMucId: categoryFilter,
                trangThai: statusFilter
            }));
        }, 400);
        return () => clearTimeout(delayDebounceFn);
    }, [dispatch, searchTerm, categoryFilter, statusFilter]);

    const handleDelete = (post) => {
        sileo.action({
            title: 'Xác nhận xóa bài viết?',
            description: `Bạn có chắc muốn xóa bài viết "${post.tieuDe}"? Thao tác này không thể hoàn tác.`,
            button: {
                title: 'Xác nhận xóa',
                onClick: () => {
                    sileo.promise(dispatch(deletePost(post.baiVietId)).unwrap(), {
                        loading: { title: 'Đang xử lý...', description: `Đang xóa "${post.tieuDe}"` },
                        success: () => {
                            dispatch(fetchPosts({ page: pagination.number, size: pagination.size }));
                            return { title: 'Đã xóa bài viết thành công!' };
                        },
                        error: (err) => ({ title: 'Lỗi', description: (err.message || JSON.stringify(err)) })
                    });
                }
            }
        });
    };

    const handlePageChange = (newPage) => {
        dispatch(fetchPosts({
            page: newPage,
            size: pagination.size,
            search: searchTerm,
            danhMucId: categoryFilter,
            trangThai: statusFilter
        }));
    };

    const openAddModal = () => {
        setEditingPost(null);
        setIsModalOpen(true);
    };

    const openEditModal = (post) => {
        setEditingPost(post);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Title text1="Quản lý" text2="bài viết" subText="Soạn thảo và quản lý các tin tức, blog trên hệ thống" />
                <button
                    onClick={openAddModal}
                    className="flex items-center justify-center gap-2 bg-linear-to-b from-primary-600 to-primary-700/60 hover:from-primary-600 hover:to-primary-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95 mb-8"
                >
                    <Plus size={18} />
                    Viết bài mới
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex flex-wrap items-center justify-between gap-6">
                    {/* Tabs for Status */}
                    <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200">
                        {[
                            { label: 'Tất cả', value: '' },
                            { label: 'Công khai', value: 'PUBLISHED' },
                            { label: 'Bản nháp', value: 'DRAFT' },
                            { label: 'Đã ẩn', value: 'HIDDEN' }
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

                    <div className="flex-1 flex flex-wrap items-center justify-end gap-3 min-w-[300px]">
                        <div className="relative flex-1 max-w-xs">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={14} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm tiêu đề, slug..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-[13px] bg-white transition-all placeholder:text-gray-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="bg-white border border-gray-200 px-3 py-2 text-[13px] rounded-lg focus:outline-none focus:border-primary-500 transition-all text-gray-600 outline-none cursor-pointer"
                        >
                            <option value="">Tất cả danh mục</option>
                            {categories.map(cat => (
                                <option key={cat.danhMucBaiVietId} value={cat.danhMucBaiVietId}>{cat.tenDanhMuc}</option>
                            ))}
                        </select>

                        {(searchTerm || categoryFilter || statusFilter) && (
                            <button
                                onClick={() => {
                                    setSearchTerm('')
                                    setCategoryFilter('')
                                    setStatusFilter('')
                                }}
                                className="text-[11px] font-bold text-gray-400 hover:text-primary-600 transition-colors px-2"
                            >
                                Làm mới
                            </button>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-[11px] uppercase tracking-wider font-bold">
                                <th className="text-left px-6 py-4">Bài viết</th>
                                <th className="text-left px-6 py-4">Chuyên mục</th>
                                <th className="text-left px-6 py-4">Ngày đăng</th>
                                <th className="text-left px-6 py-4">Lượt xem</th>
                                <th className="text-left px-6 py-4">Trạng thái</th>
                                <th className="text-right px-6 py-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {status === 'loading' ? (
                                <tr><td colSpan="6" className="text-center py-20 text-gray-400 italic">Đang tải danh sách bài viết...</td></tr>
                            ) : posts.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-20 text-gray-400 italic">Chưa có bài viết nào được đăng</td></tr>
                            ) : posts.map(post => (
                                <tr key={post.baiVietId} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                                                {post.anhDaiDien ? (
                                                    <img src={post.anhDaiDien} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <BookOpen size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="max-w-xs md:max-w-sm">
                                                <p className="font-bold text-gray-800 line-clamp-1 group-hover:text-primary-600 transition-colors">{post.tieuDe}</p>
                                                <p className="text-[11px] text-gray-400 font-mono mt-0.5">{post.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-violet-50 text-violet-600 rounded-md text-[10px] font-bold uppercase">
                                            {post.danhMuc?.tenDanhMuc || 'Chưa phân loại'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs italic">
                                        {post.ngayDang ? new Date(post.ngayDang).toLocaleDateString('vi-VN') : '—'}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <Eye size={14} className="text-gray-400 font-bold" />
                                            {post.views || 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${post.trangThai === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600' :
                                            post.trangThai === 'DRAFT' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-400'
                                            }`}>
                                            {post.trangThai === 'PUBLISHED' ? 'Công khai' : post.trangThai === 'DRAFT' ? 'Bản nháp' : 'Đã ẩn'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEditModal(post)}
                                                className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600 transition-all bg-white border border-gray-100 shadow-sm"
                                                title="Sửa"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post)}
                                                className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all bg-white border border-red-100 shadow-sm"
                                                title="Xóa"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {pagination.totalPages > 1 && (
                    <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs text-gray-500 italic">
                            Hiển thị {posts.length} bài viết trên tổng số {pagination.totalElements}
                        </p>
                        <div className="flex gap-1.5">
                            <button
                                disabled={pagination.number === 0}
                                onClick={() => handlePageChange(pagination.number - 1)}
                                className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-white disabled:opacity-40 transition-colors"
                            >
                                Trước
                            </button>
                            {[...Array(pagination.totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-all ${pagination.number === i ? 'bg-primary-500 text-white shadow-sm' : 'hover:bg-white border border-transparent hover:border-gray-200 text-gray-600'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={pagination.number === pagination.totalPages - 1}
                                onClick={() => handlePageChange(pagination.number + 1)}
                                className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-white disabled:opacity-40 transition-colors"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <PostFormModal
                    post={editingPost}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Posts;
