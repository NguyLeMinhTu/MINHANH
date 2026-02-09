import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../../assets/dataProduct";

export default function ModalSearchBar({ open, onClose }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (!open) return;
        function onKey(e) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) {
            setQuery("");
        }
    }, [open]);

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return (products || []).filter((p) =>
            (p.name || "").toLowerCase().includes(q)
        ).slice(0, 6);
    }, [query]);

    const goToSearchPage = (keyword) => {
        const value = (keyword ?? query).trim();
        if (!value) return;
        onClose();
        navigate(`/san-pham?q=${encodeURIComponent(value)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            goToSearchPage();
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden
            />

            <div className="relative w-full max-w-xl bg-black/70 rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#faefe9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                    </svg>

                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="text-stone-100 w-full px-3 py-2 text-sm bg-transparent border border-white/40 rounded-md placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#faefe9]"
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

                {query && (
                    <div className="max-h-80 overflow-y-auto bg-black/60 divide-y divide-white/5">
                        {results.length === 0 ? (
                            <div className="px-4 py-3 text-xs text-stone-200">
                                Không tìm thấy sản phẩm phù hợp.
                            </div>
                        ) : (
                            <ul className="py-1 text-sm text-stone-100">
                                {results.map((p) => (
                                    <li key={p.id}>
                                        <button
                                            type="button"
                                            onClick={() => goToSearchPage(p.name)}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 text-left"
                                        >
                                            {p.images?.[0] && (
                                                <img
                                                    src={p.images[0]}
                                                    alt={p.name}
                                                    className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                                                />
                                            )}
                                            <span className="line-clamp-2 text-xs md:text-sm">
                                                {p.name}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                                <li className="border-t border-white/10 mt-1">
                                    <button
                                        type="button"
                                        onClick={() => goToSearchPage()}
                                        className="w-full px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-center text-stone-100 hover:bg-white/10"
                                    >
                                        Xem tất cả kết quả cho "{query}"
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
