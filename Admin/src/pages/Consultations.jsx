import React, { useState } from 'react'
import { Phone, MessageSquare, Clock } from 'lucide-react'
import { yeuCauTuVan, sanPham } from '../assets/assets'

const getProductName = (id) => sanPham.find(p => p.san_pham_id === id)?.ten_san_pham ?? 'Không rõ'

const normalizeStatus = (item) => item.da_xu_ly ? 'Đã xử lý' : 'Mới'

const statusStyle = {
    'Mới': 'bg-blue-100 text-blue-700',
    'Đã xử lý': 'bg-emerald-100 text-emerald-700',
}

const Consultations = () => {
    const [activeTab, setActiveTab] = useState('Tất cả')

    const tabs = ['Tất cả', 'Mới', 'Đã xử lý']
    const filtered = activeTab === 'Tất cả'
        ? yeuCauTuVan
        : yeuCauTuVan.filter((c) => normalizeStatus(c) === activeTab)

    return (
        <div className="space-y-5">
            <div>
                <h2 className="text-xl font-bold text-gray-800">YÊU CẦU TƯ VẤN</h2>
                <p className="text-sm text-gray-500 mt-0.5">Quản lý yêu cầu tư vấn từ khách hàng</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Yêu cầu mới', value: yeuCauTuVan.filter(c => !c.da_xu_ly).length, color: 'border-blue-500 bg-blue-50', textColor: 'text-blue-700' },
                    { label: 'Đã xử lý', value: yeuCauTuVan.filter(c => c.da_xu_ly).length, color: 'border-emerald-500 bg-emerald-50', textColor: 'text-emerald-700' },
                ].map(({ label, value, color, textColor }) => (
                    <div key={label} className={`bg-white rounded-xl p-4 border-l-4 ${color} shadow-sm`}>
                        <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 px-4 pt-4 gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab
                                ? 'text-[#DAA06D] border-b-2 border-[#DAA06D]'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="divide-y divide-gray-50">
                    {filtered.map((item) => (
                        <div key={item.yeu_cau_id} className="p-5 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#DAA06D]/20 text-[#DAA06D] flex items-center justify-center font-semibold shrink-0">
                                        {item.ten_khach.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="font-semibold text-gray-800">{item.ten_khach}</p>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[normalizeStatus(item)]}`}>
                                                {normalizeStatus(item)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                                            <span className="flex items-center gap-1"><Phone size={12} /> {item.so_dien_thoai}</span>
                                            <span className="flex items-center gap-1"><MessageSquare size={12} /> {getProductName(item.san_pham_id)}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {new Date(item.ngay_gui).toLocaleString('vi-VN')}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                                            {item.noi_dung}
                                        </p>
                                        {item.ghi_chu_noi_bo && (
                                            <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-1.5 mt-2 border border-amber-100">
                                                📝 Ghi chú: {item.ghi_chu_noi_bo}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button className="px-3 py-1.5 text-xs font-medium bg-[#DAA06D] text-white rounded-lg hover:bg-[#c08850] transition-colors">
                                        Xử lý
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
