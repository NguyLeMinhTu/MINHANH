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
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-carbon-black-900/60 backdrop-blur-sm px-4 sm:px-6 transition-opacity duration-300">
            <div
                ref={dialogRef}
                className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row transform scale-100 transition-transform duration-500"
            >
                {/* Nút đóng */}
                <button
                    onClick={close}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-50 p-2 bg-white/50 backdrop-blur-md rounded-full text-carbon-black-500 hover:text-carbon-black-900 hover:bg-carbon-black-100 transition-all border border-transparent hover:border-carbon-black-200"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Phần Hình ảnh bên trái */}
                <div className="lg:w-3/5 flex items-center justify-center p-6 relative overflow-hidden bg-white border-r border-carbon-black-100">
                    {/* Hình nền mờ đằng sau */}
                    <div className="absolute inset-0 bg-linear-to-br from-carbon-black-50 to-white opacity-80"></div>
                    
                    <img
                        src={imageSrc}
                        alt="Đồng phục Minh Anh - Ưu đãi bùng nổ"
                        className="relative z-10 max-w-full max-h-[400px] lg:max-h-[500px] object-contain drop-shadow-xl rounded-2xl"
                    />
                </div>

                {/* Phần Form bên phải */}
                <div className="lg:w-2/5 flex flex-col justify-center p-8 lg:p-10 bg-white relative">
                    <div className="mb-6 relative z-10">
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider text-golden-earth-700 bg-golden-earth-100 rounded-full">
                            Ưu đãi giới hạn
                        </span>
                        <h2 className="text-2xl lg:text-3xl font-bold text-brown-bark-900 mb-2 font-serif tracking-tight">
                            Nhận Báo Giá Ngay 👋
                        </h2>
                        <p className="text-carbon-black-500 leading-relaxed text-sm">
                            Điền thông tin để nhận tư vấn chuyên sâu và ưu đãi đặc biệt từ Minh Anh. <br/>
                            <span className="font-medium text-brown-bark-600">(Nhận đặt từ 10 chiếc)</span>
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
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-carbon-black-700 uppercase tracking-wide ml-1">Họ và Tên</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nhập họ và tên..."
                                required
                                className="w-full bg-carbon-black-50 border border-carbon-black-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-golden-earth-400 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-carbon-black-700 uppercase tracking-wide ml-1">Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Nhập số điện thoại..."
                                required
                                className="w-full bg-carbon-black-50 border border-carbon-black-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-golden-earth-400 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-carbon-black-700 uppercase tracking-wide ml-1">Số lượng cần báo</label>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Ví dụ: 50"
                                min="10"
                                required
                                className="w-full bg-carbon-black-50 border border-carbon-black-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-golden-earth-400 focus:bg-white transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-brown-bark-800 hover:bg-brown-bark-900 text-white font-semibold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all shadow-md mt-2"
                        >
                            Nhận Tư Vấn <Send className="w-4 h-4" />
                        </button>
                    </form>

                    <p className="mt-6 text-xs text-carbon-black-400 text-center leading-relaxed">
                        Chúng tôi cam kết bảo mật thông tin của bạn.
                    </p>
                    
                    {/* Decorative Shape */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-golden-earth-50 rounded-tl-full opacity-50 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
}