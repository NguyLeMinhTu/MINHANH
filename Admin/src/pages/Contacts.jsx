import React, { useState } from 'react'
import { Mail, Phone, Clock, CheckCircle, Trash2 } from 'lucide-react'
import { lienHe } from '../assets/assets'
import { sileo } from 'sileo'
import { motion } from 'framer-motion'
import Title from '../components/Title'

const statusStyle = {
    true: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    false: 'bg-amber-50 text-amber-600 border-amber-100',
}

const Contacts = () => {
    const [selected, setSelected] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const totalPages = Math.ceil(lienHe.length / itemsPerPage)
    const paginatedContacts = lienHe.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <Title text1="Danh sách" text2="liên hệ" subText="Hộp thư đến và phản hồi yêu cầu từ khách hàng" />
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-xs mb-8">
                    <Mail size={16} className="text-primary-500" />
                    <span className="text-xs font-bold text-slate-600">Tổng số: {lienHe.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px] items-stretch">
                {/* Master List */}
                <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                    <div className="p-4 bg-slate-50/50 border-b border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tin nhắn mới nhất</p>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-slate-100 scrollbar-thin scrollbar-thumb-slate-200">
                        {paginatedContacts.map((contact) => (
                            <button
                                key={contact.lien_he_id}
                                onClick={() => setSelected(contact)}
                                className={`w-full text-left p-5 transition-all relative group ${selected?.lien_he_id === contact.lien_he_id
                                    ? 'bg-slate-50'
                                    : 'hover:bg-slate-50/50'
                                    }`}
                            >
                                {selected?.lien_he_id === contact.lien_he_id && (
                                    <motion.div 
                                        layoutId="activeContactStrip"
                                        className="absolute inset-y-0 left-0 w-1 bg-primary-500 rounded-r-full" 
                                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                    />
                                )}
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <p className={`text-sm font-bold tracking-tight ${!contact.da_xu_ly ? 'text-slate-900' : 'text-slate-600'}`}>
                                        {contact.ho_ten}
                                    </p>
                                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold uppercase border tracking-tight shrink-0 ${statusStyle[contact.da_xu_ly]}`}>
                                        {contact.da_xu_ly ? 'Đã xử lý' : 'Mới'}
                                    </span>
                                </div>
                                <p className="text-xs font-bold text-slate-400 mb-2 truncate group-hover:text-slate-600 transition-colors">{contact.tieu_de || '(Không tiêu đề)'}</p>
                                <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">{contact.noi_dung}</p>
                                <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                                    <Clock size={12} />
                                    {new Date(contact.ngay_gui).toLocaleDateString('vi-VN')}
                                </div>
                            </button>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="p-4 bg-slate-50/30 border-t border-slate-200 flex items-center justify-center relative">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider absolute left-4 hidden sm:block">
                                Hiển thị {paginatedContacts.length} / {lienHe.length}
                            </p>
                            <div className="flex gap-1.5">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg hover:bg-white disabled:opacity-40 transition-colors text-slate-600 bg-slate-50"
                                >
                                    Trước
                                </button>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg hover:bg-white disabled:opacity-40 transition-colors text-slate-600 bg-slate-50"
                                >
                                    Sau
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Detail View */}
                <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                    {selected ? (
                        <div className="flex flex-col h-full">
                            {/* Detail Header */}
                            <div className="p-6 border-b border-slate-100 bg-slate-50/20">
                                <div className="flex items-start justify-between gap-6">
                                    <div className="space-y-4 flex-1">
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">{selected.tieu_de || 'Yêu cầu liên hệ'}</h3>
                                            <span className={`w-fit mt-2 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase border tracking-widest ${statusStyle[selected.da_xu_ly]}`}>
                                                {selected.da_xu_ly ? 'Đã xử lý' : 'Đang chờ phản hồi'}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-xs">
                                                <Mail size={14} className="text-primary-500" />
                                                <span className="text-xs font-bold text-slate-600">{selected.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-xs">
                                                <Phone size={14} className="text-primary-500" />
                                                <span className="text-xs font-bold text-slate-600">{selected.so_dien_thoai}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium px-1">
                                                <Clock size={14} />
                                                {new Date(selected.ngay_gui).toLocaleString('vi-VN')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        {!selected.da_xu_ly && (
                                            <button
                                                onClick={() => {
                                                    sileo.promise(new Promise(res => setTimeout(res, 800)), {
                                                        loading: { title: 'Đang xử lý...', description: 'Đang lưu trạng thái.' },
                                                        success: () => {
                                                            selected.da_xu_ly = true;
                                                            setSelected({ ...selected });
                                                            return { title: 'Đã xử lý!', description: 'Yêu cầu được đánh dấu hoàn tất.' };
                                                        }
                                                    })
                                                }}
                                                className="p-2.5 rounded-xl hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-all bg-white border border-slate-100 shadow-xs group"
                                                title="Đánh dấu xử lý"
                                            >
                                                <CheckCircle size={20} className="group-hover:scale-110 transition-transform" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                sileo.action({
                                                    title: 'Gỡ bỏ liên hệ?',
                                                    description: `Bạn có muốn gỡ bỏ hoàn toàn liên hệ từ "${selected.ho_ten}"?`,
                                                    button: {
                                                        title: 'Xác nhận xóa',
                                                        onClick: () => {
                                                            sileo.success({ title: 'Thao tác hoàn tất', description: 'Tin nhắn đã được gỡ bỏ.' });
                                                            setSelected(null);
                                                        }
                                                    }
                                                })
                                            }}
                                            className="p-2.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all bg-white border border-slate-200 shadow-xs group"
                                            title="Xóa liên hệ"
                                        >
                                            <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Message Body */}
                            <div className="p-8 flex-1 overflow-y-auto space-y-8 bg-slate-50/30">
                                <div className="max-w-2xl mx-auto space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-golden-earth-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-lg">
                                            {selected.ho_ten.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-baseline justify-between">
                                                <p className="text-sm font-bold text-slate-800">{selected.ho_ten}</p>
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Khách hàng</span>
                                            </div>
                                            <div className="bg-white p-5 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm shadow-slate-200/50">
                                                <p className="text-sm text-slate-600 leading-relaxed font-medium">"{selected.noi_dung}"</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reply Area */}
                                    <div className="pt-4 border-t border-slate-200 mt-10">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-1.5 h-6 bg-primary-500 rounded-full" />
                                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Trả lời khách hàng</h4>
                                        </div>
                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden focus-within:border-primary-500 transition-colors">
                                            <textarea
                                                rows={5}
                                                placeholder="Nhập nội dung phản hồi qua email..."
                                                className="w-full p-4 text-sm text-slate-600 outline-none resize-none bg-transparent placeholder:text-slate-300 font-medium"
                                            />
                                            <div className="px-4 py-3 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                                                <span className="text-[10px] text-slate-400 font-bold uppercase italic">Email sender: Admin v2.0</span>
                                                <button
                                                    onClick={() => {
                                                        sileo.promise(new Promise(res => setTimeout(res, 1200)), {
                                                            loading: { title: 'Đang gửi...', description: 'Đang chuyển giao thức qua SMTP.' },
                                                            success: { title: 'Đã gửi thành công!', description: `Phản hồi đã gửi tới: ${selected.email}` }
                                                        })
                                                    }}
                                                    className="flex items-center gap-2 bg-linear-to-b from-primary-600 to-primary-700/60 hover:from-primary-600 hover:to-primary-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-slate-200 active:scale-95"
                                                >
                                                    <Mail size={14} />
                                                    Gửi phản hồi ngay
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center flex-1 p-10 text-center opacity-40">
                            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                                <Mail size={40} className="text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Hộp thư chưa được mở</h3>
                            <p className="text-sm text-slate-500 max-w-xs mt-2 px-10">Chọn một tin nhắn từ danh sách bên trái để xem chi tiết và phản hồi khách hàng.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Contacts
