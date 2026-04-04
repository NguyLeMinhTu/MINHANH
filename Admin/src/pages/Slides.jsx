import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff, X, Upload, Loader2 } from 'lucide-react'
import axios from '../utils/axiosConfig'
import { sileo } from 'sileo'
import Title from '../components/Title'
import useScrollLock from '../hooks/useScrollLock'

// ====== Upload ảnh trực tiếp lên /api/upload ======
const uploadImage = async (file) => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: fd,
    })
    if (!res.ok) throw new Error('Upload thất bại')
    const data = await res.json()
    return data.url
}

// ====== Modal Thêm / Sửa Slide ======
const SlideModal = ({ slide, onClose, onSaved }) => {
    useScrollLock();
    const [form, setForm] = useState({
        tieuDe: slide?.tieuDe || '',
        moTa: slide?.moTa || '',
        link: slide?.link || '',
        thuTu: slide?.thuTu || '',
        trangThai: slide?.trangThai ?? true,
        urlHinh: slide?.urlHinh || '',
    })
    const [preview, setPreview] = useState(slide?.urlHinh || '')
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)
    const fileRef = useRef()

    const handleFile = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setUploading(true)
        try {
            const url = await uploadImage(file)
            setForm(f => ({ ...f, urlHinh: url }))
            setPreview(url)
        } catch {
            sileo.error({ title: 'Lỗi upload', description: 'Không thể tải ảnh cho slide.' })
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSaving(true)
        
        // 1. Xử lý dữ liệu (Local logic)
        const payload = { ...form }
        if (payload.thuTu === '') delete payload.thuTu
        
        // 2. Gửi request và hiển thị thông báo (Git logic - Sileo)
        const promise = slide
            ? axios.put(`/admin/slides/${slide.id}`, payload)
            : axios.post('/admin/slides', payload);

        sileo.promise(promise, {
            loading: { title: 'Đang lưu slide...', description: 'Đang gửi dữ liệu.' },
            success: () => {
                onSaved();
                return { title: 'Thành công!', description: slide ? 'Slide đã được cập nhật.' : 'Slide mới đã được thêm.' };
            },
            error: (err) => ({ title: 'Lỗi lưu slide', description: err.message || 'Xảy ra lỗi trong quá trình lưu.' })
        });
        setSaving(false);
    }

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">{slide ? 'Chỉnh sửa slide' : 'Thêm slide mới'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X size={18} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Ảnh */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Ảnh banner</label>
                        <div
                            onClick={() => fileRef.current.click()}
                            className="relative w-full h-40 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-primary-500 transition-colors bg-gray-50 flex items-center justify-center"
                        >
                            {preview ? (
                                <img src={preview} alt="preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center text-gray-400">
                                    <Upload size={28} className="mx-auto mb-1" />
                                    <p className="text-xs">Nhấp để chọn ảnh</p>
                                </div>
                            )}
                            {uploading && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                    <Loader2 size={24} className="animate-spin text-primary-500" />
                                </div>
                            )}
                        </div>
                        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                    </div>

                    {/* Tiêu đề */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tiêu đề</label>
                        <input
                            value={form.tieuDe} onChange={e => setForm(f => ({ ...f, tieuDe: e.target.value }))}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#DAA06D]"
                            placeholder="Tiêu đề slide..." />
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mô tả</label>
                        <input
                            value={form.moTa} onChange={e => setForm(f => ({ ...f, moTa: e.target.value }))}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#DAA06D]"
                            placeholder="Mô tả ngắn..." />
                    </div>

                    {/* Link */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Link</label>
                        <input
                            value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500"
                            placeholder="/san-pham" />
                    </div>

                    {/* Trạng thái */}
                    <div className="flex items-center gap-3">
                        <button type="button"
                            onClick={() => setForm(f => ({ ...f, trangThai: !f.trangThai }))}
                            className={`relative w-10 h-5 rounded-full transition-colors ${form.trangThai ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.trangThai ? 'translate-x-5' : ''}`} />
                        </button>
                        <span className="text-sm text-gray-600">{form.trangThai ? 'Hiển thị' : 'Ẩn'}</span>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Hủy</button>
                        <button type="submit" disabled={saving || uploading}
                            className="flex items-center gap-2 px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60">
                            {saving && <Loader2 size={14} className="animate-spin" />}
                            {slide ? 'Lưu thay đổi' : 'Thêm slide'}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    )
}

// ====== Main Slides Page ======
const Slides = () => {
    const [slides, setSlides] = useState([])
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(null) // null | 'add' | slide object
    const [dragging, setDragging] = useState(null)

    const fetchSlides = async () => {
        try {
            const data = await axios.get('/admin/slides')
            setSlides(Array.isArray(data) ? data : [])
        } catch {
            setSlides([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchSlides() }, [])

    const handleToggle = (slide) => {
        const promise = axios.patch(`/admin/slides/${slide.id}/toggle`)
        sileo.promise(promise, {
            loading: { title: 'Đang cập nhật...', description: 'Đang chuyển đổi trạng thái hiển thị.' },
            success: (updated) => {
                setSlides(prev => prev.map(s => s.id === slide.id ? updated : s));
                return { title: 'Đã cập nhật trạng thái!' };
            },
            error: (err) => ({ title: 'Lỗi', description: (err.message || 'Thao tác thất bại!') })
        });
    }

    const handleDelete = (slide) => {
        sileo.action({
            title: 'Xóa vĩnh viễn slide?',
            description: `Bạn có chắc muốn XÓA VĨNH VIỄN slide "${slide.tieuDe}"? Thao tác này không thể hoàn tác.`,
            button: {
                title: 'Xác nhận xóa',
                onClick: () => {
                    sileo.promise(axios.delete(`/admin/slides/${slide.id}`), {
                        loading: { title: 'Đang xóa...', description: `Đang xóa vĩnh viễn "${slide.tieuDe}"` },
                        success: () => {
                            setSlides(prev => prev.filter(s => s.id !== slide.id));
                            return { title: 'Đã xóa thành công!' };
                        },
                        error: (err) => ({ title: 'Lỗi xóa', description: (err.message || 'Xóa thất bại!') })
                    });
                }
            }
        });
    }

    // ===== Drag & Drop reorder =====
    const handleDragStart = (idx) => setDragging(idx)
    const handleDragOver = (e, idx) => {
        e.preventDefault()
        if (dragging === null || dragging === idx) return
        const reordered = [...slides]
        const [moved] = reordered.splice(dragging, 1)
        reordered.splice(idx, 0, moved)
        setSlides(reordered)
        setDragging(idx)
    }
    const handleDragEnd = async () => {
        setDragging(null)
        try {
            await axios.put('/admin/slides/reorder', slides.map(s => s.id))
        } catch { fetchSlides() } // rollback nếu lỗi
    }

    const onSaved = () => { setModal(null); fetchSlides() }

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Title text1="Quản lý" text2="Slides" subText="Quản lý banner slide quảng bá trên trang chủ" />
                <button
                    onClick={() => setModal('add')}
                    className="flex items-center gap-2 bg-linear-to-b from-primary-600 to-primary-700/60 hover:from-primary-600 hover:to-primary-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95 mb-8">
                    <Plus size={16} /> Thêm slide
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {loading ? (
                    <div className="flex items-center justify-center py-16 text-gray-400">
                        <Loader2 size={24} className="animate-spin mr-2" /> Đang tải...
                    </div>
                ) : slides.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50/50 rounded-xl">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Plus className="text-gray-300" size={28} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Chưa có banner nào được tạo</p>
                        <p className="text-xs text-gray-400 mt-1 mb-6">Bắt đầu xây dựng trang chủ bằng cách thêm slide đầu tiên của bạn</p>
                        <button
                            onClick={() => setModal('add')}
                            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm border border-gray-200"
                        >
                            <Plus size={16} />
                            Tạo slide ngay
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {slides.map((s, idx) => (
                            <div
                                key={s.id}
                                draggable
                                onDragStart={() => handleDragStart(idx)}
                                onDragOver={(e) => handleDragOver(e, idx)}
                                onDragEnd={handleDragEnd}
                                className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${dragging === idx ? 'opacity-50' : ''}`}
                            >
                                <button className="text-gray-300 hover:text-gray-400 cursor-grab active:cursor-grabbing">
                                    <GripVertical size={18} />
                                </button>
                                <div className="w-24 h-14 rounded-lg shrink-0 border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                                    {s.urlHinh ? (
                                        <img src={s.urlHinh} alt={s.tieuDe} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-300">
                                            <Plus size={14} className="mb-0.5" />
                                            <span className="text-[10px] font-medium">No image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-800 truncate">{s.tieuDe || '(Chưa có tiêu đề)'}</p>
                                    <p className="text-xs text-gray-400 mt-0.5 truncate">{s.moTa}</p>
                                    <p className="text-xs text-gray-300 font-mono mt-0.5 truncate">{s.link}</p>
                                </div>
                                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full shrink-0">
                                    #{idx + 1}
                                </span>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${s.trangThai ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {s.trangThai ? 'Hiển thị' : 'Ẩn'}
                                </span>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button onClick={() => handleToggle(s)} title={s.trangThai ? 'Ẩn slide' : 'Hiện slide'}
                                        className={`p-1.5 rounded-lg transition-all bg-white border shadow-sm ${s.trangThai ? 'hover:bg-gray-100 text-gray-400 hover:text-gray-600 border-gray-100' : 'hover:bg-emerald-50 text-emerald-500 border-emerald-100'}`}>
                                        {s.trangThai ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                    <button onClick={() => setModal(s)} title="Chỉnh sửa"
                                        className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600 transition-all bg-white border border-gray-100 shadow-sm">
                                        <Pencil size={14} />
                                    </button>
                                    <button onClick={() => handleDelete(s)} title="Xóa"
                                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-all bg-white border border-red-100 shadow-sm">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <p className="text-xs text-gray-400 text-center">Kéo thả để sắp xếp thứ tự hiển thị slide</p>

            {/* Modal */}
            {modal && (
                <SlideModal
                    slide={modal === 'add' ? null : modal}
                    onClose={() => setModal(null)}
                    onSaved={onSaved}
                />
            )}
        </div>
    )
}

export default Slides
