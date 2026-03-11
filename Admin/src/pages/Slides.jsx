import React from 'react'
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react'
import { slide } from '../assets/assets'

const Slides = () => {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">SLIDES</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Quản lý banner slide trang chủ</p>
                </div>
                <button className="flex items-center gap-2 bg-[#DAA06D] hover:bg-[#c08850] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <Plus size={16} />
                    Thêm slide
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="divide-y divide-gray-50">
                    {slide.map((s) => (
                        <div key={s.slide_id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                            <button className="text-gray-300 hover:text-gray-400 cursor-grab">
                                <GripVertical size={18} />
                            </button>
                            <div className="w-24 h-14 rounded-lg shrink-0 border border-gray-200 overflow-hidden">
                                <img src={s.url_hinh} alt={s.tieu_de} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{s.tieu_de}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{s.mo_ta}</p>
                                <p className="text-xs text-gray-300 font-mono mt-0.5">{s.link}</p>
                            </div>
                            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                                #{s.thu_tu}
                            </span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.trang_thai ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {s.trang_thai ? 'Hiển thị' : 'Ẩn'}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <button className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-500 transition-colors">
                                    {s.trang_thai ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                                <button className="p-1.5 rounded-lg hover:bg-[#DAA06D]/10 text-gray-400 hover:text-[#DAA06D] transition-colors">
                                    <Pencil size={15} />
                                </button>
                                <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-xs text-gray-400 text-center">
                Kéo thả để sắp xếp thứ tự hiển thị slide
            </p>
        </div>
    )
}

export default Slides
