import { useEffect } from "react";

export default function ModalSearchBar({ open, onClose }) {
    useEffect(() => {
        if (!open) return;
        function onKey(e) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden
            />

            <div className="relative w-full max-w-xl bg-black/50 rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center gap-3 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#faefe9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                    </svg>

                    <input
                        autoFocus
                        className="text-stone-100 w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#faefe9]"
                        placeholder="Tìm kiếm sản phẩm..."
                        aria-label="Search"
                    />

                    <button
                        onClick={onClose}
                        className="text-[#faefe9] hover:text-[#af7b51] p-2"
                        aria-label="Đóng"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
