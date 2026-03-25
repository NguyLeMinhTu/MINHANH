import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uiProducts } from "../../../assets/catalog";

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
        return (uiProducts || []).filter((p) =>
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
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden
            />

            <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden border border-carbon-black-100">
                <div className="flex items-center gap-3 p-4 border-b border-carbon-black-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-carbon-black-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                    </svg>

                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="text-carbon-black-900 w-full px-3 py-2 text-sm bg-transparent border border-carbon-black-200 rounded-lg placeholder:text-carbon-black-400 focus:outline-none focus:ring-2 focus:ring-brown-bark-500/30 transition-shadow"
                        placeholder="Tìm kiếm sản phẩm..."
                        aria-label="Search"
                    />

                    <button
                        onClick={onClose}
                        className="text-carbon-black-400 hover:text-brown-bark-700 p-2 transition-colors rounded-full hover:bg-carbon-black-50"
                        aria-label="Đóng"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {query && (
                    <div className="max-h-96 overflow-y-auto bg-white divide-y divide-carbon-black-100">
                        {results.length === 0 ? (
                            <div className="px-4 py-6 text-sm text-carbon-black-500 text-center">
                                Không tìm thấy sản phẩm phù hợp.
                            </div>
                        ) : (
                            <ul className="py-2 text-sm text-carbon-black-800">
                                {results.map((p) => (
                                    <li key={p.id}>
                                        <button
                                            type="button"
                                            onClick={() => goToSearchPage(p.name)}
                                            className="group w-full flex items-center gap-4 px-4 py-2.5 hover:bg-golden-earth-50 text-left transition-colors"
                                        >
                                            {p.images?.[0] ? (
                                                <img
                                                    src={p.images[0]}
                                                    alt={p.name}
                                                    className="w-12 h-12 object-cover rounded-md border border-carbon-black-100 shrink-0"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-carbon-black-50 rounded-md border border-carbon-black-100 shrink-0 flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-carbon-black-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                            <span className="line-clamp-2 text-sm font-medium text-carbon-black-900 group-hover:text-brown-bark-700 transition-colors">
                                                {p.name}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                                <li className="border-t border-carbon-black-100 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => goToSearchPage()}
                                        className="w-full px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-center text-brown-bark-700 hover:bg-golden-earth-50 transition-colors"
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
