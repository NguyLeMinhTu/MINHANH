import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react'
import { sileo } from 'sileo'
import ProductCard from '../product/ProductCard'
import Title from '../common/Title'
import ProductDetailTabs from '../product/ProductDetailTabs'
import { Factory, Truck, CheckCircle, Users, X, Loader2 } from "lucide-react"

// Premium spring configs
const springSmooth = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }
const springBouncy = { type: 'spring', stiffness: 400, damping: 25, mass: 0.6 }
const springGentle = { type: 'spring', stiffness: 200, damping: 28, mass: 1 }

// Slide variants with 3D perspective
const imageSlideVariants = {
    enter: (dir) => ({
        x: dir > 0 ? '40%' : '-40%',
        opacity: 0,
        scale: 0.92,
        filter: 'blur(8px)',
        rotateY: dir > 0 ? 8 : -8,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        rotateY: 0,
    },
    exit: (dir) => ({
        x: dir > 0 ? '-30%' : '30%',
        opacity: 0,
        scale: 0.95,
        filter: 'blur(6px)',
        rotateY: dir > 0 ? -5 : 5,
    }),
}

// Lightbox image variants – more dramatic 3D
const lightboxImgVariants = {
    enter: (dir) => ({
        x: dir > 0 ? '60%' : '-60%',
        opacity: 0,
        scale: 0.85,
        filter: 'blur(12px)',
        rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        rotateY: 0,
    },
    exit: (dir) => ({
        x: dir > 0 ? '-40%' : '40%',
        opacity: 0,
        scale: 0.88,
        filter: 'blur(10px)',
        rotateY: dir > 0 ? -10 : 10,
    }),
}

const slugify = (s) =>
    s?.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-') ?? ''

export default function ProductDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [related, setRelated] = useState([])
    const [activeImg, setActiveImg] = useState(0)
    const [imgDirection, setImgDirection] = useState(1)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [qty, setQty] = useState(1)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('description')
    const scrollRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    // Consultation modal state
    const [showConsultModal, setShowConsultModal] = useState(false)
    const [consultForm, setConsultForm] = useState({
        tenSanPham: '',
        hoTen: '',
        soDienThoai: '',
        soLuong: ''
    })
    const [consultErrors, setConsultErrors] = useState({})
    const [consultLoading, setConsultLoading] = useState(false)
    const [consultSuccess, setConsultSuccess] = useState(false)

    const openConsultModal = () => {
        setConsultForm({
            tenSanPham: product?.tenSanPham || '',
            hoTen: '',
            soDienThoai: '',
            soLuong: ''
        })
        setConsultErrors({})
        setConsultSuccess(false)
        setShowConsultModal(true)
    }

    const validatePhone = (phone) => {
        const cleaned = phone.replace(/\s/g, '')
        return /^(0[2-9]\d{8}|84[2-9]\d{8})$/.test(cleaned)
    }

    const handleConsultSubmit = async (e) => {
        e.preventDefault()
        const errors = {}

        if (!consultForm.hoTen.trim()) errors.hoTen = 'Vui lòng nhập họ tên'
        if (!consultForm.soDienThoai.trim()) {
            errors.soDienThoai = 'Vui lòng nhập số điện thoại'
        } else if (!validatePhone(consultForm.soDienThoai)) {
            errors.soDienThoai = 'Số điện thoại không hợp lệ (VD: 0901234567)'
        }

        if (Object.keys(errors).length > 0) {
            setConsultErrors(errors)
            return
        }
        setConsultErrors({})
        setConsultLoading(true)

        const payload = {
            tenKhach: consultForm.hoTen,
            soDienThoai: consultForm.soDienThoai,
            noiDung: `[Tư vấn áo mẫu] Sản phẩm: ${consultForm.tenSanPham}${consultForm.soLuong ? ` | Số lượng: ${consultForm.soLuong}` : ''}`
        }

        // Add timeout to fetch (30 seconds)
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000)

        const promise = fetch('/api/yeu-cau-tu-van', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
        })
            .then(res => {
                clearTimeout(timeoutId)
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
                }
                return res.json().catch(() => ({}))
            })
            .catch(err => {
                clearTimeout(timeoutId)
                if (err.name === 'AbortError') {
                    throw new Error('Yêu cầu hết thời gian chờ (30s). Vui lòng kiểm tra kết nối và thử lại.')
                }
                throw err
            })

        sileo.promise(promise, {
            loading: { title: 'Đang gửi...', description: 'Đang gửi yêu cầu tư vấn của bạn.' },
            success: () => {
                setConsultLoading(false)
                setShowConsultModal(false)
                setConsultForm({ tenSanPham: '', hoTen: '', soDienThoai: '', soLuong: '' })
                setConsultSuccess(true)
                setConsultErrors({})
                return {
                    title: 'Gửi thành công!',
                    description: 'Chúng tôi sẽ liên hệ sớm nhất có thể.'
                }
            },
            error: (err) => {
                setConsultLoading(false)
                const errorMsg = err.message || 'Không thể gửi yêu cầu. Vui lòng thử lại.'
                setConsultErrors({ submit: errorMsg })
                return {
                    title: 'Lỗi',
                    description: errorMsg
                }
            }
        })
    }

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current
            let scrollTo
            if (direction === 'left') {
                scrollTo = scrollLeft <= 10 ? scrollWidth - clientWidth : scrollLeft - clientWidth
            } else {
                scrollTo = scrollLeft + clientWidth + 10 >= scrollWidth ? 0 : scrollLeft + clientWidth
            }
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }

    // Autoplay logic
    useEffect(() => {
        if (related.length > 0 && !isHovered) {
            const interval = setInterval(() => {
                scroll('right')
            }, 4000)
            return () => clearInterval(interval)
        }
    }, [related, isHovered])

    // Lấy dữ liệu sản phẩm chi tiết
    useEffect(() => {
        setLoading(true)
        fetch(`/api/san-pham/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error('Product not found')
                return res.json()
            })
            .then(data => {
                setProduct(data)
                setLoading(false)
                setActiveImg(0)
                setSelectedSize(null)
                setSelectedColor(null)
                if (data.danhMuc?.slug) {
                    fetch(`/api/san-pham?categorySlug=${data.danhMuc.slug}&size=16&sort=newest`)
                        .then(r => r.json())
                        .then(relData => {
                            // Lọc bỏ chính sản phẩm hiện tại
                            let filtered = (relData.sanPham || []).filter(p => p.slug !== slug)
                            // Nếu không đủ 8 sản phẩm, lấy thêm từ các danh mục khác
                            if (filtered.length < 8) {
                                fetch(`/api/san-pham?size=${16 - filtered.length}&sort=newest`)
                                    .then(r => r.json())
                                    .then(otherData => {
                                        const others = (otherData.sanPham || []).filter(p => p.slug !== slug && !filtered.find(f => f.slug === p.slug))
                                        setRelated([...filtered, ...others].slice(0, 8))
                                    })
                                    .catch(() => setRelated(filtered))
                            } else {
                                setRelated(filtered.slice(0, 8))
                            }
                        })
                        .catch(() => setRelated([]))
                }
            })
            .catch(err => {
                console.error("Lỗi khi tải chi tiết sản phẩm:", err)
                setProduct(null)
                setLoading(false)
            })
    }, [slug])

    // Tăng lượt xem sản phẩm (chống view ảo bằng sessionStorage)
    useEffect(() => {
        if (product && product.sanPhamId) {
            const viewedKey = `viewed_sp_${product.sanPhamId}`;
            const hasViewed = sessionStorage.getItem(viewedKey);

            if (!hasViewed) {
                fetch(`/api/san-pham/${product.sanPhamId}/view`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(() => {
                        sessionStorage.setItem(viewedKey, 'true');
                    })
                    .catch(err => console.error("Lỗi khi tăng lượt xem:", err));
            }
        }
    }, [product])

    if (loading) {
        return (
            <div className="min-h-screen bg-carbon-black-50 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-brown-bark-200 border-t-brown-bark-800 rounded-full animate-spin"></div>
                <p className="text-carbon-black-400 font-medium">Đang tải thông tin sản phẩm...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-carbon-black-50 flex flex-col items-center justify-center gap-4 text-center px-4">
                <div className="p-6 bg-white rounded-3xl shadow-sm border border-carbon-black-100 max-w-sm w-full">
                    <p className="text-xl font-bold text-carbon-black-800 mb-2">Không tìm thấy sản phẩm</p>
                    <p className="text-sm text-carbon-black-500 mb-6">Sản phẩm này có thể đã ngừng kinh doanh hoặc đường dẫn không chính xác.</p>
                    <Link to="/san-pham" className="inline-block w-full py-3 bg-brown-bark-800 text-golden-earth-50 rounded-xl font-bold text-sm tracking-wide transition-transform hover:scale-[1.02]">
                        Quay lại cửa hàng
                    </Link>
                </div>
            </div>
        )
    }

    // Map dữ liệu từ backend SanPham entity
    const name = product.tenSanPham
    const price = product.giaBan
    const discountPrice = product.giaKhuyenMai
    const description = product.moTa
    const images = product.hinhAnh ? product.hinhAnh.map(img => img.urlAnh) : []
    const categoryName = product.danhMuc ? product.danhMuc.tenDanhMuc : 'Đang cập nhật'

    // Xử lý các biến thể (bienThe) để lấy danh sách Size và Màu sắc duy nhất
    const sizeOptions = product.bienThe ? Array.from(new Set(product.bienThe.map(b => b.size).filter(Boolean))) : []
    const colorOptions = product.bienThe ? Array.from(new Set(product.bienThe.map(b => b.mauSac).filter(Boolean))) : []

    const formattedPrice = Number(price ?? 0).toLocaleString('vi-VN')
    const formattedDiscount = discountPrice ? Number(discountPrice).toLocaleString('vi-VN') : null

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6 pb-2">
                <motion.button
                    onClick={() => navigate(-1)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-brown-bark-700 bg-golden-earth-50 hover:bg-golden-earth-100 rounded-lg transition-colors duration-200"
                    aria-label="Quay lại"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Quay lại
                </motion.button>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ── Left: Main Image & Content (Col 7) ── */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Thumbnail strip */}
                            {images.length > 1 && (
                                <div className="hidden sm:flex flex-col gap-2.5 w-20 shrink-0">
                                    {images.map((img, i) => (
                                        <motion.button
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ ...springSmooth, delay: i * 0.06 }}
                                            onClick={() => {
                                                setImgDirection(i > activeImg ? 1 : -1)
                                                setActiveImg(i)
                                            }}
                                            whileHover={{ scale: 1.08, y: -2 }}
                                            whileTap={{ scale: 0.92 }}
                                            className={`w-full aspect-3/4 rounded-xl overflow-hidden border-2 bg-white transition-all duration-300 ${activeImg === i
                                                ? 'border-brown-bark-600 shadow-lg ring-2 ring-brown-bark-200/60 brightness-100'
                                                : 'border-carbon-black-100 hover:border-carbon-black-300 brightness-[0.85] hover:brightness-100'
                                                }`}
                                        >
                                            <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* Main image container */}
                            <div
                                className="flex-1 relative rounded-2xl overflow-hidden bg-white shadow-sm border border-carbon-black-100 cursor-zoom-in group"
                                onClick={() => setIsLightboxOpen(true)}
                                style={{ perspective: '1200px' }}
                            >
                                <div className="aspect-3/4 w-full overflow-hidden relative">
                                    <AnimatePresence initial={false} mode="popLayout" custom={imgDirection}>
                                        <motion.img
                                            key={activeImg}
                                            src={images[activeImg] || ''}
                                            alt={name}
                                            custom={imgDirection}
                                            variants={imageSlideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ ...springSmooth, filter: { duration: 0.35 } }}
                                            className="w-full h-full object-cover absolute inset-0"
                                            style={{ transformStyle: 'preserve-3d' }}
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Hover zoom overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-[5]"
                                />

                                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                                    {product.isNew && (
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={springBouncy}
                                            className="bg-[#303187] text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-lg shadow-sm"
                                        >
                                            Mới
                                        </motion.span>
                                    )}
                                </div>

                                {/* Image counter - pill style */}
                                {images.length > 1 && (
                                    <motion.div
                                        key={activeImg}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={springSmooth}
                                        className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3.5 py-2 rounded-full"
                                    >
                                        <span className="text-white/90">{activeImg + 1}</span>
                                        <span className="w-4 h-[1.5px] bg-white/30 rounded-full overflow-hidden">
                                            <motion.span
                                                className="block h-full bg-white rounded-full"
                                                initial={{ width: '0%' }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                            />
                                        </span>
                                        <span className="text-white/50">{images.length}</span>
                                    </motion.div>
                                )}

                                {/* Expand icon */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileHover={{ scale: 1.15 }}
                                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-carbon-black-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg"
                                >
                                    <svg className="w-5 h-5 text-carbon-black-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                </motion.div>
                            </div>
                        </div>

                        {/* Tabs content area */}
                        <ProductDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} description={description} />
                    </div>

                    {/* ── Right: Sticky Product Info (Col 5) ── */}
                    <div className="lg:col-span-5 sticky top-24 self-start space-y-6">
                        <div className="bg-white rounded-3xl p-6 border border-carbon-black-100 shadow-sm space-y-6">
                            {/* Header Info */}
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-carbon-black-900 leading-tight mb-3">
                                    {product.tenSanPham}
                                </h1>
                            </div>

                            {/* Price Section */}
                            <div className="bg-carbon-black-50/50 rounded-2xl p-4 border border-carbon-black-100">
                                <p className="text-xs font-bold text-carbon-black-500 uppercase tracking-[0.15em] mb-1">Giá dự kiến từ</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-bold text-brown-bark-900">
                                        {formattedDiscount || formattedPrice}
                                        <span className="text-base font-bold ml-1">₫</span>
                                    </p>
                                    {formattedDiscount && <p className="text-sm text-carbon-black-400 line-through">{formattedPrice}₫</p>}
                                </div>
                                <p className="text-xs text-carbon-black-500 mt-2 font-medium">Lưu ý: Giá có thể thay đổi tùy theo số lượng và chất liệu.</p>
                            </div>

                            {/* Promotion Box - Style Hải Anh */}
                            <div className="bg-[#fdfdf7] border-2 border-[#ffd776] rounded-2xl overflow-hidden shadow-sm">
                                <div className="bg-[#ffd776] px-4 py-2 flex items-center gap-2">
                                    <img src="https://dongphuchaianh.vn/wp-content/uploads/2025/06/icon-gift.png" className="w-5 h-5" alt="gift" />
                                    <span className="text-xs font-bold text-carbon-black-900 uppercase">Ưu đãi khi đặt hàng</span>
                                </div>
                                <div className="p-4 space-y-3">
                                    {[
                                        'Thiết kế miễn phí logo & kiểu dáng',
                                        'Vải cao cấp giá gốc tại xưởng',
                                        'Giao hàng toàn quốc miễn phí',
                                        'Bảo hành 12 tháng đường may'
                                    ].map((txt, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <div className="w-4 h-4 rounded-full bg-brown-bark-700 flex items-center justify-center shrink-0 mt-0.5">
                                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-semibold text-carbon-black-700">{txt}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Variants Selection */}
                            <div className="space-y-5">
                                {/* {colorOptions.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold text-carbon-black-500 uppercase tracking-widest mb-3">Màu sắc khả dụng</p>
                                        <div className="flex flex-wrap gap-2">
                                            {colorOptions.map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => setSelectedColor(c)}
                                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${selectedColor === c
                                                        ? 'bg-[#ffd776] text-carbon-black-900 border-[#ffd776] shadow-lg scale-105 z-10'
                                                        : 'bg-white border-carbon-black-100 text-carbon-black-600 hover:border-[#ffd776] hover:bg-[#fff9e6] hover:text-carbon-black-900'}`}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )} */}

                                {sizeOptions.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-xs font-bold text-carbon-black-500 uppercase tracking-widest">Kích cỡ (Size)</p>
                                            <button className="text-xs font-bold text-brown-bark-700 underline">Bảng size</button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {sizeOptions.map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => setSelectedSize(s)}
                                                    className={`w-14 h-14 rounded-xl text-sm font-bold transition-all border-2 ${selectedSize === s
                                                        ? 'bg-[#ffd776] text-carbon-black-900 border-[#ffd776] shadow-lg scale-105 z-10'
                                                        : 'bg-white border-carbon-black-100 text-carbon-black-600 hover:border-[#ffd776] hover:bg-[#fff9e6] hover:text-carbon-black-900'}`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CTA Buttons - Style Hải Anh */}
                            <div className="pt-4 space-y-3">
                                <a
                                    href="https://zalo.me/0901234567"
                                    target="_blank" rel="noreferrer"
                                    className="flex items-center justify-center gap-3 w-full bg-[#197cfe] hover:bg-[#156cdb] text-white rounded-2xl py-4 shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.02]"
                                >
                                    <img src="https://dongphuchaianh.vn/wp-content/uploads/2021/05/icon_zalo-400x400.png" className="w-6 h-6 rounded-lg" alt="zalo" />
                                    <div className="text-left">
                                        <p className="text-sm font-bold uppercase tracking-wide leading-tight">Tư vấn ngay</p>
                                        <p className="text-xs opacity-90 font-medium">Báo giá siêu tốc trong 5s</p>
                                    </div>
                                </a>
                                <button
                                    onClick={openConsultModal}
                                    className="flex flex-col items-center justify-center w-full bg-white border-2 border-[#9b7b31] hover:bg-[#9b7b31] text-[#9b7b31] hover:text-white rounded-2xl py-3.5 transition-all hover:scale-[1.02] shadow-sm hover:shadow-md"
                                >
                                    <p className="text-sm font-bold uppercase tracking-wide leading-tight">Tư vấn áo mẫu</p>
                                    <p className="text-xs font-medium opacity-80">Gửi mẫu tận nơi hoàn toàn miễn phí</p>
                                </button>
                            </div>
                        </div>

                        {/* Specs Table */}
                        <div className="bg-white rounded-3xl p-6 border border-carbon-black-100 shadow-sm">
                            <p className="text-xs font-bold text-carbon-black-500 uppercase tracking-widest mb-4">Thông số kỹ thuật</p>
                            <div className="space-y-4">
                                {[
                                    { label: 'Thương hiệu', value: product.thuongHieu },
                                    { label: 'Chất liệu', value: product.chatLieu },
                                    { label: 'Xuất xứ', value: product.xuatXu },
                                    { label: 'Đơn vị tính', value: product.donViTinh },
                                ].map((spec, i) => spec.value && (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <span className="text-carbon-black-400 font-medium">{spec.label}</span>
                                        <span className="text-carbon-black-900 font-bold">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Related Products ── */}
                {related.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-end justify-between mb-6">
                            <div>
                                <p className="text-[10px] font-bold text-brown-bark-700 tracking-[0.18em] uppercase mb-1">Gợi ý</p>
                                <h2 className="text-2xl font-bold text-carbon-black-900 tracking-tight">Sản phẩm liên quan</h2>
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

                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {related.map((p) => (
                                <motion.div
                                    key={p.slug}
                                    onClick={() => navigate(`/san-pham/${p.slug}`)}
                                    className="cursor-pointer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <ProductCard product={p} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox / Zoom Overlay */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10"
                        onClick={() => setIsLightboxOpen(false)}
                        style={{ perspective: '1400px' }}
                    >
                        {/* Close button */}
                        <motion.button
                            initial={{ opacity: 0, y: -20, rotate: -90 }}
                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                            exit={{ opacity: 0, y: -20, rotate: 90 }}
                            transition={{ ...springBouncy, delay: 0.15 }}
                            whileHover={{ scale: 1.15, rotate: 90, backgroundColor: 'rgba(255,255,255,0.2)' }}
                            whileTap={{ scale: 0.85 }}
                            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white transition-colors z-[110]"
                            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* Image counter top-left */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ ...springSmooth, delay: 0.2 }}
                            className="absolute top-7 left-6 z-[110] flex items-center gap-3"
                        >
                            <div className="text-white/70 text-sm font-bold tracking-wider">
                                <span className="text-white text-lg">{activeImg + 1}</span>
                                <span className="mx-1.5 text-white/30">/</span>
                                <span>{images.length}</span>
                            </div>
                            {/* Mini progress bar */}
                            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white/80 rounded-full"
                                    animate={{ width: `${((activeImg + 1) / images.length) * 100}%` }}
                                    transition={{ ...springSmooth }}
                                />
                            </div>
                        </motion.div>

                        <div
                            className="relative max-w-5xl w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AnimatePresence initial={false} mode="popLayout" custom={imgDirection}>
                                <motion.img
                                    key={activeImg}
                                    src={images[activeImg]}
                                    alt={name}
                                    custom={imgDirection}
                                    variants={lightboxImgVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ ...springGentle, filter: { duration: 0.3 } }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.12}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipeThreshold = 50
                                        if (offset.x < -swipeThreshold || velocity.x < -500) {
                                            setImgDirection(1)
                                            setActiveImg((i) => (i + 1) % images.length)
                                        } else if (offset.x > swipeThreshold || velocity.x > 500) {
                                            setImgDirection(-1)
                                            setActiveImg((i) => (i - 1 + images.length) % images.length)
                                        }
                                    }}
                                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl absolute cursor-grab active:cursor-grabbing select-none"
                                    style={{ transformStyle: 'preserve-3d' }}
                                />
                            </AnimatePresence>

                            {images.length > 1 && (
                                <>
                                    <motion.button
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ ...springSmooth, delay: 0.1 }}
                                        whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.25)' }}
                                        whileTap={{ scale: 0.85, x: -5 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImgDirection(-1)
                                            setActiveImg((i) => (i - 1 + images.length) % images.length);
                                        }}
                                        className="absolute left-4 sm:left-0 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/10"
                                    >
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </motion.button>
                                    <motion.button
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 30 }}
                                        transition={{ ...springSmooth, delay: 0.1 }}
                                        whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.25)' }}
                                        whileTap={{ scale: 0.85, x: 5 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImgDirection(1)
                                            setActiveImg((i) => (i + 1) % images.length);
                                        }}
                                        className="absolute right-4 sm:right-0 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/10"
                                    >
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </motion.button>
                                </>
                            )}

                            {/* Bottom thumbnail strip in lightbox */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                transition={{ ...springSmooth, delay: 0.2 }}
                                className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4"
                            >
                                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-3 py-2">
                                    {images.map((img, i) => (
                                        <motion.button
                                            key={i}
                                            onClick={() => {
                                                setImgDirection(i > activeImg ? 1 : -1)
                                                setActiveImg(i)
                                            }}
                                            className={`rounded-full overflow-hidden border-2 transition-all duration-300 ${activeImg === i
                                                ? 'border-white shadow-lg shadow-white/20'
                                                : 'border-transparent opacity-50 hover:opacity-80'
                                                }`}
                                            animate={{
                                                width: activeImg === i ? 40 : 28,
                                                height: activeImg === i ? 40 : 28,
                                            }}
                                            transition={springSmooth}
                                            whileHover={{ opacity: 1, scale: 1.1 }}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Consultation Modal ── */}
            {showConsultModal && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={() => setShowConsultModal(false)}
                >
                    <div
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 flex flex-col sm:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* ── Left: Product Image + Name ── */}
                        <div className="sm:w-48 shrink-0 bg-carbon-black-50 border-r border-carbon-black-100 flex flex-col items-center justify-center p-6 gap-4">
                            <div className="w-32 h-40 rounded-xl overflow-hidden shadow-sm shrink-0 border border-carbon-black-100">
                                <img
                                    src={images[activeImg] || ''}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="text-center space-y-1">
                                <p className="text-[10px] font-bold text-carbon-black-400 uppercase tracking-widest">Sản phẩm</p>
                                <p className="text-sm font-bold text-carbon-black-800 leading-snug line-clamp-3">{name}</p>
                                {(formattedDiscount || formattedPrice) && (
                                    <p className="text-xs font-bold text-brown-bark-700 pt-0.5">
                                        Từ {formattedDiscount || formattedPrice}₫
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 border border-emerald-200 bg-emerald-50 rounded-full px-3 py-1">
                                <CheckCircle size={11} className="text-emerald-500 shrink-0" />
                                <span className="text-[10px] font-semibold text-emerald-700">Gửi mẫu miễn phí</span>
                            </div>
                        </div>

                        {/* ── Right: Form ── */}
                        <div className="flex-1 flex flex-col min-w-0">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-carbon-black-100">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-carbon-black-400">Đăng ký nhận</p>
                                    <h3 className="text-base font-bold text-carbon-black-900 mt-0.5">Tư vấn áo mẫu miễn phí</h3>
                                </div>
                                <button
                                    onClick={() => setShowConsultModal(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-carbon-black-100 text-carbon-black-400 transition-colors shrink-0"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {consultSuccess ? (
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3">
                                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <CheckCircle className="w-7 h-7 text-emerald-600" />
                                    </div>
                                    <h4 className="text-base font-bold text-carbon-black-900">Gửi yêu cầu thành công!</h4>
                                    <p className="text-sm text-carbon-black-500 max-w-xs">Đội ngũ tư vấn sẽ liên hệ bạn trong thời gian sớm nhất.</p>
                                    <button
                                        onClick={() => setShowConsultModal(false)}
                                        className="mt-2 px-6 py-2.5 bg-carbon-black-900 text-white rounded-xl text-sm font-bold hover:bg-carbon-black-800 transition-colors"
                                    >
                                        Đóng
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleConsultSubmit} className="flex-1 p-5 space-y-4">
                                    {/* Họ tên */}
                                    <div>
                                        <label className="block text-xs font-semibold text-carbon-black-600 mb-1.5">
                                            Họ và Tên <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={consultForm.hoTen}
                                            onChange={(e) => setConsultForm(f => ({ ...f, hoTen: e.target.value }))}
                                            className={`w-full h-11 rounded-xl border px-4 text-sm text-carbon-black-900 outline-none transition-colors placeholder:text-carbon-black-300 ${consultErrors.hoTen ? 'border-red-400 bg-red-50/50' : 'border-carbon-black-200 bg-carbon-black-50/50 focus:bg-white focus:border-carbon-black-400'}`}
                                            placeholder="Họ và tên đầy đủ"
                                        />
                                        {consultErrors.hoTen && <p className="text-xs text-red-500 mt-1">{consultErrors.hoTen}</p>}
                                    </div>

                                    {/* Số điện thoại */}
                                    <div>
                                        <label className="block text-xs font-semibold text-carbon-black-600 mb-1.5">
                                            Số điện thoại <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            inputMode="tel"
                                            value={consultForm.soDienThoai}
                                            onChange={(e) => setConsultForm(f => ({ ...f, soDienThoai: e.target.value }))}
                                            className={`w-full h-11 rounded-xl border px-4 text-sm text-carbon-black-900 outline-none transition-colors placeholder:text-carbon-black-300 ${consultErrors.soDienThoai ? 'border-red-400 bg-red-50/50' : 'border-carbon-black-200 bg-carbon-black-50/50 focus:bg-white focus:border-carbon-black-400'}`}
                                            placeholder="Số điện thoại"
                                        />
                                        {consultErrors.soDienThoai && <p className="text-xs text-red-500 mt-1">{consultErrors.soDienThoai}</p>}
                                    </div>

                                    {/* Số lượng */}
                                    <div>
                                        <label className="block text-xs font-semibold text-carbon-black-600 mb-1.5">
                                            Số lượng cần báo
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={consultForm.soLuong}
                                            onChange={(e) => setConsultForm(f => ({ ...f, soLuong: e.target.value }))}
                                            className="w-full h-11 rounded-xl border border-carbon-black-200 bg-carbon-black-50/50 focus:bg-white focus:border-carbon-black-400 px-4 text-sm text-carbon-black-900 outline-none transition-colors placeholder:text-carbon-black-300"
                                            placeholder="Số lượng cần báo"
                                        />
                                    </div>

                                    {consultErrors.submit && (
                                        <p className="text-xs text-red-500 text-center bg-red-50 rounded-lg py-2">{consultErrors.submit}</p>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={consultLoading}
                                        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3.5 text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {consultLoading && <Loader2 size={15} className="animate-spin" />}
                                        {consultLoading ? 'Đang gửi...' : 'Nhận tư vấn'}
                                    </button>

                                    <p className="text-[10px] text-carbon-black-400 text-center pb-1">
                                        Bằng việc gửi thông tin, bạn đồng ý để chúng tôi liên hệ tư vấn.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
