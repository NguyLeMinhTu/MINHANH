import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import NewProductsWidget from '../news/NewProductsWidget'

const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// ====== Related Post Card ======
const RelatedCard = ({ post }) => (
    <Link to={`/tin-tuc/${post.slug}`} className="group block">
        <div className="overflow-hidden rounded-xl mb-2 bg-carbon-black-50 aspect-[4/3]">
            {post.anhDaiDien ? (
                <img src={post.anhDaiDien} alt={post.tieuDe}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-carbon-black-300">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                    </svg>
                </div>
            )}
        </div>
        <h4 className="text-xs font-semibold text-carbon-black-800 group-hover:text-brown-bark-700 line-clamp-2 leading-snug transition-colors">
            {post.tieuDe}
        </h4>
        <p className="text-[10px] text-carbon-black-400 mt-0.5">{formatDate(post.ngayDang)}</p>
    </Link>
)

// ====== Skeleton ======
const Skeleton = () => (
    <main className="max-w-6xl mx-auto px-3 lg:px-4 py-10 animate-pulse">
        <div className="flex gap-6">
            <div className="flex-1 space-y-4">
                <div className="h-7 bg-carbon-black-100 rounded w-3/4" />
                <div className="h-4 bg-carbon-black-100 rounded w-1/3" />
                <div className="h-64 bg-carbon-black-100 rounded-2xl" />
                {[...Array(5)].map((_, i) => <div key={i} className="h-4 bg-carbon-black-100 rounded" />)}
            </div>
            <div className="hidden lg:block w-[260px] shrink-0">
                <div className="h-48 bg-carbon-black-100 rounded-2xl" />
            </div>
        </div>
    </main>
)

const NewsDetail = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [related, setRelated] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setLoading(true); setError(false); setRelated([])
        fetch(`/api/bai-viet/${slug}`)
            .then(r => { if (!r.ok) throw new Error(); return r.json() })
            .then(data => {
                setPost(data)
                // Fetch related
                fetch(`/api/bai-viet/${slug}/related?size=4`)
                    .then(r => r.json()).then(setRelated).catch(() => { })
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [slug])

    useEffect(() => {
        fetch('/api/danh-muc-bai-viet')
            .then(r => r.json())
            .then(data => setCategories(Array.isArray(data) ? data.filter(c => c.trangThai) : []))
            .catch(() => { })
    }, [])

    if (loading) return <Skeleton />

    if (error || !post) return (
        <main className="max-w-6xl mx-auto px-3 lg:px-4 py-20 text-center">
            <p className="text-4xl mb-4">📰</p>
            <h2 className="text-xl font-bold text-carbon-black-800 mb-2">Không tìm thấy bài viết</h2>
            <p className="text-sm text-carbon-black-500 mb-6">Bài viết không tồn tại hoặc đã bị xoá.</p>
            <Link to="/tin-tuc" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brown-bark-800 text-white rounded-xl text-sm font-semibold hover:bg-brown-bark-700 transition-colors">
                ← Quay lại Tin tức
            </Link>
        </main>
    )

    return (
        <main className="max-w-6xl mx-auto px-3 lg:px-4 py-8">
            {/* Back Button */}
            <motion.button
                onClick={() => navigate(-1)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-brown-bark-700 bg-golden-earth-50 hover:bg-golden-earth-100 rounded-lg transition-colors duration-200 mb-6"
                aria-label="Quay l\u1ea1i"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Quay l\u1ea1i
            </motion.button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-carbon-black-400 mb-6 flex-wrap">
                <Link to="/" className="hover:text-brown-bark-700 transition-colors">Trang chủ</Link>
                <span>/</span>
                <Link to="/tin-tuc" className="hover:text-brown-bark-700 transition-colors">Tin tức</Link>
                {post.danhMuc && <>
                    <span>/</span>
                    <Link to={`/tin-tuc?dm=${post.danhMuc.slug}`} className="hover:text-brown-bark-700 transition-colors">{post.danhMuc.tenDanhMuc}</Link>
                </>}
                <span>/</span>
                <span className="text-carbon-black-600 line-clamp-1 max-w-[200px]">{post.tieuDe}</span>
            </nav>

            <div className="flex gap-6 items-start">
                {/* ===== Bài viết ===== */}
                <article className="flex-1 min-w-0 bg-white rounded-2xl border border-carbon-black-100 overflow-hidden shadow-sm">
                    <div className="p-5 lg:p-8">
                        {/* Entry Header */}
                        <header className="mb-6">
                            <h1 className="text-2xl lg:text-3xl font-bold text-carbon-black-900 leading-tight mb-3">
                                {post.tieuDe}
                            </h1>
                            <div className="w-12 h-0.5 bg-golden-earth-400 mb-3 rounded-full" />

                            {post.danhMuc && (
                                <Link to={`/tin-tuc?dm=${post.danhMuc.slug}`}
                                    className="inline-block text-[10px] font-bold text-brown-bark-600 uppercase tracking-widest bg-golden-earth-50 px-3 py-1 rounded-full mb-3 hover:bg-golden-earth-100 transition-colors">
                                    {post.danhMuc.tenDanhMuc}
                                </Link>
                            )}

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-carbon-black-500 border-t border-b border-carbon-black-100 py-2">
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-carbon-black-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Đăng vào {formatDate(post.ngayDang)}
                                </span>
                                {post.views != null && (
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5 text-carbon-black-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        {post.views.toLocaleString()} lượt xem
                                    </span>
                                )}
                            </div>
                        </header>

                        {/* Ảnh đại diện */}
                        {post.anhDaiDien && (
                            <div className="mb-6 rounded-xl overflow-hidden">
                                <img src={post.anhDaiDien} alt={post.tieuDe} className="w-full object-cover max-h-[480px]" />
                            </div>
                        )}

                        {/* Tóm tắt */}
                        {post.tomTat && (
                            <p className="text-sm text-carbon-black-600 font-medium italic leading-relaxed bg-golden-earth-50 border-l-4 border-golden-earth-400 px-4 py-3 rounded-r-xl mb-6">
                                {post.tomTat}
                            </p>
                        )}

                        {/* Nội dung HTML */}
                        {post.noiDung && (
                            <div className="text-sm text-carbon-black-700 leading-relaxed
                                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-carbon-black-900 [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:leading-snug
                                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-carbon-black-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:leading-snug
                                [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-carbon-black-800 [&_h3]:mt-4 [&_h3]:mb-2
                                [&_h4]:text-sm [&_h4]:font-semibold [&_h4]:text-carbon-black-800 [&_h4]:mt-3 [&_h4]:mb-1
                                [&_p]:mb-4 [&_p]:leading-relaxed
                                [&_img]:rounded-xl [&_img]:my-4 [&_img]:w-full [&_img]:object-cover [&_img]:mx-auto [&_img]:block
                                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:[&_li]:mb-1
                                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                                [&_li]:mb-1.5
                                [&_a]:text-brown-bark-700 [&_a]:underline [&_a:hover]:text-brown-bark-900
                                [&_strong]:font-bold
                                [&_em]:italic
                                [&_blockquote]:border-l-4 [&_blockquote]:border-golden-earth-400 [&_blockquote]:bg-golden-earth-50 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:rounded-r-xl [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-carbon-black-600
                                [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4 [&_table]:text-xs
                                [&_th]:border [&_th]:border-carbon-black-200 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-carbon-black-50 [&_th]:font-semibold
                                [&_td]:border [&_td]:border-carbon-black-200 [&_td]:px-3 [&_td]:py-2"
                                dangerouslySetInnerHTML={{ __html: post.noiDung }}
                            />
                        )}

                        {/* Tags */}
                        {post.tags && (
                            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-carbon-black-100">
                                <span className="text-xs font-bold text-carbon-black-500 mr-1">Tags:</span>
                                {post.tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-carbon-black-50 text-carbon-black-600 text-xs rounded-full border border-carbon-black-100 hover:bg-golden-earth-50 hover:border-golden-earth-200 transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Author box */}
                        <div className="mt-8 bg-golden-earth-50 rounded-2xl p-5 flex items-start gap-4 border border-golden-earth-100">
                            <div className="w-14 h-14 rounded-full bg-brown-bark-800 flex items-center justify-center text-white text-xl font-bold shrink-0">
                                M
                            </div>
                            <div>
                                <h5 className="font-bold text-carbon-black-900 uppercase tracking-wide text-sm">Minh Anh Uniform</h5>
                                <p className="text-xs text-carbon-black-500 mt-1 leading-relaxed">
                                    Chuyên cung cấp đồng phục cao cấp — áo lớp, công sở, y tế và nhiều loại đồng phục khác. Chất lượng uy tín, giao hàng toàn quốc.
                                </p>
                            </div>
                        </div>

                        {/* Bài viết liên quan */}
                        {related.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-base font-bold text-carbon-black-900 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-golden-earth-400 rounded-full inline-block" />
                                    Bài viết liên quan
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {related.map(p => <RelatedCard key={p.baiVietId} post={p} />)}
                                </div>
                            </div>
                        )}

                        {/* Điều hướng trước/sau */}
                        <div className="mt-8 flex gap-4 border-t border-carbon-black-100 pt-6">
                            <Link to="/tin-tuc" className="flex-1 flex items-center gap-2 text-sm text-brown-bark-700 font-semibold hover:underline transition-colors">
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Quay lại danh sách tin tức
                            </Link>
                        </div>
                    </div>
                </article>

                {/* ===== Sidebar ===== */}
                <aside className="hidden lg:block w-80 shrink-0 space-y-5 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide pb-4">
                    {/* Danh mục */}
                    {categories.length > 0 && (
                        <div className="bg-white rounded-2xl border border-carbon-black-100 overflow-hidden shadow-sm">
                            <div className="px-5 pt-5 pb-3 border-b border-carbon-black-100">
                                <p className="text-[10px] font-bold text-brown-bark-700 tracking-[0.18em] uppercase mb-1">Phân loại</p>
                                <h3 className="text-sm font-bold text-carbon-black-900">Danh mục</h3>
                            </div>
                            <ul className="p-3 space-y-0.5">
                                <li>
                                    <Link to="/tin-tuc"
                                        className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${!post.danhMuc ? 'bg-brown-bark-800 text-golden-earth-50' : 'text-carbon-black-600 hover:bg-carbon-black-50'}`}>
                                        Tất cả bài viết
                                    </Link>
                                </li>
                                {categories.map(cat => (
                                    <li key={cat.danhMucBaiVietId}>
                                        <Link to={`/tin-tuc?dm=${cat.slug}`}
                                            className={`block px-3 py-2 rounded-xl text-sm transition-colors ${post.danhMuc?.slug === cat.slug ? 'bg-golden-earth-50 text-brown-bark-700 font-bold' : 'text-carbon-black-700 hover:bg-carbon-black-50 font-medium'}`}>
                                            {cat.tenDanhMuc}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Bài viết liên quan sidebar */}
                    {related.length > 0 && (
                        <div className="bg-white rounded-2xl border border-carbon-black-100 overflow-hidden shadow-sm">
                            <div className="px-5 pt-5 pb-3 border-b border-carbon-black-100">
                                <p className="text-[10px] font-bold text-brown-bark-700 tracking-[0.18em] uppercase mb-1">Xem thêm</p>
                                <h3 className="text-sm font-bold text-carbon-black-900">Bài viết liên quan</h3>
                            </div>
                            <ul className="p-3 divide-y divide-carbon-black-50">
                                {related.map(p => (
                                    <li key={p.baiVietId}>
                                        <Link to={`/tin-tuc/${p.slug}`} className="flex gap-3 py-3 group">
                                            {p.anhDaiDien && (
                                                <img src={p.anhDaiDien} alt={p.tieuDe}
                                                    className="w-14 h-10 rounded-lg object-cover shrink-0" loading="lazy" />
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-carbon-black-800 group-hover:text-brown-bark-700 line-clamp-2 leading-snug transition-colors">
                                                    {p.tieuDe}
                                                </p>
                                                <p className="text-[10px] text-carbon-black-400 mt-0.5">{formatDate(p.ngayDang)}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* Sản phẩm mới */}
                    <NewProductsWidget />
                </aside>
            </div>
        </main>
    )
}

export default NewsDetail
