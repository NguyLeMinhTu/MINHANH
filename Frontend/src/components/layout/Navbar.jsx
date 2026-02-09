import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../assets/dataCategoryProduct";
import { products } from "../../assets/dataProduct";
import { useMemo } from "react";
import MegaVest from "../../assets/mega-menu-ao-vest.jpg";
import MegaPolo from "../../assets/mega-menu-ao-polo.jpg";
import logo from "../../assets/LOGOMINHANH.png";
import ModalSearchBar from "../common/Modal/ModalSearchBar";


export default function Navbar() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const primary = "#af7b51";

    const productCategoryMap = useMemo(() => {
        const map = {};
        products.forEach((p) => {
            const cat = p.category || "Khác";
            const sub = p.subCategory || "Khác";
            if (!map[cat]) map[cat] = new Set();
            map[cat].add(sub);
        });
        return map;
    }, []);

    const slugify = (s) =>
        s
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "")
            .replace(/\-+/g, "-");

    return (
        <header className="w-full sticky top-0 z-50">
            <div className="w-full bg-[#af7b51]">
                {/* Chữ nhỏ */}
                <div className="max-w-7xl mx-auto text-center text-white text-sm py-1 px-2">
                    Trao giá trị - nhận niềm tin
                </div>
            </div>

            <nav className="bg-white shadow-sm relative">
                <div className="max-w-7xl mx-auto px-1">
                    <div className="flex items-center gap-6 py-4">
                        <div className="flex items-center gap-3">
                            <Link to="/" className="flex items-center gap-3">
                                <img src={logo} alt="Logo" className="h-12 md:h-14 lg:h-16 w-auto rounded-md object-contain flex-shrink-0" />
                            </Link>
                        </div>

                        <div className="flex-1">
                            <ul className="hidden md:flex items-center justify-center gap-6">
                                {categories.map((item) => (
                                    <li
                                        key={item.id}
                                        className="group"
                                        onMouseEnter={() => setActiveMenu(item.id)}
                                        onMouseLeave={() => setActiveMenu(null)}
                                    >
                                        <Link
                                            to={item.href}
                                            className="relative inline-block px-4 py-2 text-md font-medium text-gray-800 transform transition-all duration-200 ease-out group-hover:text-[#af7b51]"
                                        >
                                            <span className="relative z-10 flex flex-col items-center">
                                                <span className="transition-transform duration-200 group-hover:-translate-y-1">
                                                    {item.label}
                                                </span>
                                                <span className="block h-1 rounded-full bg-gradient-to-r from-[#a97858] via-[#af7b51] to-[#3b2b20] w-full transform scale-x-0 origin-center transition-transform duration-350 group-hover:scale-x-100 mt-2" />
                                            </span>
                                        </Link>

                                        {/* Dynamic subNav for SẢN PHẨM using products */}
                                        {item.label === "SẢN PHẨM" && (
                                            <div className="absolute left-0 top-full w-full invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all">
                                                <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-md px-8 py-6 flex gap-10 items-start">
                                                    {/* Three columns of product categories */}
                                                    <div className="grid grid-cols-3 gap-x-10 gap-y-4 flex-1">
                                                        {Object.entries(productCategoryMap).map(([cat, subs]) => (
                                                            <div key={cat}>
                                                                <h4 className="text-base font-semibold mb-3 text-gray-900">
                                                                    <Link to={`/san-pham/${slugify(cat)}`}>
                                                                        {cat}
                                                                    </Link>
                                                                </h4>
                                                                <ul className="text-sm text-gray-700 space-y-2">
                                                                    {Array.from(subs).map((sub) => (
                                                                        <li key={sub} className="flex items-center gap-2">
                                                                            <Link to={`/san-pham/${slugify(cat)}/${slugify(sub)}`} className="hover:text-[#af7b51] hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-200">
                                                                                {sub}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Right-side images (side by side) */}
                                                    <div className="hidden lg:flex flex-row gap-4 w-64 flex-shrink-0">
                                                        <div className="overflow-hidden rounded-md border border-gray-100 w-1/2">
                                                            <img src={MegaPolo} alt="Áo polo" className="w-full h-52 object-cover" />
                                                        </div>
                                                        <div className="overflow-hidden rounded-md border border-gray-100 w-1/2">
                                                            <img src={MegaVest} alt="Áo vest" className="w-full h-52 object-cover" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* mobile menu is handled by the hamburger toggle */}
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setMobileOpen((s) => !s)}
                                className="md:hidden w-10 h-10 rounded-md flex items-center justify-center text-gray-700 border border-gray-200 bg-white"
                                aria-label="Toggle menu"
                                aria-expanded={mobileOpen}
                            >
                                {mobileOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 5h14a1 1 0 100-2H3a1 1 0 000 2zm14 6H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>

                            <button onClick={() => setSearchOpen(true)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#af7b51]" aria-label="Open search">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-3">
                        <ul className="flex flex-col gap-1">
                            {categories.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <ModalSearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />

        </header>
    );
}