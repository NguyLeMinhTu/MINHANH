import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Save, Upload, Type, Link, Image as ImageIcon, BookOpen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, fetchPosts } from '../app/slices/postSlice';
import { fetchPostCategories } from '../app/slices/postCategorySlice';
import axiosInstance from '../utils/axiosConfig';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const statusOptions = [
    { label: 'Công khai', value: 'PUBLISHED' },
    { label: 'Bản nháp', value: 'DRAFT' },
    { label: 'Tạm ẩn', value: 'HIDDEN' }
];

const PostFormModal = ({ post, onClose }) => {
    const dispatch = useDispatch();
    const quillRef = useRef(null);
    const { items: categories } = useSelector(state => state.postCategories);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        tieuDe: '',
        slug: '',
        tomTat: '',
        noiDung: '',
        anhDaiDien: '',
        danhMucId: '',
        trangThai: 'PUBLISHED',
        tags: ''
    });

    useEffect(() => {
        dispatch(fetchPostCategories());
        if (post) {
            setFormData({
                tieuDe: post.tieuDe || '',
                slug: post.slug || '',
                tomTat: post.tomTat || '',
                noiDung: post.noiDung || '',
                anhDaiDien: post.anhDaiDien || '',
                danhMucId: post.danhMuc?.danhMucBaiVietId || '',
                trangThai: post.trangThai || 'PUBLISHED',
                tags: post.tags || ''
            });
        }
    }, [post, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        const data = new FormData();
        data.append('file', file);
        try {
            const res = await axiosInstance.post('/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.url) setFormData(prev => ({ ...prev, anhDaiDien: res.url }));
        } catch (error) {
            alert("Lỗi upload ảnh đại diện");
        } finally {
            setLoading(false);
        }
    };

    // --- Xử lý chèn ảnh vào Editor ---
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('file', file);

            setLoading(true);
            try {
                const res = await axiosInstance.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                const url = res.url;
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', url);
            } catch (error) {
                alert("Lỗi chèn ảnh vào bài viết");
            } finally {
                setLoading(false);
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        }
    }), []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (post?.baiVietId) {
                await dispatch(updatePost({ id: post.baiVietId, data: formData })).unwrap();
            } else {
                await dispatch(createPost(formData)).unwrap();
            }
            dispatch(fetchPosts({ page: 0, size: 10 }));
            onClose();
        } catch (error) {
            alert("Lỗi khi lưu bài viết");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4 text-gray-800">
            <div className="bg-white rounded-2xl w-full max-w-6xl h-[95vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#DAA06D] text-white rounded-xl shadow-md">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-base uppercase tracking-wider">
                                {post ? 'Chỉnh sửa' : 'Soạn thảo Bài viết'}
                            </h3>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-200 text-gray-400 transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form id="postForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 space-y-6 bg-white scrollbar-thin">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Cột trái: Nội dung chính */}
                        <div className="lg:col-span-3 space-y-5">
                            <div>
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Tiêu đề bài viết</label>
                                <input 
                                    required name="tieuDe" value={formData.tieuDe} onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#DAA06D]/30 outline-none text-lg font-bold"
                                    placeholder="Nhập tiêu đề..."
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Tóm tắt ngắn</label>
                                <textarea 
                                    name="tomTat" value={formData.tomTat} onChange={handleChange} rows="2" 
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#DAA06D]/30 outline-none text-sm"
                                    placeholder="Mô tả ngắn gọn..."
                                />
                            </div>

                            <div className="flex-1 min-h-[400px] flex flex-col">
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Nội dung chi tiết</label>
                                <div className="flex-1 flex flex-col bg-gray-50/30 rounded-xl overflow-hidden border border-gray-200">
                                    <ReactQuill 
                                        ref={quillRef}
                                        theme="snow"
                                        value={formData.noiDung}
                                        onChange={(content) => setFormData(prev => ({ ...prev, noiDung: content }))}
                                        modules={modules}
                                        className="flex-1 flex flex-col h-full"
                                    />
                                </div>
                                <style>{`
                                    .quill { display: flex; flex-direction: column; height: 100%; min-height: 400px; }
                                    .ql-container { flex: 1; font-size: 15px; }
                                    .ql-editor { min-height: 350px; padding: 20px; line-height: 1.8; }
                                    .ql-toolbar { border-top-left-radius: 12px; border-top-right-radius: 12px; background: white; border-color: #e5e7eb !important; }
                                    .ql-container { border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; border-color: #e5e7eb !important; }
                                `}</style>
                            </div>
                        </div>

                        {/* Cột phải: Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Chuyên mục</label>
                                    <select 
                                        name="danhMucId" value={formData.danhMucId} onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-[#DAA06D]/30"
                                    >
                                        <option value="">Chọn chuyên mục</option>
                                        {categories.map(cat => (
                                            <option key={cat.danhMucBaiVietId} value={cat.danhMucBaiVietId}>{cat.tenDanhMuc}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Trạng thái</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {statusOptions.map(opt => (
                                            <button
                                                key={opt.value} type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, trangThai: opt.value }))}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                                                    formData.trangThai === opt.value ? 'bg-[#DAA06D] text-white border-[#DAA06D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#DAA06D]'
                                                }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Ảnh đại diện</label>
                                <div className="group relative aspect-video rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden hover:border-[#DAA06D] transition-all bg-gray-50">
                                    {formData.anhDaiDien ? (
                                        <>
                                            <img src={formData.anhDaiDien} alt="" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                                <label className="bg-white text-gray-800 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer">Thay đổi<input type="file" hidden onChange={handleFeatureImageUpload} /></label>
                                            </div>
                                        </>
                                    ) : (
                                        <label className="flex flex-col items-center cursor-pointer p-4 text-center">
                                            <Upload className="text-gray-300 mb-2" size={24} />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tải ảnh lên</span>
                                            <input type="file" hidden onChange={handleFeatureImageUpload} />
                                        </label>
                                    )}
                                </div>
                            </div>

                             <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Tags (Cách nhau bằng dấu phẩy)</label>
                                <input name="tags" value={formData.tags} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-[#DAA06D]/30 outline-none" placeholder="Thời trang, Xu hướng..." />
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="px-8 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-2xl">
                    <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-all">Hủy</button>
                    <button 
                        type="submit" form="postForm" disabled={loading}
                        className="px-8 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#DAA06D] to-[#d08b52] rounded-xl shadow-lg shadow-[#DAA06D]/20 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Đang lưu...' : 'Lưu bài viết'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostFormModal;
