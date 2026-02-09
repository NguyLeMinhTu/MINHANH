import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ModalIntro from "../common/Modal/ModalIntro";
import FloatingHotline from "../common/FloatingHotline";
import FloatingZalo from "../common/FloatingZalo";
import Breadcrumb from "../common/Breadcrumb";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Navbar />
            <Breadcrumb />
            <ModalIntro />
            <main className="flex-1">{children}</main>
            <Footer />

            {/* Floating hotline and Zalo buttons (stationary right-side bubbles) */}
            <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-[9999] flex flex-col items-center gap-4">
                <FloatingHotline />
                <FloatingZalo />
            </div>
        </div>
    );
}
