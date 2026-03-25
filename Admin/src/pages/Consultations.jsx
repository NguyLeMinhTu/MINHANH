import React, { useState, useEffect } from 'react'
import { Phone, MessageSquare, Clock, CheckCircle2, Trash2, Search, AlertCircle, Save, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConsultations, updateConsultationStatus, deleteConsultation } from '../app/slices/consultationSlice'
import { fetchProducts } from '../app/slices/productSlice'

const statusStyle = {
    'Mới': 'bg-blue-100 text-blue-700 border-blue-200',
    'Đã xử lý': 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

const Consultations = () => {
    const dispatch = useDispatch()
    const { items: consultations, pagination, status } = useSelector(state => state.consultations || { items: [] })
    const { data: productData } = useSelector(state => state.products)
    
    const [activeTab, setActiveTab] = useState('Tất cả')
    const [editingId, setEditingId] = useState(null)
    const [note, setNote] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const daXuLy = activeTab === 'Mới' ? false : activeTab === 'Đã xử lý' ? true : null
        
        // Chỉ tìm kiếm khi độ dài = 0 (xem tất cả) hoặc >= 10 (đủ số điện thoại VN)
        if (searchTerm.length === 0 || searchTerm.length >= 10) {
            const delayDebounceFn = setTimeout(() => {
                dispatch(fetchConsultations({ page: 0, size: 20, search: searchTerm, daXuLy }))
            }, 300)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [dispatch, activeTab, searchTerm])

    useEffect(() => {
        dispatch(fetchProducts({ page: 0, size: 1000 }))
    }, [dispatch])

    const getProductName = (id) => {
        if (!id) return 'Không rõ'
        const product = productData?.content?.find(p => p.sanPhamId === id)
        return product ? product.tenSanPham : 'Đã xóa hoặc không tồn tại'
    }

    const handleUpdateStatus = async (item, daXuLy) => {
        try {
            await dispatch(updateConsultationStatus({ 
                id: item.yeuCauId, 
                daXuLy, 
                ghiChuNoiBo: note || item.ghiChuNoiBo 
            })).unwrap()
            setEditingId(null)
            setNote('')
        } catch (error) {
            alert("Lỗi khi cập nhật trạng thái")
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa yêu cầu này?")) {
            await dispatch(deleteConsultation(id))
        }
    }

    const startEditing = (item) => {
        setEditingId(item.yeuCauId)
        setNote(item.ghiChuNoiBo || '')
    }

    const tabs = ['Tất cả', 'Mới', 'Đã xử lý']

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">YÊU CẦU TƯ VẤN</h2>
                    <p className="text-sm text-gray-500">Quản lý phản hồi và yêu cầu gọi lại từ khách hàng</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-xl"><AlertCircle size={24} /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Đang chờ xử lý</p>
                        <p className="text-2xl font-bold text-blue-600">
                             {consultations.filter(c => !c.daXuLy).length}
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl"><CheckCircle2 size={24} /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Đã hoàn thành</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            {consultations.filter(c => c.daXuLy).length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 bg-gray-50/30 px-6 pt-4 gap-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab
                                ? 'text-[#DAA06D]'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DAA06D] rounded-t-full"></div>}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Tìm kiếm theo Số điện thoại..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#DAA06D]/20 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="divide-y divide-gray-50">
                    {status === 'loading' ? (
                        <div className="p-20 text-center text-gray-400 italic">Đang tải yêu cầu...</div>
                    ) : consultations.length === 0 ? (
                        <div className="p-20 text-center text-gray-400 italic">Không có yêu cầu nào trong danh sách này</div>
                    ) : consultations.map((item) => (
                        <div key={item.yeuCauId} className="p-6 hover:bg-gray-50/50 transition-colors group">
                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                <div className="flex items-start gap-5 flex-1">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DAA06D] to-[#d08b52] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#DAA06D]/20 shrink-0">
                                        {item.tenKhach.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-3">
                                            <p className="font-bold text-gray-800 text-base">{item.tenKhach}</p>
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${item.daXuLy ? statusStyle['Đã xử lý'] : statusStyle['Mới']}`}>
                                                {item.daXuLy ? 'Đã xử lý' : 'Mới'}
                                            </span>
                                        </div>
                                        
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 font-medium">
                                            <span className="flex items-center gap-1.5"><Phone size={14} className="text-gray-400" /> {item.soDienThoai}</span>
                                            {item.email && <span className="flex items-center gap-1.5 font-mono">{item.email}</span>}
                                            <span className="flex items-center gap-1.5"><MessageSquare size={14} className="text-gray-400" /> {getProductName(item.sanPhamId)}</span>
                                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-gray-400" /> {new Date(item.ngayGui).toLocaleString('vi-VN')}</span>
                                        </div>

                                        <div className="text-sm text-gray-600 bg-white border border-gray-100 rounded-xl p-4 shadow-sm mt-3 leading-relaxed italic">
                                            "{item.noiDung}"
                                        </div>

                                        {editingId === item.yeuCauId ? (
                                            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2">
                                                        <Save size={12} /> Cập nhật ghi chú nội bộ
                                                    </label>
                                                    <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
                                                </div>
                                                <textarea 
                                                    value={note}
                                                    onChange={(e) => setNote(e.target.value)}
                                                    className="w-full p-3 bg-white border border-amber-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500/20"
                                                    placeholder="Nhập ghi chú xử lý..."
                                                    rows="2"
                                                />
                                                <div className="flex justify-end gap-2 text-sm font-bold">
                                                    <button 
                                                        onClick={() => handleUpdateStatus(item, true)}
                                                        className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all flex items-center gap-2"
                                                    >
                                                        <CheckCircle2 size={14} /> Xong
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            item.ghiChuNoiBo && (
                                                <div className="mt-3 p-3 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-2">
                                                    <div className="p-1 bg-amber-100 text-amber-600 rounded-lg mt-0.5"><Save size={12} /></div>
                                                    <div className="flex-1">
                                                        <p className="text-[10px] font-bold text-amber-600/70 uppercase tracking-widest mb-1">Ghi chú xử lý</p>
                                                        <p className="text-xs text-amber-800 leading-relaxed font-medium">{item.ghiChuNoiBo}</p>
                                                    </div>
                                                    <button onClick={() => startEditing(item)} className="text-[10px] font-bold text-amber-600 hover:underline">Sửa</button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="flex lg:flex-col gap-2 shrink-0 self-center lg:self-start">
                                    {!item.daXuLy && editingId !== item.yeuCauId && (
                                        <button 
                                            onClick={() => startEditing(item)}
                                            className="px-4 py-2 text-xs font-bold bg-[#DAA06D] text-white rounded-xl hover:bg-[#c08850] transition-all shadow-md shadow-[#DAA06D]/20 active:scale-95 flex items-center gap-2"
                                        >
                                            <CheckCircle2 size={15} /> Xử lý ngay
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleDelete(item.yeuCauId)}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Consultations
