import React, { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff, X, Upload, Loader2, Image as ImageIcon } from 'lucide-react'
import axios from '../utils/axiosConfig'

// ====== Upload ảnh trực tiếp ======
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

// ====== Modal Thêm / Sửa Collection ======
const CollectionModal = ({ collection, onClose, onSaved }) => {
    const [form, setForm] = useState({
        tieuDe: collection?.tieuDe || '',
        moTa: collection?.moTa || '',
        link: collection?.link || '',
        thuTu: collection?.thuTu || '',
        trangThai: collection?.trangThai || 'hien',
        urlHinh: collection?.urlHinh || '',
    })
    const [preview, setPreview] = useState(collection?.urlHinh || '')
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
            alert('Upload ảnh thất bại!')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (collection) {
                await axios.put(`/admin/collections/${collection.id}`, form)
            } else {
                await axios.post('/admin/collections', form)
            }
            onSaved()
        } catch {
            alert('Lưu thất bại!')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">{collection ? 'Sửa bộ sưu tập' : 'Thêm bộ sưu tập'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X size={18} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Ảnh */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Ảnh Banner (Khổ đứng 4:5 hoặc 3:4)</label>
                        <div
                            onClick={() => fileRef.current.click()}
                            className="relative w-full h-52 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#DAA06D] transition-colors bg-gray-50 flex items-center justify-center"
                        >
                            {preview ? (
                                <img src={preview} alt="preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center text-gray-400">
                                    <Upload size={28} className="mx-auto mb-1" />
                                    <p className="text-xs">Tải ảnh bộ sưu tập</p>
                                </div>
                            )}
                            {uploading && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                    <Loader2 size={24} className="animate-spin text-[#DAA06D]" />
                                </div>
                            )}
                        </div>
                        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                    </div>

                    {/* Tiêu đề */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tiêu đề bộ sưu tập</label>
                        <input
                            required
                            value={form.tieuDe} onChange={e => setForm(f => ({ ...f, tieuDe: e.target.value }))}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#DAA06D]"
                            placeholder="Ví dụ: Bộ Sưu Tập Công Sở" />
                    </div>

                    {/* Link + Thứ tự */}
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Đường dẫn (Link)</label>
                            <input
                                value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#DAA06D]"
                                placeholder="/san-pham?dm=dong-phuc-cong-so" />
                        </div>
                        <div className="w-24">
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Thứ tự</label>
                            <input
                                type="number" min={1}
                                value={form.thuTu} onChange={e => setForm(f => ({ ...f, thuTu: e.target.value }))}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#DAA06D]" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button type="button"
                            onClick={() => setForm(f => ({ ...f, trangThai: f.trangThai === 'hien' ? 'an' : 'hien' }))}
                            className={`relative w-10 h-5 rounded-full transition-colors ${form.trangThai === 'hien' ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.trangThai === 'hien' ? 'translate-x-5' : ''}`} />
                        </button>
                        <span className="text-sm text-gray-600">{form.trangThai === 'hien' ? 'Hiển thị' : 'Ẩn'}</span>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Hủy</button>
                        <button type="submit" disabled={saving || uploading}
                            className="flex items-center gap-2 px-5 py-2 bg-[#DAA06D] hover:bg-[#c08850] text-white text-sm font-medium rounded-lg transition-colors">
                            {saving && <Loader2 size={14} className="animate-spin" />}
                            {collection ? 'Lưu thay đổi' : 'Thêm bộ sưu tập'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// ====== Main Page ======
const Collections = () => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(null)
    const [dragging, setDragging] = useState(null)

    const fetchData = async () => {
        try {
            const data = await axios.get('/admin/collections')
            setList(Array.isArray(data) ? data : [])
        } catch { setList([]) }
        finally { setLoading(false) }
    }

    useEffect(() => { fetchData() }, [])

    const handleToggle = async (item) => {
        try {
            const updated = await axios.patch(`/admin/collections/${item.id}/toggle`)
            setList(prev => prev.map(s => s.id === item.id ? updated : s))
        } catch { alert('Thất bại!') }
    }

    const handleDelete = async (item) => {
        if (!confirm(`Xóa bộ sưu tập "${item.tieuDe}"?`)) return
        try {
            await axios.delete(`/admin/collections/${item.id}`)
            setList(prev => prev.filter(s => s.id !== item.id))
        } catch { alert('Xóa thất bại!') }
    }

    const handleDragStart = (idx) => setDragging(idx)
    const handleDragOver = (e, idx) => {
        e.preventDefault()
        if (dragging === null || dragging === idx) return
        const reordered = [...list]
        const [moved] = reordered.splice(dragging, 1)
        reordered.splice(idx, 0, moved)
        setList(reordered)
        setDragging(idx)
    }
    const handleDragEnd = async () => {
        setDragging(null)
        try {
            await axios.put('/admin/collections/reorder', list.map(s => s.id))
        } catch { fetchData() }
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">BỘ SƯU TẬP NỔI BẬT</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Quản lý các banner bộ sưu tập trên trang chủ</p>
                </div>
                <button
                    onClick={() => setModal('add')}
                    className="flex items-center gap-2 bg-[#DAA06D] hover:bg-[#c08850] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <Plus size={16} /> Thêm mới
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20 text-gray-400">
                        <Loader2 size={24} className="animate-spin mr-2" /> Đang tải...
                    </div>
                ) : list.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50/50">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Plus className="text-gray-300" size={28} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Chưa có bộ sưu tập nào</p>
                        <button onClick={() => setModal('add')} className="mt-4 text-[#DAA06D] text-sm font-bold">Tạo ngay</button>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {list.map((item, idx) => (
                            <div
                                key={item.id} draggable
                                onDragStart={() => handleDragStart(idx)}
                                onDragOver={(e) => handleDragOver(e, idx)}
                                onDragEnd={handleDragEnd}
                                className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${dragging === idx ? 'opacity-50' : ''}`}
                            >
                                <button className="text-gray-300 hover:text-gray-400 cursor-grab active:cursor-grabbing">
                                    <GripVertical size={18} />
                                </button>
                                <div className="w-20 h-24 rounded-lg shrink-0 border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                                    {item.urlHinh ? (
                                        <img src={item.urlHinh} alt={item.tieuDe} className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon size={20} className="text-gray-200" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-800 truncate">{item.tieuDe}</p>
                                    <p className="text-xs text-blue-500 mt-1 truncate">{item.link}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${item.trangThai === 'hien' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                                        {item.trangThai === 'hien' ? 'Hiển thị' : 'Ẩn'}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => handleToggle(item)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                                            {item.trangThai === 'hien' ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>
                                        <button onClick={() => setModal(item)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#DAA06D] transition-colors">
                                            <Pencil size={15} />
                                        </button>
                                        <button onClick={() => handleDelete(item)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {modal && <CollectionModal collection={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSaved={() => { setModal(null); fetchData() }} />}
        </div>
    )
}

export default Collections
