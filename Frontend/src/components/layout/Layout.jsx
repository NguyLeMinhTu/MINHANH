import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ModalIntro from "../common/Modal/ModalIntro";
import FloatingHotline from "../common/FloatingHotline";
import FloatingZalo from "../common/FloatingZalo";
import Breadcrumb from "../common/Breadcrumb";
import ScrollToTop from "../common/ScrollToTop";

export default function Layout({ children }) {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [location.pathname]);
    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Navbar />
            <Breadcrumb />
            <ModalIntro />
            <main className="flex-1">{children}</main>
            <Footer />

            {/* Floating hotline and Zalo buttons (bottom-center) */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-9999 flex flex-col sm:flex-row items-center gap-3 px-3">
                <FloatingHotline />
                <FloatingZalo />
            </div>
            <ScrollToTop />
        </div>
    );
}
