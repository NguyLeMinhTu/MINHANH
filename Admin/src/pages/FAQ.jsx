import React, { useState } from 'react'
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { faq } from '../assets/assets'

const FAQ = () => {
    const [expanded, setExpanded] = useState(null)

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">FAQ</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Quản lý câu hỏi thường gặp</p>
                </div>
                <button className="flex items-center gap-2 bg-[#DAA06D] hover:bg-[#c08850] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <Plus size={16} />
                    Thêm câu hỏi
                </button>
            </div>

            <div className="space-y-3">
                {faq.map((item) => (
                    <div key={item.faq_id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <button
                            onClick={() => setExpanded(expanded === item.faq_id ? null : item.faq_id)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-[#DAA06D] bg-[#DAA06D]/10 px-2 py-1 rounded-full">
                                    #{item.thu_tu}
                                </span>
                                <p className="font-medium text-gray-800">{item.cau_hoi}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${item.trang_thai ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                                    {item.trang_thai ? 'Hiển' : 'Ẩn'}
                                </span>
                                <div className="flex gap-1">
                                    <button
                                        onClick={(e) => { e.stopPropagation() }}
                                        className="p-1.5 rounded-lg hover:bg-[#DAA06D]/10 text-gray-400 hover:text-[#DAA06D] transition-colors"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation() }}
                                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                {expanded === item.faq_id ? (
                                    <ChevronDown size={18} className="text-gray-400" />
                                ) : (
                                    <ChevronRight size={18} className="text-gray-400" />
                                )}
                            </div>
                        </button>
                        {expanded === item.faq_id && (
                            <div className="px-5 pb-5 pt-0">
                                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#DAA06D]">
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.tra_loi}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQ
