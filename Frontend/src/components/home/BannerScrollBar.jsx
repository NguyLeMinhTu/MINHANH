import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import BannerAoKhoac from "../../assets/Banners/BANNER_AOKHOAC.jpg"
import BannerAoThun from "../../assets/Banners/BANNER_AOTHUN.jpg"
import BannerAoSoMi from "../../assets/Banners/BANNER_SOMI.jpg"
import BannerDuLich from "../../assets/Banners/BANNER_DULICH.jpg"
import BannerVest from "../../assets/Banners/BANNER_VEST.jpg"

const banners = [
    {
        id: 1,
        image: BannerAoThun,
        link: "/dong-phuc-may-san",
        title: "B? SUU T?P �O THUN",
        description: "Nang d?ng - Hi?n d?i - Ch?t lu?ng cao cho m?i ho?t d?ng."
    },
    {
        id: 2,
        image: BannerAoKhoac,
        link: "/san-pham",
        title: "�O KHO�C TH?I THU?NG",
        description: "Ch?ng n?ng, gi? ?m v� kh?ng d?nh phong c�ch ri�ng."
    },
    {
        id: 3,
        image: BannerAoSoMi,
        link: "/san-pham",
        title: "SO MI C�NG S?",
        description: "Chuy�n nghi?p v� thanh l?ch trong t?ng du?ng kim mui ch?."
    }
]

const BannerScrollBar = ({ slides = [], autoPlayInterval = 6000 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const activeBanners = slides.length > 0
        ? slides.slice(0, 3).map(s => ({
            id: s.id || s.slideId,
            image: s.urlHinh,
            link: s.link || "/san-pham",
            title: s.tieuDe || "BST M?I",
            description: s.moTa || "Kh�m ph� ngay b? suu t?p m?i"
        }))
        : banners;

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [activeIndex, activeBanners.length, autoPlayInterval]);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % activeBanners.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
    };

    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? "20%" : "-20%",
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            transition: {
                x: { type: "spring", stiffness: 40, damping: 20 },
                opacity: { duration: 1.2 }
            }
        },
        exit: (dir) => ({
            zIndex: 0,
            x: dir < 0 ? "10%" : "-10%",
            opacity: 0,
            transition: {
                x: { duration: 1.2 },
                opacity: { duration: 1 }
            }
        })
    };

    if (activeBanners.length === 0) return null;

    return (
        <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[85vh] pt-[3.5rem] md:pt-[5rem] lg:pt-[6rem] overflow-hidden group bg-white">
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                >
                    <motion.img
                        src={activeBanners[activeIndex].image}
                        alt={activeBanners[activeIndex].title}
                        className="w-full h-full object-cover origin-center"
                    />

                    {/* Gradient overlay from transparent to dark */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

                    {/* Centered Content without dark overlay */}
                    <div className="absolute inset-0 flex items-center justify-center px-8 border-none">
                        <div className="max-w-3xl text-center pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="pointer-events-auto"
                            >
                                {/* <Link
                                    to={activeBanners[activeIndex].link}
                                    className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-bold text-xs tracking-[0.2em] shadow-xl hover:bg-amber-600 hover:text-white transition-all duration-700 uppercase"
                                >
                                    Kh�m ph� ngay
                                    <ChevronRight size={14} />
                                </Link> */}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-all duration-500"
            >
                <ChevronLeft size={40} strokeWidth={1} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-all duration-500"
            >
                <ChevronRight size={40} strokeWidth={1} />
            </button>

            <div className="absolute bottom-10 right-4 md:right-8 z-20 flex items-center space-x-8">
                {activeBanners.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > activeIndex ? 1 : -1);
                            setActiveIndex(idx);
                        }}
                        className="group relative py-4"
                    >
                        <div className="flex flex-col items-center">
                            <span className={`text-[10px] font-bold tracking-widest transition-colors duration-700 mb-2 ${idx === activeIndex ? "text-white" : "text-white/30"}`}>
                                0{idx + 1}
                            </span>
                            <div className={`h-[2px] transition-all duration-1000 ease-out ${idx === activeIndex ? "w-12 bg-amber-500" : "w-6 bg-white/20 group-hover:bg-white/40"}`} />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BannerScrollBar;
