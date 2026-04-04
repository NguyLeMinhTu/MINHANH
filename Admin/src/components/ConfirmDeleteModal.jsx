import React, { useState } from 'react';
import { AlertTriangle, X, Trash2, ArrowRight } from 'lucide-react';

const ConfirmDeleteModal = ({ category, productCount, onConfirm, onClose }) => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const isParent = !category.parent;
    const canSubmit = isParent ? isConfirmed : true;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 flex flex-col transform transition-all scale-100" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className={`px-6 py-5 flex items-center gap-3 ${isParent ? 'bg-primary-50 border-b border-primary-100' : 'bg-primary-50 border-b border-primary-100'}`}>
                    <div className={`p-2 rounded-xl scale-110 ${isParent ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-primary-500 text-white shadow-lg shadow-primary-200'}`}>
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className={`font-black text-lg uppercase tracking-tight ${isParent ? 'text-primary-950' : 'text-primary-800'}`}>
                            {isParent ? 'Cảnh báo xóa gốc' : 'Xác nhận di chuyển'}
                        </h3>
                        <p className={`text-[10px] font-bold uppercase tracking-widest opacity-70 ${isParent ? 'text-primary-600' : 'text-primary-500'}`}>
                           Thao tác không thể hoàn tác
                        </p>
                    </div>
                    <button onClick={onClose} className="ml-auto p-2 rounded-xl hover:bg-black/5 text-gray-400 transition-all active:scale-90">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    {isParent ? (
                        <div className="space-y-4">
                            <p className="text-gray-600 text-[14px] leading-relaxed">
                                Bạn đang thực hiện xóa danh mục gốc <span className="font-bold text-gray-900">"{category.tenDanhMuc}"</span>. 
                                <br/><br/>
                                <span className="text-primary-700 font-semibold italic">Lưu ý:</span> Toàn bộ <span className="bg-primary-100 text-primary-800 px-1.5 py-0.5 rounded-lg font-bold">{productCount} sản phẩm</span> và các danh mục con liên quan sẽ bị <span className="underline decoration-primary-300 decoration-2 font-bold uppercase">XÓA VĨNH VIỄN</span>.
                            </p>

                            <div className="bg-primary-50/50 p-4 rounded-2xl border border-primary-100/50">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center mt-0.5">
                                        <input 
                                            type="checkbox" 
                                            checked={isConfirmed}
                                            onChange={(e) => setIsConfirmed(e.target.checked)}
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-primary-300 bg-white checked:bg-primary-600 checked:border-primary-600 transition-all"
                                        />
                                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <span className="text-primary-800 text-[13px] font-bold leading-snug group-hover:text-primary-900 transition-colors">
                                        Tôi đã đọc và đồng ý xóa vĩnh viễn toàn bộ dữ liệu nêu trên.
                                    </span>
                                </label>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-gray-600 text-[14px] leading-relaxed">
                                Bạn đang xóa danh mục con <span className="font-bold text-gray-900">"{category.tenDanhMuc}"</span>.
                            </p>
                            <div className="flex items-center justify-center gap-4 bg-primary-50/50 p-5 rounded-3xl border border-primary-100 py-6 my-2 shadow-sm">
                                <div className="text-center">
                                    <div className="text-2xl font-black text-primary-600">{productCount}</div>
                                    <div className="text-[10px] font-bold text-primary-400 uppercase tracking-tighter">Sản phẩm</div>
                                </div>
                                <ArrowRight className="text-primary-300" size={24} />
                                <div className="text-center">
                                    <div className="text-[13px] font-bold text-gray-800 leading-tight">Chuyển về<br/>danh mục cha</div>
                                    <div className="text-[10px] font-bold text-primary-600 mt-1 uppercase px-2 py-0.5 bg-primary-100 rounded-full truncate max-w-[120px]">
                                        {category.parent?.tenDanhMuc}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex gap-3">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-3 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                    >
                        Hủy lệnh
                    </button>
                    <button 
                        onClick={onConfirm}
                        disabled={!canSubmit}
                        className={`flex-[1.5] py-3 text-sm font-black text-white rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed bg-primary-900 hover:bg-primary-800`}
                    >
                        <Trash2 size={16} />
                        THỰC HIỆN XÓA
                    </button>
                </div>
            </div>
        </div>
    );
}
;

export default ConfirmDeleteModal;
