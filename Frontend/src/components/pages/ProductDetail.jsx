import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import Title from '../common/Title'
import { Factory, Truck, CheckCircle } from "lucide-react"

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
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [qty, setQty] = useState(1)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('description')

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
                    fetch(`/api/san-pham?categorySlug=${data.danhMuc.slug}&size=5&sort=newest`)
                        .then(r => r.json())
                        .then(relData => {
                            // Lọc bỏ chính sản phẩm hiện tại
                            setRelated((relData.sanPham || []).filter(p => p.slug !== slug))
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
                                        <button
                                            key={i}
                                            onClick={() => setActiveImg(i)}
                                            className={`w-full aspect-3/4 rounded-xl overflow-hidden border-2 bg-white transition-all duration-200 ${activeImg === i
                                                ? 'border-brown-bark-600 shadow-md'
                                                : 'border-carbon-black-100 hover:border-carbon-black-300'
                                                }`}
                                        >
                                            <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Main image container */}
                            <div 
                                className="flex-1 relative rounded-2xl overflow-hidden bg-white shadow-sm border border-carbon-black-100 cursor-zoom-in group"
                                onClick={() => setIsLightboxOpen(true)}
                            >
                                <div className="aspect-3/4 w-full overflow-hidden">
                                    <img
                                        key={activeImg}
                                        src={images[activeImg] || ''}
                                        alt={name}
                                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.isNew && (
                                        <span className="bg-[#303187] text-white text-xs font-black tracking-widest uppercase px-3 py-1 rounded-lg shadow-sm">Mới</span>
                                    )}
                                </div>
                                {/* Expand icon */}
                                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-carbon-black-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-5 h-5 text-carbon-black-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Tabs content area */}
                        <div className="bg-white rounded-3xl border border-carbon-black-100 overflow-hidden shadow-sm">
                            <div className="flex border-b border-carbon-black-100 bg-carbon-black-50/50">
                                {[
                                    { id: 'description', label: 'Mô tả chi tiết' },
                                    { id: 'diff', label: 'Điểm khác biệt' },
                                    { id: 'process', label: 'Quy trình đặt hàng' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab.id 
                                            ? 'text-brown-bark-800 bg-white' 
                                            : 'text-carbon-black-400 hover:text-carbon-black-600'}`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-brown-bark-700" />}
                                    </button>
                                ))}
                            </div>
                            <div className="p-8">
                                {activeTab === 'description' && (
                                    <div className="prose prose-sm max-w-none text-carbon-black-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
                                )}
                                {activeTab === 'diff' && (
                                    <div className="space-y-12">
                                        <div className="text-center">
                                            <h3 className="text-xl font-black text-brown-bark-900 uppercase tracking-tight mb-2">Điểm khác biệt tại Minh Anh</h3>
                                            <p className="text-xs text-carbon-black-500 font-medium">Chúng tôi không chỉ bán áo, chúng tôi mang lại niềm kiêu hãnh cho tập thể của bạn</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {[
                                                { 
                                                    title: 'Chất vải cao cấp', 
                                                    desc: 'Sợi vải ngoại nhập 100% cotton, co giãn 4 chiều, thấm hút mồ hôi cực tốt.',
                                                    icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                                },
                                                { 
                                                    title: 'Kỹ thuật may tinh xảo', 
                                                    desc: 'Đường kim mũi chỉ được thực hiện bởi thợ lành nghề, 100% sản phẩm được kiểm tra trước khi xuất xưởng.',
                                                    icon: <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z" />
                                                },
                                                { 
                                                    title: 'Công nghệ in tân tiến', 
                                                    desc: 'Sử dụng mực in nhập khẩu Hàn Quốc, không bong tróc, sắc nét, bền màu tuyệt đối.',
                                                    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                                },
                                                { 
                                                    title: 'Thiết kế độc quyền', 
                                                    desc: 'Đội ngũ thiết kế trẻ trung, sáng tạo, miễn phí lên market theo yêu cầu khách hàng.',
                                                    icon: <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-1.5M14 11l-1.5-1.5M10 9l-1.5-1.5" />
                                                }
                                            ].map((item, i) => (
                                                <div key={i} className="group relative bg-[#fdfdf7] border border-[#ffd776]/50 rounded-3xl p-6 transition-all hover:shadow-xl hover:-translate-y-2 overflow-hidden">
                                                    {/* Background decorative number */}
                                                    <div className="absolute -bottom-4 -right-2 text-7xl font-black text-[#ffd776]/20 group-hover:text-[#ffd776]/40 transition-colors pointer-events-none">
                                                        {i + 1}
                                                    </div>
                                                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#ffd776] flex items-center justify-center text-[#c29a3d] mb-6 group-hover:bg-[#ffd776] group-hover:text-carbon-black-900 transition-all duration-300">
                                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                            {item.icon}
                                                        </svg>
                                                    </div>
                                                    <h4 className="text-lg font-black text-carbon-black-800 mb-3 group-hover:text-[#c29a3d] transition-colors uppercase tracking-tighter leading-tight">{item.title}</h4>
                                                    <p className="text-xs text-carbon-black-600 leading-relaxed font-medium line-clamp-4">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'process' && (
                                    <div className="space-y-12">
                                        <div className="text-center">
                                            <h3 className="text-xl font-black text-brown-bark-900 uppercase tracking-tight mb-2">Quy trình đặt may chuyên nghiệp</h3>
                                            <p className="text-xs text-carbon-black-500 font-medium">Quy trình 5 bước đảm bảo chất lượng tuyệt đối cho từng sản phẩm</p>
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-between gap-10 relative">
                                            {[
                                                { step: '01', label: 'Tư vấn - Báo giá', icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /> },
                                                { step: '02', label: 'Lên Market sản phẩm', icon: <path d="M4 19h16l-1-7h-14l-1 7zM9 19v2M15 19v2M3 19h18M5 12V6a2 2 0 012-2h10a2 2 0 012 2v6" /> },
                                                { step: '03', label: 'Chốt mẫu', icon: <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /> },
                                                { step: '04', label: 'Ký hợp đồng', icon: <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 11-8 0 4 4 0 018 0zm10 0a4 4 0 11-8 0 4 4 0 018 0zm1 14v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" /> }, // Substitute for handshake
                                                { step: '05', label: 'Sản xuất', icon: <path d="M2 20a2 2 0 002 2h16a2 2 0 002-2V8l-7 5V8l-7 5V4a2 2 0 00-2-2H4a2 2 0 00-2 2z" /> }
                                            ].map((item, i) => (
                                                <div key={i} className="flex-1 flex flex-col items-center group">
                                                    <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                                                        {/* Step number on top left */}
                                                        <div className="absolute -top-1 -left-2 z-10">
                                                            <p className="text-[10px] font-black text-brown-bark-300 uppercase tracking-tighter leading-none mb-1">Bước</p>
                                                            <p className={`text-4xl font-black italic leading-none transition-colors ${i === 0 ? 'text-blue-500' : 'text-blue-400'}`}>{i + 1}</p>
                                                        </div>
                                                        {/* Circular border wrapper */}
                                                        <div className="absolute inset-0 border-[3px] border-blue-400 rounded-full border-t-transparent -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-500 transition-transform group-hover:scale-110">
                                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                                {item.icon}
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm font-black text-carbon-black-800 uppercase tracking-tighter text-center leading-tight group-hover:text-blue-600 transition-colors">{item.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Sticky Product Info (Col 5) ── */}
                    <div className="lg:col-span-5 sticky top-24 self-start space-y-6">
                        <div className="bg-white rounded-3xl p-6 border border-carbon-black-100 shadow-sm space-y-6">
                            {/* Header Info */}
                            <div>
                                <h1 className="text-2xl font-black text-carbon-black-900 leading-tight mb-2">{name}</h1>
                            </div>

                            {/* Price Section */}
                            <div className="bg-carbon-black-50/50 rounded-2xl p-4 border border-carbon-black-100">
                                <p className="text-xs font-black text-carbon-black-500 uppercase tracking-[0.15em] mb-1">Giá dự kiến từ</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-black text-brown-bark-900">
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
                                    <span className="text-xs font-black text-carbon-black-900 uppercase">Ưu đãi khi đặt hàng</span>
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
                                {colorOptions.length > 0 && (
                                    <div>
                                        <p className="text-xs font-black text-carbon-black-500 uppercase tracking-widest mb-3">Màu sắc khả dụng</p>
                                        <div className="flex flex-wrap gap-2">
                                            {colorOptions.map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => setSelectedColor(c)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${selectedColor === c ? 'bg-brown-bark-900 text-white border-brown-bark-900 shadow-md' : 'bg-white border-carbon-black-200 text-carbon-black-700 hover:border-brown-bark-400'}`}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {sizeOptions.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-xs font-black text-carbon-black-500 uppercase tracking-widest">Kích cỡ (Size)</p>
                                            <button className="text-xs font-bold text-brown-bark-700 underline">Bảng size</button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {sizeOptions.map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => setSelectedSize(s)}
                                                    className={`w-12 h-12 rounded-lg text-sm font-bold transition-all border ${selectedSize === s ? 'bg-brown-bark-900 text-white border-brown-bark-900 shadow-md' : 'bg-white border-carbon-black-200 text-carbon-black-700 hover:border-brown-bark-400'}`}
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
                                        <p className="text-sm font-black uppercase tracking-wide leading-tight">Tư vấn ngay</p>
                                        <p className="text-xs opacity-90 font-medium">Báo giá siêu tốc trong 5s</p>
                                    </div>
                                </a>
                                <button
                                    className="flex flex-col items-center justify-center w-full bg-white border-2 border-[#9b7b31] hover:bg-[#9b7b31] text-[#9b7b31] hover:text-white rounded-2xl py-3.5 transition-all hover:scale-[1.02] shadow-sm hover:shadow-md"
                                >
                                    <p className="text-sm font-black uppercase tracking-wide leading-tight">Đặt áo mẫu</p>
                                    <p className="text-xs font-medium opacity-80">Gửi mẫu tận nơi hoàn toàn miễn phí</p>
                                </button>
                            </div>
                        </div>

                        {/* Specs Table */}
                        <div className="bg-white rounded-3xl p-6 border border-carbon-black-100 shadow-sm">
                            <p className="text-xs font-black text-carbon-black-500 uppercase tracking-widest mb-4">Thông số kỹ thuật</p>
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
                                    key={p.slug}
                                    onClick={() => navigate(`/san-pham/${p.slug}`)}
                                    className="cursor-pointer"
                                >
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox / Zoom Overlay */}
            {isLightboxOpen && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <button 
                        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110]"
                        onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div 
                        className="relative max-w-5xl w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={images[activeImg]} 
                            alt={name}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImg((i) => (i - 1 + images.length) % images.length);
                                    }}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
                                >
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImg((i) => (i + 1) % images.length);
                                    }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
                                >
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                             {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${activeImg === i ? 'bg-white w-6' : 'bg-white/40'}`}
                                />
                             ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
