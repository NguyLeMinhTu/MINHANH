import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import Title from '../common/Title'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const NewProductList = ({ products = [], slideInterval = 3000 }) => {
    // Lọc danh sách sản phẩm mới nhất
    const newProducts = useMemo(() => {
        return products.filter(p => p.spMoi || p.isNew);
    }, [products]);

    const [visibleCount, setVisibleCount] = useState(6);
    const [index, setIndex] = useState(0);
    const [useTransition, setUseTransition] = useState(true);

    // Xử lý responsive cho số lượng sản phẩm hiển thị
    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth;
            if (width < 640) setVisibleCount(2.2);      // Mobile
            else if (width < 768) setVisibleCount(2.2); // Tablet nhỏ
            else if (width < 1024) setVisibleCount(3);  // Tablet lớn
            else setVisibleCount(4);                    // Desktop mặc định
        };

        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);


    if (!newProducts.length) return null;

    const maxIndex = Math.max(newProducts.length - visibleCount, 0)

    // Auto slide
    useEffect(() => {
        if (newProducts.length <= visibleCount) return undefined

        const id = setInterval(() => {
            setIndex(prev => {
                if (prev >= maxIndex) {
                    setUseTransition(false)
                    return 0
                }
                setUseTransition(true)
                return prev + 1
            })
        }, slideInterval)

        return () => clearInterval(id)
    }, [newProducts.length, maxIndex, slideInterval])

    const handlePrev = () => {
        if (newProducts.length <= visibleCount) return
        setIndex(prev => {
            if (prev <= 0) {
                setUseTransition(false)
                return maxIndex
            }
            setUseTransition(true)
            return prev - 1
        })
    }

    const handleNext = () => {
        if (newProducts.length <= visibleCount) return
        setIndex(prev => {
            if (prev >= maxIndex) {
                setUseTransition(false)
                return 0
            }
            setUseTransition(true)
            return prev + 1
        })
    }

    const trackStyle = {
        display: 'flex',
        width: `${(Math.max(newProducts.length, visibleCount) * 100) / visibleCount}%`,
        transform: `translateX(-${index * (100 / Math.max(newProducts.length, visibleCount))}%)`,
        transition: useTransition ? 'transform 500ms ease' : 'none',
    }

    const itemStyle = {
        flex: `0 0 ${100 / Math.max(newProducts.length, visibleCount)}%`,
    }

    return (
        <section className="my-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 rounded-xl bg-golden-earth-50 border border-carbon-black-100 shadow-sm">
                            <Title
                                size="lg"
                                title="Sản phẩm mới nhất"
                                // overline="Gợi ý"
                                className="leading-tight"
                                titleClassName="text-carbon-black-900 tracking-[0.12em] uppercase text-sm md:text-base"
                                overlineClassName="text-brown-bark-700"
                            />
                        </div>
                        <span className="hidden md:block h-px w-24 bg-carbon-black-200" />
                    </div>
                    <Link
                        to="/san-pham"
                        className="text-sm font-bold tracking-[0.15em] uppercase flex items-center gap-1 text-brown-bark-700 hover:text-brown-bark-900 hover:underline transition-colors"
                    >
                        Xem thêm
                    </Link>
                </div>

                <div className="relative">
                    <button
                        type="button"
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center bg-white/90 hover:bg-white border border-gray-300 rounded-full shadow-sm"
                        onClick={handlePrev}
                    >
                        <ChevronLeft className="text-sm" />
                    </button>
                    <button
                        type="button"
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center bg-white/90 hover:bg-white border border-gray-300 rounded-full shadow-sm"
                        onClick={handleNext}
                    >
                        <ChevronRight className="text-sm" />
                    </button>

                    <div className="overflow-hidden mx-0 md:mx-10">
                        <div style={trackStyle}>
                            {newProducts.map((p, index) => (
                                <div
                                    key={p.sanPhamId || p.id || p.san_pham_id || `new-${index}`}
                                    style={itemStyle}
                                    className="px-1 md:px-2 transform transition-transform duration-300 hover:scale-[1.02]"
                                >
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewProductList
