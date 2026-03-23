import React, { useState, useEffect } from 'react';
import { X, Trash2, Save, ImagePlus, Star } from 'lucide-react';
import axiosInstance from '../utils/axiosConfig';
import { useDispatch } from 'react-redux';
import { updateProduct, fetchProducts } from '../app/slices/productSlice';

const ProductFormModal = ({ product, categories, onClose }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('thong_tin');
    const [formData, setFormData] = useState({
        tenSanPham: '', slug: '', moTa: '', metaTitle: '', metaDescription: '',
        giaThamKhao: 0, giaBan: 0, giaKhuyenMai: 0,
        soLuongTon: 0, donViTinh: 'Áo', thuongHieu: '', xuatXu: '',
        chatLieu: '', baoQuan: '', tags: '',
        spNoiBat: false, spMoi: false, trangThai: 'cong_khai', danhMucId: '', images: []
    });

    useEffect(() => {
        if (product) {
            setFormData({
                tenSanPham: product.tenSanPham || '', slug: product.slug || '', moTa: product.moTa || '',
                metaTitle: product.metaTitle || '', metaDescription: product.metaDescription || '',
                giaThamKhao: product.giaThamKhao || 0, giaBan: product.giaBan || 0, giaKhuyenMai: product.giaKhuyenMai || 0,
                soLuongTon: product.soLuongTon || 0, donViTinh: product.donViTinh || 'Áo',
                thuongHieu: product.thuongHieu || '', xuatXu: product.xuatXu || '',
                chatLieu: product.chatLieu || '', baoQuan: product.baoQuan || '', tags: product.tags || '',
                spNoiBat: product.spNoiBat || false, spMoi: product.spMoi || false,
                danhMucId: product.danhMuc?.danhMucId || '',
                trangThai: product.trangThai || 'cong_khai',
                images: Array.isArray(product.hinhAnh) ? product.hinhAnh.map(img => img.urlAnh || img.url).filter(Boolean) : []
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        setLoading(true);
        try {
            const uploadedUrls = [];
            for (const file of files) {
                const formDataParams = new FormData();
                formDataParams.append('file', file);
                const res = await axiosInstance.post('/upload', formDataParams, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (res.url) {
                    uploadedUrls.push(res.url);
                }
            }
            setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
        } catch (error) {
            console.error("Lỗi upload ảnh:", error);
            alert("Lỗi khi tải ảnh lên Cloudinary! Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleMakeCover = (index) => {
        if (index === 0) return;
        setFormData(prev => {
            const newImages = [...prev.images];
            const [selected] = newImages.splice(index, 1);
            newImages.unshift(selected);
            return { ...prev, images: newImages };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                giaBan: Number(formData.giaBan), giaKhuyenMai: Number(formData.giaKhuyenMai), giaThamKhao: Number(formData.giaThamKhao),
                soLuongTon: Number(formData.soLuongTon),
                hinhAnh: formData.images
            };
            await dispatch(updateProduct({ id: product.sanPhamId, data: payload })).unwrap();
            dispatch(fetchProducts({ page: 0, size: 50 })); // Reload API
            onClose();
        } catch (error) {
            alert("Lỗi cập nhật: " + (error.message || JSON.stringify(error)));
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'thong_tin', label: 'Thông tin cơ bản' },
        { id: 'chi_tiet', label: 'Bài viết Chi tiết' },
        { id: 'hinh_anh', label: 'Lệnh Ảnh (Cloudinary)' }
    ];

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#fbf9f6]">
                    <h3 className="font-bold text-gray-800 text-lg uppercase tracking-wide">Sửa thông tin sản phẩm</h3>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex gap-4 px-6 pt-4 border-b border-gray-100 bg-white shrink-0">
                    {tabs.map(tab => (
                        <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`pb-3 px-3 text-sm font-semibold transition-colors border-b-2 ${activeTab === tab.id ? 'border-[#DAA06D] text-[#DAA06D]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
                
                <form id="editForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50/30">
                    {/* --- TAB THÔNG TIN --- */}
                    <div className={activeTab === 'thong_tin' ? 'block' : 'hidden'}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Tên sản phẩm *</label><input required type="text" name="tenSanPham" value={formData.tenSanPham} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA06D]/40 focus:border-[#DAA06D] bg-white transition-all shadow-sm" /></div>
                                <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Đường dẫn thân thiện (Slug)</label><input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DAA06D]/40 focus:border-[#DAA06D] bg-white transition-all placeholder-gray-300 shadow-sm" placeholder="vd: ao-lop-dep-2026" /></div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Phân loại (Danh mục)</label>
                                    <select name="danhMucId" value={formData.danhMucId} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-[#DAA06D]/40"><option value="">-- Mục tự do --</option>{categories.map(c => <option key={c.danhMucId} value={c.danhMucId}>{c.tenDanhMuc}</option>)}</select></div>
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Trạng thái rổ hàng</label>
                                    <select name="trangThai" value={formData.trangThai} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-[#DAA06D]/40"><option value="cong_khai">Công khai</option><option value="an">Ẩn (Draft)</option><option value="het_hang">Hết hàng</option></select></div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 pt-2">
                                    <label className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer"><input type="checkbox" name="spNoiBat" checked={formData.spNoiBat} onChange={handleChange} className="rounded text-[#DAA06D] focus:ring-[#DAA06D] w-4 h-4 cursor-pointer" /> Sản Phẩm Nổi bật</label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer"><input type="checkbox" name="spMoi" checked={formData.spMoi} onChange={handleChange} className="rounded text-[#DAA06D] focus:ring-[#DAA06D] w-4 h-4 cursor-pointer" /> Sản Phẩm Mới</label>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Khung giá bán lẻ (VNĐ) *</label><input required type="number" name="giaBan" value={formData.giaBan} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm font-mono border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-[#DAA06D]/40" /></div>
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Giá khuyến mãi ưu đãi</label><input type="number" name="giaKhuyenMai" value={formData.giaKhuyenMai} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm font-mono border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-[#DAA06D]/40" /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Trữ lượng kho *</label><input required type="number" name="soLuongTon" value={formData.soLuongTon} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm font-mono border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-[#DAA06D]/40" /></div>
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Đơn vị tính</label><input type="text" name="donViTinh" value={formData.donViTinh} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-[#DAA06D]/40" placeholder="vd: Áo" /></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- TAB CHI TIẾT --- */}
                    <div className={activeTab === 'chi_tiet' ? 'block' : 'hidden'}>
                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-4 max-w-4xl mx-auto w-full">
                                <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Bài viết mô tả giới thiệu sản phẩm</label><textarea name="moTa" rows="7" value={formData.moTa} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DAA06D]/40 focus:border-[#DAA06D] transition-all leading-relaxed"></textarea></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Chi tiết Chất liệu vải</label><textarea name="chatLieu" rows="4" value={formData.chatLieu} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-[#DAA06D]/40 leading-relaxed"></textarea></div>
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Hướng dẫn bảo quản (Giặt ủi)</label><textarea name="baoQuan" rows="4" value={formData.baoQuan} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-[#DAA06D]/40 leading-relaxed"></textarea></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- TAB HÌNH ẢNH --- */}
                    <div className={activeTab === 'hinh_anh' ? 'block' : 'hidden'}>
                        <div className="mb-5 bg-amber-50/70 rounded-xl p-4 border border-amber-200/50">
                            <p className="text-sm text-amber-800 font-bold mb-1">Quản lý Hình ảnh Đám Mây Cloudinary (Cloud Object Storage)</p>
                            <p className="text-[13px] text-amber-700/80 leading-relaxed">Hình ảnh đầu tiên trong danh sách bên dưới sẽ được thiết lập tự động làm ảnh bìa thumbnail. Bạn có thể chọn nhiều file ảnh (.jpg, .png, .webp) lúc Upload để chuyển thẳng lên cụm Server vệ tinh ở nước ngoài nhằm tối ưu băng thông máy chủ chính của công ty.</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-5">
                            {formData.images.map((url, i) => (
                                <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square shadow-sm bg-white hover:shadow-md transition-shadow">
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        {i !== 0 && (
                                            <button type="button" onClick={() => handleMakeCover(i)} title="Đặt làm ảnh bìa" className="bg-white/20 p-2 text-white hover:bg-[#DAA06D] hover:shadow-lg rounded-full transition-all backdrop-blur-sm transform hover:scale-110 active:scale-95"><Star size={18} /></button>
                                        )}
                                        <button type="button" onClick={() => handleRemoveImage(i)} title="Xóa ảnh" className="bg-red-500/80 p-2 text-white hover:bg-red-600 rounded-full transition-colors backdrop-blur-sm transform hover:scale-110 active:scale-95"><Trash2 size={18} /></button>
                                    </div>
                                    {i === 0 && <span className="absolute top-2 left-2 bg-[#DAA06D] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md border border-white/20">Ảnh Bìa (Mặc Định)</span>}
                                </div>
                            ))}
                            <label className="border-2 border-dashed border-gray-300 rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-[#DAA06D]/5 hover:border-[#DAA06D] hover:text-[#DAA06D] text-gray-400 transition-all group bg-white shadow-sm">
                                <ImagePlus size={28} className="mb-2.5 group-hover:-translate-y-1.5 transition-transform" />
                                <span className="text-xs font-semibold uppercase tracking-wide">Tải ảnh lên</span>
                                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>
                    </div>
                </form>

                <div className="px-8 py-4 border-t border-gray-100 bg-[#fbf9f6] flex justify-end gap-3 rounded-b-2xl shrink-0">
                    <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors shadow-sm">Thoát không lưu</button>
                    <button type='submit' form="editForm" disabled={loading} className="px-8 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#DAA06D] to-[#d08b52] rounded-xl hover:from-[#c08850] hover:to-[#b87640] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#DAA06D]/30 active:scale-95">
                        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                         Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFormModal;
