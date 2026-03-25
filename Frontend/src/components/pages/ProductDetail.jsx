import React, { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { uiProducts } from '../../assets/catalog'
import ProductCard from '../product/ProductCard'
import Title from '../common/Title'
import { Factory, Truck, CheckCircle } from "lucide-react"

const slugify = (s) =>
    s?.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-') ?? ''

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const product = useMemo(
        () => (uiProducts || []).find((p) => String(p.id) === String(id)),
        [id]
    )

    const [activeImg, setActiveImg] = useState(0)
    const [selectedSize, setSelectedSize] = useState(null)
    const [qty, setQty] = useState(1)
    const [contacted, setContacted] = useState(false)

    const related = useMemo(() => {
        if (!product) return []
        return (uiProducts || [])
            .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
            .slice(0, 5)
    }, [product])

    if (!product) {
        return (
            <div className="min-h-screen bg-carbon-black-50 flex flex-col items-center justify-center gap-4">
                <p className="text-2xl font-medium text-carbon-black-300">Không tìm thấy sản phẩm</p>
                <Link to="/san-pham" className="text-sm font-semibold text-brown-bark-700 hover:underline">
                    ← Quay lại danh sách
                </Link>
            </div>
        )
    }

    const images = product.images || []
    const formattedPrice = Number(product.price ?? 0).toLocaleString('vi-VN')

    return (
        <div className="min-h-screen bg-carbon-black-50">
            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

                    {/* ── Left: Image gallery ── */}
                    <div className="flex items-start gap-3">
                        {/* Thumbnail strip (right of large image? No — vertical strip on left of main) */}
                        {images.length > 1 && (
                            <div className="hidden sm:flex flex-col gap-2.5 w-18 shrink-0">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImg(i)}
                                        className={`w-full aspect-3/4 rounded-xl overflow-hidden border-2 bg-white transition-all duration-200 ${activeImg === i
                                            ? 'border-brown-bark-600 shadow-md'
                                            : 'border-carbon-black-100 hover:border-carbon-black-300'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Main large image */}
                        <div className="flex-1 self-start relative rounded-2xl overflow-hidden bg-white shadow-sm border border-carbon-black-100">
                            <div className="aspect-3/4 w-full overflow-hidden">
                                <img
                                    key={activeImg}
                                    src={images[activeImg] || ''}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-all duration-500 ease-out"
                                />
                            </div>

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.isNew && (
                                    <span className="bg-brown-bark-800 text-carbon-black-50 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg">
                                        Mới
                                    </span>
                                )}
                            </div>

                            {/* Nav arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-carbon-black-800 hover:bg-white transition-colors border border-carbon-black-100"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-carbon-black-800 hover:bg-white transition-colors border border-carbon-black-100"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}

                            {/* Dot indicators – mobile */}
                            {images.length > 1 && (
                                <div className="sm:hidden absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImg(i)}
                                            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${activeImg === i ? 'bg-brown-bark-700 w-4' : 'bg-white/60'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Right: Product info ── */}
                    <div className="flex flex-col">
                        {/* Category tag */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-golden-earth-50 border border-carbon-black-100 text-[10px] font-bold text-brown-bark-700 tracking-[0.18em] uppercase">
                                {product.subCategory || product.category}
                            </span>
                        </div>

                        {/* Name */}
                        <div className="mb-4">
                            <Title
                                size="sm"
                                title={product.name}
                                documentTitle={product.name}
                                className="text-left"
                                titleClassName="text-xl md:text-2xl font-bold"
                            />
                        </div>

                        {/* Price */}
                        <div className="bg-white rounded-2xl px-5 py-4 mb-6 border border-carbon-black-100 shadow-sm border-l-4 border-l-brown-bark-400">
                            <p className="text-[10px] font-bold text-brown-bark-700 uppercase tracking-widest mb-1">Giá từ</p>
                            <p className="text-3xl font-bold text-brown-bark-900">{formattedPrice}<span className="text-lg ml-1">đ</span></p>
                            <p className="text-xs text-carbon-black-600 mt-1">Liên hệ để nhận báo giá theo số lượng</p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-carbon-black-100 mb-5" />

                        {/* Color */}
                        {product.color && (
                            <div className="mb-5">
                                <p className="text-xs font-bold text-carbon-black-600 uppercase tracking-widest mb-2">Màu sắc</p>
                                <p className="text-sm font-semibold text-carbon-black-800">{product.color}</p>
                            </div>
                        )}

                        {/* Sizes */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-bold text-carbon-black-600 uppercase tracking-widest">Kích cỡ</p>
                                    {selectedSize && (
                                        <button
                                            onClick={() => setSelectedSize(null)}
                                            className="text-xs text-carbon-black-500 hover:text-carbon-black-700"
                                        >
                                            Bỏ chọn
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedSize(s)}
                                            className={`w-12 h-10 rounded-xl text-sm font-bold transition-all duration-150 ${selectedSize === s
                                                ? 'bg-brown-bark-900 text-white shadow-md'
                                                : 'bg-white border border-carbon-black-200 text-carbon-black-800 hover:border-brown-bark-700 hover:text-brown-bark-700'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-6">
                            <p className="text-xs font-bold text-carbon-black-600 uppercase tracking-widest mb-2">Số lượng</p>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center border border-carbon-black-200 rounded-xl overflow-hidden bg-white">
                                    <button
                                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-carbon-black-700 hover:bg-carbon-black-50 transition-colors text-lg font-light"
                                    >
                                        −
                                    </button>
                                    <span className="w-12 text-center text-sm font-black text-carbon-black-900">{qty}</span>
                                    <button
                                        onClick={() => setQty((q) => q + 1)}
                                        className="w-10 h-10 flex items-center justify-center text-carbon-black-700 hover:bg-carbon-black-50 transition-colors text-lg font-light"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-xs text-carbon-black-500">bộ / đơn hàng</span>
                            </div>
                        </div>

                        {/* CTA buttons */}
                        <div className="flex gap-3 mb-6">
                            <a
                                href="tel:0901234567"
                                className="flex-1 bg-brown-bark-700 hover:bg-brown-bark-800 text-white rounded-xl py-3.5 text-sm font-black text-center tracking-wide transition-colors shadow-sm"
                            >
                                Gọi đặt hàng
                            </a>
                            <a
                                href="https://zalo.me/0901234567"
                                target="_blank" rel="noreferrer"
                                className="flex-1 bg-brown-bark-900 hover:bg-brown-bark-950 text-white rounded-xl py-3.5 text-sm font-black text-center tracking-wide transition-colors shadow-sm"
                            >
                                Nhắn Zalo
                            </a>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                            {[
                                { Icon: Factory, label: 'May theo yêu cầu', desc: 'Thiết kế theo bộ nhận diện' },
                                { Icon: Truck, label: 'Giao toàn quốc', desc: 'Nhanh – đúng hẹn – an toàn' },
                                { Icon: CheckCircle, label: 'Cam kết chất lượng', desc: 'Chất vải & đường may chuẩn' },
                            ].map(({ Icon, label, desc }) => (
                                <div
                                    key={label}
                                    className="group bg-white/90 backdrop-blur rounded-2xl p-3.5 border border-carbon-black-100 hover:border-brown-bark-400 hover:shadow-md transition-all duration-200 flex items-center gap-3 sm:flex-col sm:text-center"
                                >
                                    <div className="w-11 h-11 rounded-2xl bg-golden-earth-50 border border-carbon-black-100 flex items-center justify-center text-brown-bark-700 group-hover:bg-golden-earth-100 group-hover:border-brown-bark-300 transition-colors">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-black text-carbon-black-900 leading-tight">
                                            {label}
                                        </p>
                                        <p className="text-[11px] text-carbon-black-600 leading-snug mt-0.5 line-clamp-2">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-carbon-black-100 mb-5" />

                        {/* Description */}
                        {product.description && (
                            <div>
                                <p className="text-xs font-bold text-carbon-black-600 uppercase tracking-widest mb-3">Mô tả sản phẩm</p>
                                <p className="text-sm text-carbon-black-700 leading-relaxed">{product.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Related products ── */}
                {related.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-end justify-between mb-6">
                            <div>
                                <p className="text-[10px] font-bold text-brown-bark-700 tracking-[0.18em] uppercase mb-1">Gợi ý</p>
                                <h2 className="text-2xl font-black text-carbon-black-900 tracking-tight">Sản phẩm liên quan</h2>
                            </div>
                            <Link
                                to={`/san-pham`}
                                className="text-xs font-semibold text-brown-bark-700 hover:underline flex items-center gap-1 pb-1"
                            >
                                Xem tất cả
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                            {related.map((p) => (
                                <div
                                    key={p.id}
                                    onClick={() => navigate(`/san-pham/${p.id}`)}
                                    className="cursor-pointer"
                                >
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
