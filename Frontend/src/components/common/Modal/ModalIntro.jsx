import React, { useEffect, useState, useRef } from "react";
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 sm:px-6">
            <div
                ref={dialogRef}
                className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 opacity-100"
            >
                <button
                    onClick={close}
                    aria-label="Close"
                    className="absolute top-2 right-2 z-50 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-gray-100 shadow-sm transition"
                >
                    <span className="text-lg text-gray-700 font-bold">×</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                    {/* Ảnh bên trái - hiện full nguyên mẫu, không crop */}
                    <div className="hidden lg:block lg:col-span-3 bg-gray-50 flex items-center justify-center p-4">
                        <img
                            src={imageSrc}
                            alt="Đồng phục thể thao Hải Anh - Ưu đãi bùng nổ"
                            className="max-w-full max-h-[500px] object-contain"  // <-- key: object-contain + max-h để không quá to
                        />
                    </div>

                    {/* Form bên phải */}
                    <div className="lg:col-span-2 flex flex-col justify-center p-5 lg:p-8 bg-white">
                        <h2 className="text-xl lg:text-2xl font-bold text-[#755134] mb-2">
                            BẠN ƠI TỪ TỪ <span className="inline-block animate-wave"></span>
                        </h2>

                        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                            Quý khách vui lòng điền thông tin để nhận báo giá nhanh và ưu đãi tốt nhất. (Nhận đặt từ 10 chiếc)
                        </p>

                        <form
                            className="space-y-3.5"
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Cảm ơn! Chúng tôi sẽ liên hệ sớm.");
                                close();
                            }}
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Họ và Tên"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#755134] transition"
                            />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Số điện thoại"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#755134] transition"
                            />

                            <input
                                type="number"
                                name="quantity"
                                placeholder="Số lượng cần báo"
                                min="10"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#755134] transition"
                            />

                            <button
                                type="submit"
                                className="w-full bg-[#755134] hover:bg-[#5f402b] text-white font-semibold py-3 rounded-lg text-base uppercase tracking-wide transition shadow-md hover:shadow-lg"
                            >
                                NHẬN TƯ VẤN
                            </button>
                        </form>

                        <p className="mt-4 text-xs text-gray-500 text-center leading-tight">
                            Chúng tôi sẽ liên hệ sớm nhất. Bằng việc gửi thông tin, bạn đồng ý với chính sách bảo mật.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}