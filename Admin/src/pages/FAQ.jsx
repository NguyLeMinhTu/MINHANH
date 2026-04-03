import React, { useState } from 'react'
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { faq } from '../assets/assets'
import Title from '../components/Title'

const FAQ = () => {
    const [expanded, setExpanded] = useState(null)

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <Title text1="Hỏi đáp" text2="FAQ" subText="Quản lý danh sách câu hỏi và câu trả lời thường gặp" />
                <button className="flex items-center gap-2 bg-linear-to-b from-primary-600 to-primary-700/60 hover:from-primary-600 hover:to-primary-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95 mb-8">
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
                                <span className="text-xs font-semibold text-primary-600 bg-primary-500/10 px-2 py-1 rounded-full">
                                    #{item.thu_tu}
                                </span>
                                <p className="font-medium text-gray-800">{item.cau_hoi}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${item.trang_thai ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                                    {item.trang_thai ? 'Hiển' : 'Ẩn'}
                                </span>
                                <div className="flex gap-2">
                                    <div
                                        onClick={(e) => { e.stopPropagation() }}
                                        className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600 transition-all bg-white border border-gray-100 shadow-sm cursor-pointer"
                                        role="button"
                                        title="Chỉnh sửa"
                                    >
                                        <Pencil size={14} />
                                    </div>
                                    <div
                                        onClick={(e) => { e.stopPropagation() }}
                                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-all bg-white border border-red-100 shadow-sm cursor-pointer"
                                        role="button"
                                        title="Xóa"
                                    >
                                        <Trash2 size={14} />
                                    </div>
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
                                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary-500">
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
