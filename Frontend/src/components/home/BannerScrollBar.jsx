import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import BannerAoKhoac from '../../assets/Banners/BANNER_AOKHOAC.jpg'
import BannerAoThun from '../../assets/Banners/BANNER_AOTHUN.jpg'
import BannerAoSoMi from '../../assets/Banners/BANNER_SOMI.jpg'
import BannerDuLich from '../../assets/Banners/BANNER_DULICH.jpg'
import BannerVest from '../../assets/Banners/BANNER_VEST.jpg'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const banners = [
    {
        id: 1,
        image: BannerAoThun,
        link: '/dong-phuc-may-san',
    },
    {
        id: 2,
        image: BannerAoKhoac,
        link: '/san-pham',
    },
    {
        id: 3,
        image: BannerAoSoMi,
        link: '/san-pham',
    },
    {
        id: 4,
        image: BannerDuLich,
        link: '/san-pham',
    },
    {
        id: 5,
        image: BannerVest,
        link: '/san-pham',
    },
]

const BannerScrollBar = ({ slides = [], autoPlayInterval = 7000 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    // Sử dụng slide từ backend nếu có, nếu không thì dùng banners mặc định
    const activeBanners = slides.length > 0 
        ? slides.map(s => ({
            id: s.slideId,
            image: s.urlHinh,
            link: s.link || '/san-pham',
            title: s.tieuDe
        }))
        : banners;

    const handlePrev = () => {
        setActiveIndex(prev => (prev - 1 + activeBanners.length) % activeBanners.length);
    }

    const handleNext = () => {
        setActiveIndex(prev => (prev + 1) % activeBanners.length);
    }

    useEffect(() => {
        if (!autoPlayInterval || activeBanners.length === 0) return undefined;
        const id = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % activeBanners.length);
        }, autoPlayInterval);
        return () => clearInterval(id);
    }, [autoPlayInterval, activeBanners.length]);

    const trackStyle = {
        width: `${activeBanners.length * 100}%`,
        transform: `translateX(-${activeIndex * (100 / activeBanners.length)}%)`,
        transition: 'transform 700ms ease',
    }

    const slideStyle = {
        width: `${100 / activeBanners.length}%`,
    }

    return (
        <section className="w-full bg-gray-100">
            <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden">
                {/* Slides */}
                <div className="flex" style={trackStyle}>
                    {activeBanners.map((banner) => (
                        <div
                            key={banner.id}
                            style={slideStyle}
                            className="relative cursor-pointer"
                            onClick={() => navigate(banner.link)}
                        >
                            <img
                                src={banner.image}
                                alt={banner.title || "Banner"}
                                className="w-full h-full object-cover"
                            />

                            {/* Text overlay - lớp phủ mờ bên trái */}
                            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                <div className="pl-6 md:pl-16 lg:pl-24 pr-6 py-8 bg-gradient-to-r from-white/70 via-white/40 to-transparent max-w-xl" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Arrows - Nút điều hướng */}
                {activeBanners.length > 1 && (
                    <>
                        <button
                            type="button"
                            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-white/90 hover:bg-white border border-gray-300 rounded-full shadow"
                            onClick={handlePrev}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            type="button"
                            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-white/90 hover:bg-white border border-gray-300 rounded-full shadow"
                            onClick={handleNext}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Dots - Dấu chấm chuyển slide */}
                {activeBanners.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                        {activeBanners.map((b, idx) => (
                            <button
                                key={b.id}
                                type="button"
                                onClick={() => setActiveIndex(idx)}
                                className={`w-2.5 h-2.5 rounded-full border border-white ${idx === activeIndex ? 'bg-white' : 'bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default BannerScrollBar
