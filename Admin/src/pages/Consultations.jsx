import React, { useState, useEffect } from 'react'
import { Phone, MessageSquare, Clock, CheckCircle2, Trash2, Search, AlertCircle, Save, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchConsultations, updateConsultationStatus, deleteConsultation } from '../app/slices/consultationSlice'
import { fetchProducts } from '../app/slices/productSlice'

import { sileo } from 'sileo'
import Title from '../components/Title'

const statusStyle = {
    'Mới': 'bg-amber-50 text-amber-600 border-amber-100',
    'Đã xử lý': 'bg-emerald-50 text-emerald-600 border-emerald-100',
}

const Consultations = () => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { items: consultations, pagination, status } = useSelector(state => state.consultations || { items: [] })
    const { data: productData } = useSelector(state => state.products)

    const [activeTab, setActiveTab] = useState('Tất cả')
    const [editingId, setEditingId] = useState(null)
    const [note, setNote] = useState('')
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const s = searchParams.get('search')
        if (s) setSearchTerm(s)
    }, [searchParams])

    useEffect(() => {
        const daXuLy = activeTab === 'Mới' ? false : activeTab === 'Đã xử lý' ? true : null

        if (searchTerm.length === 0 || searchTerm.length >= 10) {
            const delayDebounceFn = setTimeout(() => {
                dispatch(fetchConsultations({ page: currentPage, size: 5, search: searchTerm, daXuLy }))
            }, 300)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [dispatch, activeTab, searchTerm, currentPage])

    useEffect(() => {
        setCurrentPage(0)
    }, [activeTab, searchTerm])

    useEffect(() => {
        dispatch(fetchProducts({ page: 0, size: 1000 }))
    }, [dispatch])

    const getProductName = (id) => {
        if (!id) return 'Không rõ'
        const product = productData?.content?.find(p => p.sanPhamId === id)
        return product ? product.tenSanPham : 'Sản phẩm đã xóa'
    }

    const handleUpdateStatus = (item, daXuLy) => {
        const promise = dispatch(updateConsultationStatus({
            id: item.yeuCauId,
            daXuLy,
            ghiChuNoiBo: note || item.ghiChuNoiBo
        })).unwrap()

        sileo.promise(promise, {
            loading: { title: 'Đang lưu xử lý...', description: 'Đang cập nhật hệ thống.' },
            success: () => {
                setEditingId(null)
                setNote('')
                window.dispatchEvent(new CustomEvent('new-consultation'))
                return { title: 'Đã hoàn thành!', description: 'Yêu cầu tư vấn đã được đánh dấu hoàn tất.' };
            },
            error: (err) => ({ title: 'Lỗi', description: (err.message || 'Không thể cập nhật.') })
        });
    }

    const handleDelete = (id) => {
        sileo.action({
            title: 'Xóa yêu cầu tư vấn?',
            description: 'Thông tin này sẽ bị xóa vĩnh viễn khỏi hệ thống.',
            button: {
                title: 'Xác nhận xóa',
                onClick: () => {
                    sileo.promise(dispatch(deleteConsultation(id)).unwrap(), {
                        loading: { title: 'Đang xóa...', description: 'Đang gỡ bỏ yêu cầu.' },
                        success: () => {
                            window.dispatchEvent(new CustomEvent('new-consultation'))
                            return { title: 'Đã xóa thành công!' };
                        },
                        error: (err) => ({ title: 'Lỗi', description: (err.message || 'Xóa thất bại.') })
                    });
                }
            }
        });
    }

    const startEditing = (item) => {
        setEditingId(item.yeuCauId)
        setNote(item.ghiChuNoiBo || '')
    }

    const tabs = ['Tất cả', 'Mới', 'Đã xử lý']

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <Title text1="Yêu cầu" text2="tư vấn" subText="Phản hồi và quản lý tin nhắn khách hàng trong thời gian thực" />
                {/* Compact Stats */}
                <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-xs mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đang chờ</span>
                            <span className="text-sm font-bold text-slate-700">{consultations.filter(c => !c.daXuLy).length}</span>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đã hoàn tất</span>
                            <span className="text-sm font-bold text-slate-700">{consultations.filter(c => c.daXuLy).length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* List Container */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                {/* Control Panel: Tabs + Search */}
                <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-1 bg-white p-1 rounded-xl border border-slate-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeTab === tab
                                    ? 'text-white'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTabConsultations"
                                        className="absolute inset-0 bg-primary-800 rounded-lg shadow-sm"
                                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>

                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Số điện thoại hoặc nội dung..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-primary-500/20 outline-none focus:border-primary-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* List Items */}
                <div className="divide-y divide-slate-100">
                    {status === 'loading' ? (
                        <div className="p-20 text-center flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                            <span className="text-sm font-medium text-slate-400 tracking-wide">Đang đồng bộ dữ liệu...</span>
                        </div>
                    ) : consultations.length === 0 ? (
                        <div className="p-20 text-center flex flex-col items-center opacity-40">
                            <MessageSquare className="w-12 h-12 mb-3 text-slate-300" />
                            <span className="text-sm font-medium text-slate-400">Không tìm thấy yêu cầu nào phù hợp</span>
                        </div>
                    ) : consultations.map((item) => (
                        <div key={item.yeuCauId} className={`p-6 hover:bg-slate-50/50 transition-all group ${!item.daXuLy ? 'bg-amber-50' : ''}`}>
                            <div className="flex flex-col xl:flex-row gap-6">
                                {/* Metadata Section */}
                                <div className="xl:w-64 shrink-0 space-y-3">
                                    <div className="flex flex-col">
                                        <p className="text-base font-bold text-slate-800 tracking-tight leading-tight">{item.tenKhach}</p>
                                        <span className={`inline-flex w-fit px-2 py-0.5 mt-1.5 rounded-lg text-[10px] font-bold uppercase border ${item.daXuLy ? statusStyle['Đã xử lý'] : statusStyle['Mới']}`}>
                                            {item.daXuLy ? 'Đã hoàn tất' : 'Yêu cầu mới'}
                                        </span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold bg-slate-100/50 p-2 rounded-lg border border-slate-100">
                                            <Phone size={14} className="text-slate-400" />
                                            {item.soDienThoai}
                                        </div>
                                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium px-2 py-1">
                                            <Clock size={14} />
                                            {new Date(item.ngayGui).toLocaleString('vi-VN')}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 space-y-4">
                                    <div className="relative bg-white border border-slate-100 rounded-2xl p-4 shadow-xs shadow-slate-200/50 group-hover:border-slate-200 transition-colors">
                                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-50/50">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                <MessageSquare size={12} className="text-primary-500" />
                                                Nội dung yêu cầu
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-300 italic">Sản phẩm: {getProductName(item.sanPhamId)}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium">"{item.noiDung}"</p>
                                        <div className="absolute top-4 right-4 text-slate-100/10"><MessageSquare size={48} /></div>
                                    </div>

                                    {/* Action Buttons & Internal Notes */}
                                    <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 pt-2">
                                        <div className="flex-1 w-full">
                                            {editingId === item.yeuCauId ? (
                                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                                                            <Save size={12} /> Cập nhật ghi chú xử lý
                                                        </span>
                                                        <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-slate-600 p-1"><X size={16} /></button>
                                                    </div>
                                                    <textarea
                                                        value={note}
                                                        onChange={(e) => setNote(e.target.value)}
                                                        className="w-full p-2.5 bg-white border border-amber-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                                                        placeholder="Nhập tiến độ hoặc phản hồi nội bộ..."
                                                        rows="2"
                                                    />
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleUpdateStatus(item, true)}
                                                            className="px-3 py-1.5 bg-linear-to-b from-primary-600 to-primary-700/60 hover:from-primary-600 hover:to-primary-800 text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                                                        >
                                                            <CheckCircle2 size={12} /> Hoàn tất
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                item.ghiChuNoiBo && (
                                                    <div className="inline-flex items-start gap-3 bg-slate-100/50 p-2.5 rounded-xl border border-slate-100">
                                                        <div className="p-1.5 bg-white rounded-lg shadow-xs"><Save size={12} className="text-slate-400" /></div>
                                                        <div className="flex flex-col pr-4">
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ghi chú nội bộ</span>
                                                            <p className="text-xs text-slate-600 font-bold leading-tight">{item.ghiChuNoiBo}</p>
                                                        </div>
                                                        <button onClick={() => startEditing(item)} className="text-[10px] font-bold text-primary-600 hover:text-primary-700 mt-2 px-2 py-0.5 border border-primary-500/20 rounded-md">Sửa</button>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            {!item.daXuLy && editingId !== item.yeuCauId && (
                                                <button
                                                    onClick={() => startEditing(item)}
                                                    className="px-4 py-2 text-xs font-bold bg-linear-to-b from-primary-600 to-primary-700/60 hover:from-primary-600 hover:to-primary-800 text-white rounded-lg transition-all shadow-sm active:scale-95 flex items-center gap-2"
                                                >
                                                    <CheckCircle2 size={14} /> Xử lý ngay
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(item.yeuCauId)}
                                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-all bg-white border border-red-100 shadow-sm"
                                                title="Xóa yêu cầu"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {pagination?.totalPages > 1 && (
                    <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-center relative">
                        <p className="text-xs text-slate-500 italic absolute left-6 hidden sm:block">
                            Hiển thị {consultations.length} yêu cầu trên tổng số {pagination.totalElements}
                        </p>
                        <div className="flex gap-1.5">
                            <button
                                disabled={pagination.number === 0}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-3 py-1 text-xs border border-slate-200 rounded-lg hover:bg-white disabled:opacity-40 transition-colors"
                            >
                                Trước
                            </button>
                            {[...Array(pagination.totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-all ${pagination.number === i ? 'bg-primary-500 text-white shadow-sm' : 'hover:bg-white border border-transparent hover:border-slate-200 text-slate-600'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={pagination.number === pagination.totalPages - 1}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="px-3 py-1 text-xs border border-slate-200 rounded-lg hover:bg-white disabled:opacity-40 transition-colors"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Consultations
