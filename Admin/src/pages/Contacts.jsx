import React, { useState } from 'react'
import { Mail, Phone, Clock, CheckCircle, Trash2 } from 'lucide-react'
import { lienHe } from '../assets/assets'
import { sileo } from 'sileo'

const statusStyle = {
    true: 'bg-emerald-100 text-emerald-700',
    false: 'bg-blue-100 text-blue-700',
}

const Contacts = () => {
    const [selected, setSelected] = useState(null)

    return (
        <div className="space-y-5">
            <div>
                <h2 className="text-xl font-bold text-gray-800">DANH SÁCH LIÊN HỆ</h2>
                <p className="text-sm text-gray-500 mt-0.5">Quản lý tin nhắn liên hệ từ khách hàng</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* List */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
                    {lienHe.map((contact) => (
                        <button
                            key={contact.lien_he_id}
                            onClick={() => setSelected(contact)}
                            className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selected?.lien_he_id === contact.lien_he_id ? 'bg-primary-500/10 border-l-4 border-primary-500' : ''
                                }`}
                        >
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <p className={`text-sm font-semibold ${!contact.da_xu_ly ? 'text-gray-900' : 'text-gray-600'
                                    }`}>
                                    {contact.ho_ten}
                                </p>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusStyle[contact.da_xu_ly]}`}>
                                    {contact.da_xu_ly ? 'Đã xử lý' : 'Chưa xử lý'}
                                </span>
                            </div>
                            <p className="text-xs font-medium text-gray-500 mb-1">{contact.tieu_de}</p>
                            <p className="text-xs text-gray-400 truncate">{contact.noi_dung}</p>
                            <p className="text-xs text-gray-300 mt-1.5">{new Date(contact.ngay_gui).toLocaleString('vi-VN')}</p>
                        </button>
                    ))}
                </div>

                {/* Detail */}
                <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    {selected ? (
                        <div className="p-6 space-y-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-lg">{selected.tieu_de}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                        <span className="flex items-center gap-1"><Mail size={12} /> {selected.email}</span>
                                        <span className="flex items-center gap-1"><Phone size={12} /> {selected.so_dien_thoai}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {new Date(selected.ngay_gui).toLocaleString('vi-VN')}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => {
                                            sileo.promise(new Promise(res => setTimeout(res, 800)), {
                                                loading: { title: 'Đang xử lý...', description: 'Đang đánh dấu đã đọc.' },
                                                success: () => {
                                                    selected.da_xu_ly = true;
                                                    setSelected({...selected});
                                                    return { title: 'Thành công!', description: 'Yêu cầu đã được đánh dấu xử lý.' };
                                                }
                                            })
                                        }}
                                        className="p-2 rounded-lg hover:bg-primary-500/10 text-gray-400 hover:text-primary-600 transition-colors"
                                    >
                                        <CheckCircle size={18} />
                                    </button>
                                    <button 
                                        onClick={() => {
                                            sileo.action({
                                                title: 'Xóa vĩnh viễn liên hệ?',
                                                description: `Bạn có chắc muốn xóa vĩnh viễn tin nhắn từ "${selected.ho_ten}"?`,
                                                button: {
                                                    title: 'Xác nhận xóa',
                                                    onClick: () => {
                                                        sileo.success({ title: 'Đã xóa!', description: 'Tin nhắn đã được gỡ khỏi hệ thống.' });
                                                        setSelected(null);
                                                    }
                                                }
                                            })
                                        }}
                                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary-500">
                                <p className="text-sm text-gray-700 leading-relaxed">{selected.noi_dung}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Trả lời</label>
                                <textarea
                                    rows={4}
                                    placeholder="Nhập nội dung trả lời..."
                                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                />
                                <div className="flex justify-end mt-3">
                                    <button 
                                        onClick={() => {
                                            sileo.promise(new Promise(res => setTimeout(res, 1200)), {
                                                loading: { title: 'Đang gửi phản hồi...', description: 'Đang kết nối tới Mail Server.' },
                                                success: { title: 'Đã gửi phản hôi!', description: `Phản hồi đã được gửi tới ${selected.email}` }
                                            })
                                        }}
                                        className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                                    >
                                        <Mail size={15} />
                                        Gửi phản hồi
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-300">
                            <Mail size={48} className="mb-3" />
                            <p className="text-sm">Chọn một tin nhắn để xem chi tiết</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Contacts
