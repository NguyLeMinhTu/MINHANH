import React, { useState, useEffect } from 'react';
import { X, Save, ImagePlus, Trash2 } from 'lucide-react';
import axiosInstance from '../utils/axiosConfig';
import { useDispatch } from 'react-redux';
import { createCategory, updateCategory, fetchCategories } from '../app/slices/categorySlice';

const CategoryFormModal = ({ category, categories, onClose }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        tenDanhMuc: '',
        slug: '',
        moTa: '',
        thuTu: 0,
        trangThai: true,
        parentId: '',
        hinhAnh: ''
    });

    useEffect(() => {
        if (category) {
            setFormData({
                tenDanhMuc: category.tenDanhMuc || '',
                slug: category.slug || '',
                moTa: category.moTa || '',
                thuTu: category.thuTu || 0,
                trangThai: category.trangThai !== false,
                parentId: category.parent?.danhMucId || '',
                hinhAnh: category.hinhAnh || ''
            });
        }
    }, [category]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        try {
            const formDataParams = new FormData();
            formDataParams.append('file', file);
            const res = await axiosInstance.post('/upload', formDataParams, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.url) {
                setFormData(prev => ({ ...prev, hinhAnh: res.url }));
            }
        } catch (error) {
            console.error("Lỗi upload ảnh:", error);
            alert("Lỗi tải ảnh lên Cloudinary!");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({ ...prev, hinhAnh: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Chuẩn bị cục Data trước khi đẩy lên API
        const payload = {
            tenDanhMuc: formData.tenDanhMuc,
            slug: formData.slug,
            moTa: formData.moTa,
            thuTu: Number(formData.thuTu),
            trangThai: formData.trangThai,
            hinhAnh: formData.hinhAnh,
            parentId: formData.parentId ? formData.parentId : null
        };

        try {
            if (category?.danhMucId) {
                await dispatch(updateCategory({ id: category.danhMucId, data: payload })).unwrap();
            } else {
                await dispatch(createCategory(payload)).unwrap();
            }
            dispatch(fetchCategories()); // Gọi thợ load lại lưới List bên ngoài
            onClose();
        } catch (error) {
            alert("Lỗi lưu danh mục: " + (error.message || JSON.stringify(error)));
        } finally {
            setLoading(false);
        }
    };

    // Lọc ra danh sách Mẹ: Danh mục mẹ không thể là chính nó
    const availableParents = categories.filter(c => c.danhMucId !== category?.danhMucId);

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-surface-100">
                    <h3 className="font-bold text-gray-800 text-lg uppercase tracking-wide">
                        {category ? 'Chỉnh sửa Danh Mục' : 'Thêm Danh Mục Mới'}
                    </h3>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form id="categoryForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50/30">
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tên danh mục *</label>
                                <input required type="text" name="tenDanhMuc" value={formData.tenDanhMuc} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 bg-white transition-all shadow-sm" placeholder="VD: Áo Thun Nam" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Đường dẫn thân thiện (Slug)</label>
                                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 bg-white transition-all placeholder-gray-300 shadow-sm" placeholder="Để trống nếu muốn Auto Sinh" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Danh mục Cha (Cấp độ)</label>
                                <select
                                value={formData.parentId}
                                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                                className="w-full border-gray-200 rounded-lg shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 px-3.5 py-2.5 text-sm bg-white"
                            >
                                <option value="">-- Không có (Danh mục gốc) --</option>
                                {categories
                                    .filter(c => !c.parent && c.danhMucId !== category?.danhMucId)
                                    .map(c => (
                                        <option key={c.danhMucId} value={c.danhMucId}>
                                            {c.tenDanhMuc}
                                        </option>
                                    ))}
                            </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Thứ tự hiển thị (Ưu tiên)</label>
                                <input type="number" name="thuTu" value={formData.thuTu} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-primary-500/40" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mô tả giới thiệu</label>
                            <textarea name="moTa" rows="3" value={formData.moTa} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all leading-relaxed"></textarea>
                        </div>

                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 text-sm text-gray-700 font-semibold cursor-pointer">
                                <input type="checkbox" name="trangThai" checked={formData.trangThai} onChange={handleChange} className="rounded text-primary-500 focus:ring-primary-500 w-4 h-4 cursor-pointer" /> 
                                Trạng thái hiển thị Online
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Ảnh Đại Diện (Icon/Thumbnail)</label>
                            <div className="flex gap-4">
                                {formData.hinhAnh ? (
                                    <div className="relative group w-24 h-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                                        <img src={formData.hinhAnh} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button type="button" onClick={handleRemoveImage} className="bg-red-500 p-1.5 text-white hover:bg-red-600 rounded-full"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ) : (
                                    <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary-500/5 hover:border-primary-500 hover:text-primary-500 text-gray-400 transition-all bg-white shadow-sm">
                                        <ImagePlus size={24} className="mb-1" />
                                        <span className="text-[10px] font-semibold uppercase">Tải ảnh lên</span>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                </form>

                <div className="px-8 py-4 border-t border-gray-100 bg-surface-100 flex justify-end gap-3 rounded-b-2xl shrink-0">
                    <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors shadow-sm">Hủy bỏ</button>
                    <button type='submit' form="categoryForm" disabled={loading} className="px-8 py-2.5 text-sm font-bold text-white bg-linear-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary-500/30 active:scale-95">
                        {loading && <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                        {category ? 'Lưu Thay Đổi' : 'Tạo Mới'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryFormModal;
