import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Save } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { sileo } from 'sileo';
import { createPostCategory, updatePostCategory, fetchPostCategories } from '../app/slices/postCategorySlice';
import useScrollLock from '../hooks/useScrollLock';

const PostCategoryFormModal = ({ category, onClose }) => {
    useScrollLock();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        tenDanhMuc: '',
        slug: '',
        moTa: '',
        trangThai: true
    });

    useEffect(() => {
        if (category) {
            setFormData({
                tenDanhMuc: category.tenDanhMuc || '',
                slug: category.slug || '',
                moTa: category.moTa || '',
                trangThai: category.trangThai !== false
            });
        }
    }, [category]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            tenDanhMuc: formData.tenDanhMuc,
            slug: formData.slug,
            moTa: formData.moTa,
            trangThai: formData.trangThai
        };

        const promise = category?.danhMucBaiVietId
            ? dispatch(updatePostCategory({ id: category.danhMucBaiVietId, data: payload })).unwrap()
            : dispatch(createPostCategory(payload)).unwrap();

        sileo.promise(promise, {
            loading: { title: 'Đang lưu danh mục...', description: 'Đang xử lý dữ liệu lên máy chủ.' },
            success: () => {
                dispatch(fetchPostCategories());
                onClose();
                return { title: 'Lưu thành công!', description: category ? 'Danh mục đã được cập nhật.' : 'Danh mục mới đã được tạo.' };
            },
            error: (err) => ({ title: 'Lỗi khi lưu danh mục', description: err.message || JSON.stringify(err) })
        });
    };

    return createPortal(
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-surface-100">
                    <h3 className="font-bold text-gray-800 text-lg uppercase tracking-wide">
                        {category ? 'Chỉnh sửa Danh Mục' : 'Thêm Danh Mục Mới'}
                    </h3>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form id="postCategoryForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50/30">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tên danh mục *</label>
                            <input required type="text" name="tenDanhMuc" value={formData.tenDanhMuc} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 bg-white transition-all shadow-sm" placeholder="VD: Tin tức thời trang" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Đường dẫn thân thiện (Slug)</label>
                            <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 bg-white transition-all placeholder-gray-300 shadow-sm" placeholder="Để trống nếu muốn Auto Sinh" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mô tả khái quát</label>
                            <textarea name="moTa" rows="3" value={formData.moTa} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all leading-relaxed" placeholder="Nhập mô tả ngắn gọn cho danh mục..."></textarea>
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center gap-2.5 text-sm text-gray-700 font-semibold cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="trangThai"
                                    checked={formData.trangThai}
                                    onChange={handleChange}
                                    className="rounded text-primary-500 focus:ring-primary-500 w-4.5 h-4.5 cursor-pointer border-gray-300"
                                />
                                Trạng thái hiển thị Online
                            </label>
                        </div>
                    </div>
                </form>

                <div className="px-8 py-4 border-t border-gray-100 bg-surface-100 flex justify-end gap-3 rounded-b-2xl shrink-0">
                    <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors shadow-sm">Hủy bỏ</button>
                    <button type='submit' form="postCategoryForm" className="px-8 py-2.5 text-sm font-bold text-white bg-linear-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700/60 transition-all flex items-center gap-2 shadow-md shadow-primary-500/30 active:scale-95">
                        <Save size={16} />
                        {category ? 'Lưu Thay Đổi' : 'Tạo Mới'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default PostCategoryFormModal;
