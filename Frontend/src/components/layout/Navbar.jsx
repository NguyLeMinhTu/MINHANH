import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { categories } from "../../assets/dataCategoryProduct";
import { danh_muc_san_pham as datasetDanhMucSanPham } from "../../assets/dataset";
import MegaVest from "../../assets/mega-menu-ao-vest.jpg";
import MegaPolo from "../../assets/mega-menu-ao-polo.jpg";
import logo from "../../assets/logo.png";
import ModalSearchBar from "../common/Modal/ModalSearchBar";

// Custom Link với Motion animation
const AnimatedLink = ({ to, children, className, onClick }) => {
    const handleClick = (e) => {
        if (onClick) onClick(e);
        if (!e.defaultPrevented) {
            const element = e.currentTarget;
            element.style.opacity = '0.7';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 150);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
        >
            <Link to={to} className={className} onClick={handleClick}>
                {children}
            </Link>
        </motion.div>
    );
};

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMobileSub, setOpenMobileSub] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMobileOpen(false);
        setOpenMobileSub(null);
    }, [location]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const [productCategoryTree, setProductCategoryTree] = useState([]);
    const [postCategories, setPostCategories] = useState([]);

    useEffect(() => {
        // Lấy cây danh mục từ Backend
        fetch("/api/danh-muc-san-pham/tree")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setProductCategoryTree(data);
            })
            .catch(err => console.error("Lỗi khi tải danh mục sản phẩm:", err));
    }, []);

    useEffect(() => {
        // Lấy danh mục bài viết từ Backend
        fetch("/api/danh-muc-bai-viet")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setPostCategories(data.filter(d => d.trangThai));
            })
            .catch(err => console.error("Lỗi khi tải danh mục bài viết:", err));
    }, []);

    const slugify = (s) =>
        s.toString().toLowerCase().trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-");

    const isActiveHref = (href) => {
        if (!href) return false;
        if (href === "/") return location.pathname === "/";
        return location.pathname === href || location.pathname.startsWith(`${href}/`);
    };

    const isActiveItem = (item) => {
        if (!item) return false;
        if (isActiveHref(item.href)) return true;
        return (item.submenu || []).some((sub) => isActiveHref(sub.href));
    };

    return (
        <header className="w-full sticky top-0 z-50">
            <div className="hidden md:block bg-golden-earth-50 text-golden-earth-900 text-[0.65rem] py-0.5 px-0">
                <div className="max-w-5xl mx-auto flex items-center justify-between gap-0.5">
                    <span className="hidden font-bold sm:inline opacity-60 tracking-wide text-[0.6rem]">Minh Anh Uniform – Đồng phục cao cấp</span>
                    <span className="flex-1 text-center font-bold tracking-widest uppercase text-slate-900">
                        Trao giá trị – nhận niềm tin
                    </span>
                    <a href="tel:0901234567" className="hidden sm:inline font-semibold text-slate-900 hover:text-white transition-colors whitespace-nowrap text-[0.65rem]">
                        0901 234 567
                    </a>
                </div>
            </div>

            <nav className={`bg-gradient-to-b from-brown-bark-800/95 to-brown-bark-700 transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm border-b border-carbon-black-100"}`}>
                <div className="max-w-6xl mx-auto px-2 md:px-3 lg:px-4">
                    <div className="flex items-center h-12 md:h-16 lg:h-20 gap-1.5 md:gap-3 justify-between md:justify-start">
                        {/* Search Button - First on mobile */}
                        <button onClick={() => setSearchOpen(true)} className="md:hidden order-first shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-carbon-black-50 hover:text-brown-bark-200 hover:bg-golden-earth-50 transition-colors" aria-label="Tìm kiếm">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                            </svg>
                        </button>

                        {/* Logo - Center on mobile, left on desktop */}
                        <AnimatedLink to="/" className="order-2 md:order-none shrink-0 md:flex-none flex items-center justify-center md:justify-start">
                            <img src={logo} alt="Minh Anh" className="h-7 md:h-12 lg:h-14 w-auto object-contain" />
                        </AnimatedLink>

                        {/* Menu Button - Last on mobile */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen((s) => !s)}
                            className="md:hidden order-3 shrink-0 inline-flex items-center gap-2 px-2 py-2 rounded-md text-carbon-black-50 hover:text-brown-bark-700 hover:bg-golden-earth-50 transition-colors"
                            aria-label="Danh mục"
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>

                        <ul className="hidden md:flex items-center flex-1 justify-center gap-2">
                            {categories.map((item) => (
                                <li key={item.id} className="group relative">
                                    <AnimatedLink
                                        to={item.href}
                                        className={`relative flex items-center gap-1 px-2 py-1.5 text-[0.7rem] font-semibold tracking-wide uppercase whitespace-nowrap rounded-md transition-colors duration-200 ${isActiveItem(item)
                                            // ? "bg-golden-earth-50 text-brown-bark-700"
                                            ? "bg-brown-bark-700 text-golden-earth-50"
                                            : "text-carbon-black-50 hover:text-brown-bark-200"
                                            }`}
                                    >
                                        {item.label}
                                        {item.hasSubmenu && (
                                            <svg className="w-3 h-3 mt-0.5 opacity-50 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                        <span
                                            className={`absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-brown-bark-600 origin-left transition-transform duration-200 rounded-full ${isActiveItem(item) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                                }`}
                                        />
                                    </AnimatedLink>

                                    {item.label === "SẢN PHẨM" && (
                                        <div className="absolute left-0 top-full pt-3 invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto translate-y-2 group-hover:translate-y-0 transition-all duration-200 min-w-55 z-50">
                                            <div className="bg-white rounded-xl shadow-2xl border border-carbon-black-100 py-2 overflow-hidden">
                                                {productCategoryTree.map((parent) => (
                                                    <div key={parent.id}>
                                                        <AnimatedLink
                                                            to={`/san-pham?dm=${encodeURIComponent(parent.slug || slugify(parent.tenDanhMuc || ""))}`}
                                                            className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-carbon-black-800 hover:bg-golden-earth-50 hover:text-brown-bark-700 transition-colors whitespace-nowrap"
                                                        >
                                                            {parent.tenDanhMuc}
                                                        </AnimatedLink>
                                                        {parent.children && parent.children.length > 0 && (
                                                            <div className="flex flex-col pb-1">
                                                                {parent.children.map((child) => (
                                                                    <AnimatedLink
                                                                        key={child.id}
                                                                        to={`/san-pham?dm=${encodeURIComponent(parent.slug || slugify(parent.tenDanhMuc || ""))}&sub=${encodeURIComponent(child.slug || slugify(child.tenDanhMuc || ""))}`}
                                                                        className="flex items-center gap-2 px-8 py-1.5 text-xs text-carbon-black-600 hover:text-brown-bark-700 hover:bg-golden-earth-50 transition-colors whitespace-nowrap"
                                                                    >
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-dark-goldenrod-400 shrink-0" />
                                                                        {child.tenDanhMuc}
                                                                    </AnimatedLink>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                <div className="border-t border-carbon-black-100 mt-1 pt-2 pb-1">
                                                    <AnimatedLink
                                                        to="/san-pham"
                                                        className="flex items-center justify-center gap-1.5 px-4 text-xs font-bold text-brown-bark-700 hover:underline transition-colors whitespace-nowrap"
                                                    >
                                                        Xem tất cả sản phẩm
                                                    </AnimatedLink>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {item.label === "TIN TỨC" && postCategories.length > 0 && (
                                        <div className="absolute left-0 top-full pt-3 invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto translate-y-2 group-hover:translate-y-0 transition-all duration-200 min-w-55 z-50">
                                            <div className="bg-white rounded-xl shadow-2xl border border-carbon-black-100 py-2 overflow-hidden">
                                                {postCategories.map((cat) => (
                                                    <AnimatedLink
                                                        key={cat.danhMucBaiVietId}
                                                        to={`/tin-tuc?dm=${encodeURIComponent(cat.slug || cat.tenDanhMuc)}`}
                                                        className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-carbon-black-800 hover:bg-golden-earth-50 hover:text-brown-bark-700 transition-colors whitespace-nowrap"
                                                    >
                                                        {cat.tenDanhMuc}
                                                    </AnimatedLink>
                                                ))}
                                                <div className="border-t border-carbon-black-100 mt-1 pt-2 pb-1">
                                                    <AnimatedLink
                                                        to="/tin-tuc"
                                                        className="flex items-center justify-center gap-1.5 px-4 text-xs font-bold text-brown-bark-700 hover:underline transition-colors whitespace-nowrap"
                                                    >
                                                        Xem tất cả tin tức
                                                    </AnimatedLink>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {item.hasSubmenu && item.label !== "SẢN PHẨM" && item.label !== "TIN TỨC" && (
                                        <div className="absolute left-0 top-full pt-3 invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto translate-y-2 group-hover:translate-y-0 transition-all duration-200 min-w-55">
                                            <div className="bg-white rounded-xl shadow-2xl border border-carbon-black-100 py-2 overflow-hidden">
                                                {item.submenu?.map((sub) => (
                                                    <AnimatedLink key={sub.href} to={sub.href} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-carbon-black-800 hover:bg-golden-earth-50 hover:text-brown-bark-700 transition-colors">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-dark-goldenrod-400 shrink-0" />
                                                        {sub.label}
                                                    </AnimatedLink>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-1 shrink-0">
                            {/* <button
                                type="button"
                                className="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-carbon-black-50 hover:text-brown-bark-200 hover:bg-golden-earth-50 transition-colors"
                                aria-label="Tài khoản"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 20.25a7.5 7.5 0 0115 0" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                className="flex w-9 h-9 rounded-full items-center justify-center text-carbon-black-50 hover:text-brown-bark-200 hover:bg-golden-earth-50 transition-colors"
                                aria-label="Giỏ hàng"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 3h1.5l1.5 13.5h12.75l2.25-9H6" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </button> */}

                            <button onClick={() => setSearchOpen(true)} className="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-carbon-black-50 hover:text-brown-bark-200 hover:bg-golden-earth-50 transition-colors" aria-label="Tìm kiếm">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-carbon-black-100 shadow-lg">
                    <div className="max-w-7xl mx-auto px-3 py-1.5 divide-y divide-carbon-black-50">
                        {categories.map((item) => (
                            <div key={item.id}>
                                {item.hasSubmenu ? (
                                    <>
                                        <button
                                            onClick={() => setOpenMobileSub(openMobileSub === item.id ? null : item.id)}
                                            className="w-full flex items-center justify-between px-2 py-2.5 text-xs font-semibold uppercase text-carbon-black-800 hover:text-brown-bark-700 hover:bg-golden-earth-50 transition-colors rounded"
                                        >
                                            {item.label}
                                            <svg className={`w-4 h-4 transition-transform duration-200 shrink-0 ml-2 ${openMobileSub === item.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {openMobileSub === item.id && (
                                            <div className="pb-2 pl-2 space-y-1">
                                                {item.label === "SẢN PHẨM" ? (
                                                    productCategoryTree.map((parent) => (
                                                        <div key={parent.id} className="mb-1">
                                                            <AnimatedLink
                                                                to={`/san-pham?dm=${encodeURIComponent(parent.slug || slugify(parent.tenDanhMuc || ""))}`}
                                                                onClick={() => setMobileOpen(false)}
                                                                className="block px-2 py-1.5 text-xs font-semibold text-carbon-black-900 hover:text-brown-bark-700 hover:bg-golden-earth-50 transition-colors rounded"
                                                            >
                                                                {parent.tenDanhMuc}
                                                            </AnimatedLink>
                                                            {parent.children && parent.children.map((child) => (
                                                                <AnimatedLink
                                                                    key={child.id}
                                                                    to={`/san-pham?dm=${encodeURIComponent(parent.slug || slugify(parent.tenDanhMuc || ""))}&sub=${encodeURIComponent(child.slug || slugify(child.tenDanhMuc || ""))}`}
                                                                    onClick={() => setMobileOpen(false)}
                                                                    className="flex items-center gap-2 px-4 py-1.5 text-xs text-carbon-black-600 hover:text-brown-bark-700 hover:bg-golden-earth-50 transition-colors rounded"
                                                                >
                                                                    <span className="w-0.5 h-0.5 rounded-full bg-dark-goldenrod-400 shrink-0" />
                                                                    {child.tenDanhMuc}
                                                                </AnimatedLink>
                                                            ))}
                                                        </div>
                                                    ))
                                                ) : (
                                                    item.submenu?.map((sub) => (
                                                        <AnimatedLink key={sub.href} to={sub.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-2 py-2 text-xs text-carbon-black-700 hover:text-brown-bark-700 hover:bg-golden-earth-50 transition-colors rounded">
                                                            <span className="w-1 h-1 rounded-full bg-dark-goldenrod-400 shrink-0" />
                                                            {sub.label}
                                                        </AnimatedLink>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <AnimatedLink to={item.href} onClick={() => setMobileOpen(false)} className="block px-2 py-2.5 text-xs font-semibold uppercase text-carbon-black-800 hover:text-brown-bark-700 hover:bg-golden-earth-50 transition-colors rounded">
                                        {item.label}
                                    </AnimatedLink>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <ModalSearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
        </header>
    );
}
