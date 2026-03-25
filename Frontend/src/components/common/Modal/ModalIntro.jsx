import React, { useEffect, useState, useRef } from "react";
import { X, Send } from 'lucide-react';
import picModalIntro from "../../../assets/anhModalIntro.jpg";

const STORAGE_KEY = "modalIntroLastShown";
const ONE_MINUTE = 60 * 1000;

function getNavigationType() {
    try {
        const navEntries = performance.getEntriesByType && performance.getEntriesByType("navigation");
        if (navEntries && navEntries.length) return navEntries[0].type || "navigate";
        if (performance.navigation && performance.navigation.type === 1) return "reload";
    } catch (e) { }
    return "navigate";
}

export default function ModalIntro({ imageSrc = picModalIntro }) {
    const [open, setOpen] = useState(false);
    const dialogRef = useRef(null);

    useEffect(() => {
        const last = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
        const now = Date.now();
        const navType = getNavigationType();

        if (!last || (now - last >= ONE_MINUTE && navType === "reload")) {
            setOpen(true);
            localStorage.setItem(STORAGE_KEY, String(now));
        }
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") close();
        };
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    function close() {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
        setOpen(false);
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-carbon-black-900/80 backdrop-blur-sm px-4 sm:px-6 transition-opacity duration-300 overflow-y-auto py-8">
            <div
                ref={dialogRef}
                className="relative w-full max-w-5xl bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col lg:flex-row transform scale-100 transition-all duration-500 my-auto"
            >
                {/* Nút đóng - Cải tiến hiển thị trên Mobile */}
                <button
                    onClick={close}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-50 p-2.5 bg-brown-bark-900 text-white md:bg-white/80 md:backdrop-blur-md md:text-carbon-black-500 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border border-white/20"
                >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Phần Hình ảnh bên trái */}
                <div className="hidden sm:flex lg:w-3/5 items-center justify-center p-6 lg:p-10 relative overflow-hidden bg-white border-b lg:border-b-0 lg:border-r border-carbon-black-100">
                    {/* Hình nền mờ đằng sau */}
                    <div className="absolute inset-0 bg-linear-to-br from-carbon-black-50 to-white opacity-80"></div>
                    
                    <img
                        src={imageSrc}
                        alt="Đồng phục Minh Anh - Ưu đãi bùng nổ"
                        className="relative z-10 max-w-full max-h-[300px] lg:max-h-[550px] object-contain drop-shadow-2xl rounded-2xl transform hover:rotate-1 transition-transform"
                    />
                </div>

                {/* Phần Form bên phải */}
                <div className="lg:w-2/5 flex flex-col justify-center p-7 lg:p-12 bg-white relative">
                    <div className="mb-8 relative z-10 text-center lg:text-left">
                        <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-golden-earth-700 bg-golden-earth-100/80 rounded-full">
                            Ưu đãi giới hạn
                        </span>
                        <h2 className="text-2xl lg:text-4xl font-extrabold text-brown-bark-900 mb-3 font-serif leading-tight">
                            Nhận Báo Giá <span className="text-golden-earth-600 block lg:inline">Ngay Lập Tức</span>
                        </h2>
                        <p className="text-carbon-black-500 leading-relaxed text-sm md:text-base">
                            Để lại lời nhắn, đội ngũ Minh Anh sẽ liên hệ tư vấn mẫu vải và báo giá chi tiết trong <span className="text-brown-bark-700 font-bold">5 phút</span>.
                        </p>
                    </div>

                    <form
                        className="space-y-4 relative z-10"
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Cảm ơn! Chúng tôi sẽ liên hệ sớm.");
                            close();
                        }}
                    >
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-carbon-black-400 uppercase tracking-widest ml-1">Họ và Tên</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Tên của bạn..."
                                required
                                className="w-full bg-carbon-black-50/50 border border-carbon-black-100 focus:border-golden-earth-400 rounded-2xl px-5 py-3.5 text-sm outline-none ring-0 focus:ring-4 focus:ring-golden-earth-100 transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-carbon-black-400 uppercase tracking-widest ml-1">Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="09xx xxx xxx"
                                required
                                className="w-full bg-carbon-black-50/50 border border-carbon-black-100 focus:border-golden-earth-400 rounded-2xl px-5 py-3.5 text-sm outline-none ring-0 focus:ring-4 focus:ring-golden-earth-100 transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-carbon-black-400 uppercase tracking-widest ml-1">Số lượng dự kiến</label>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Ví dụ: 30"
                                min="10"
                                required
                                className="w-full bg-carbon-black-50/50 border border-carbon-black-100 focus:border-golden-earth-400 rounded-2xl px-5 py-3.5 text-sm outline-none ring-0 focus:ring-4 focus:ring-golden-earth-100 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-3 bg-brown-bark-800 hover:bg-brown-bark-900 text-white font-bold py-4 rounded-2xl text-sm uppercase tracking-[0.15em] transition-all shadow-xl hover:shadow-brown-bark-900/20 active:translate-y-0.5 mt-4"
                        >
                            Gửi yêu cầu <Send className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-carbon-black-50 text-[10px] text-carbon-black-400 text-center uppercase tracking-widest font-bold">
                        Bảo mật thông tin 100%
                    </div>
                    
                    {/* Decorative Shape */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-golden-earth-50 rounded-bl-full opacity-30 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
}