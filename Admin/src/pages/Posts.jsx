import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, BookOpen, Search, Eye, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../app/slices/postSlice';
import PostFormModal from '../components/PostFormModal';

const Posts = () => {
    const dispatch = useDispatch();
    const {
        items: posts = [],
        pagination = { totalElements: 0, totalPages: 0, number: 0, size: 10 },
        status
    } = useSelector(state => state.posts || {});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchPosts({ page: 0, size: 10 }));
    }, [dispatch]);

    const handleDelete = async (post) => {
        if (window.confirm(`Bạn có chắc muốn xóa bài viết "${post.tieuDe}"?`)) {
            try {
                await dispatch(deletePost(post.baiVietId)).unwrap();
                dispatch(fetchPosts({ page: pagination.number, size: pagination.size }));
            } catch (error) {
                alert("Lỗi khi xóa bài viết: " + error);
            }
        }
    };

    const handlePageChange = (newPage) => {
        dispatch(fetchPosts({ page: newPage, size: pagination.size }));
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
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Quản lý Bài viết</h2>
                    <p className="text-sm text-gray-500">Soạn thảo và quản lý các tin tức, blog trên hệ thống</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95"
                >
                    <Plus size={18} />
                    Viết bài mới
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex items-center gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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
                                            <Loader2 size={24} className="animate-spin text-primary-500" />
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
                                        <div className="flex items-center justify-end gap-2 shadow-inner-sm">
                                            <button
                                                onClick={() => openEditModal(post)}
                                                className="p-2 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-primary-600 transition-all border border-transparent hover:border-violet-100"
                                                title="Sửa"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post)}
                                                className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                                                title="Xóa"
                                            >
                                                <Trash2 size={15} />
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
