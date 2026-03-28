import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

// ====== Helpers ======
const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// ====== Skeleton Card ======
const SkeletonCard = () => (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-carbon-black-100 animate-pulse">
        <div className="w-[200px] h-[120px] shrink-0 bg-carbon-black-100 rounded-xl" />
        <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-carbon-black-100 rounded w-3/4" />
            <div className="h-4 bg-carbon-black-100 rounded w-1/2" />
            <div className="h-3 bg-carbon-black-100 rounded w-full" />
            <div className="h-3 bg-carbon-black-100 rounded w-5/6" />
        </div>
    </div>
)

// ====== Blog Card (horizontal) ======
const BlogCard = ({ post }) => (
    <Link
        to={`/tin-tuc/${post.slug}`}
        className="group flex gap-4 bg-white rounded-2xl border border-carbon-black-100 overflow-hidden hover:shadow-md hover:border-golden-earth-200 transition-all duration-200"
    >
        {/* Thumbnail */}
        <div className="w-[220px] shrink-0 overflow-hidden bg-carbon-black-50">
            {post.anhDaiDien ? (
                <img
                    src={post.anhDaiDien}
                    alt={post.tieuDe}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ aspectRatio: '16/10' }}
                    loading="lazy"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-carbon-black-300" style={{ aspectRatio: '16/10' }}>
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                </div>
            )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center py-4 pr-4 flex-1 min-w-0">
            {post.danhMuc && (
                <span className="text-[10px] font-bold text-brown-bark-600 uppercase tracking-widest mb-1">
                    {post.danhMuc.tenDanhMuc}
                </span>
            )}
            <h2 className="text-sm font-bold text-carbon-black-900 group-hover:text-brown-bark-700 transition-colors line-clamp-2 leading-snug mb-2">
                {post.tieuDe}
            </h2>
            <div className="w-8 h-0.5 bg-golden-earth-400 mb-2 rounded-full" />
            {post.tomTat && (
                <p className="text-xs text-carbon-black-500 line-clamp-2 leading-relaxed mb-3">
                    {post.tomTat}
                </p>
            )}
            <div className="flex items-center gap-2 text-[10px] text-carbon-black-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.ngayDang)}
                {post.views != null && (
                    <>
                        <span>·</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {post.views.toLocaleString()}
                    </>
                )}
            </div>
        </div>
    </Link>
)

// ====== Pagination ======
const Pagination = ({ page, totalPages, onChange }) => {
    if (totalPages <= 1) return null
    return (
        <div className="flex items-center justify-center gap-1 mt-8">
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-carbon-black-200 text-carbon-black-500 hover:bg-golden-earth-50 hover:border-golden-earth-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
            >‹</button>

            {Array.from({ length: totalPages }, (_, i) => i)
                .filter(i => Math.abs(i - page) <= 2)
                .map(i => (
                    <button
                        key={i}
                        onClick={() => onChange(i)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${i === page
                            ? 'bg-brown-bark-800 text-white border border-brown-bark-800'
                            : 'border border-carbon-black-200 text-carbon-black-600 hover:bg-golden-earth-50 hover:border-golden-earth-300'
                            }`}
                    >{i + 1}</button>
                ))}

            <button
                onClick={() => onChange(page + 1)}
                disabled={page >= totalPages - 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-carbon-black-200 text-carbon-black-500 hover:bg-golden-earth-50 hover:border-golden-earth-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
            >›</button>
        </div>
    )
}

// ====== Main Component ======
const News = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dmSlug = searchParams.get('dm') || ''
    const pageParam = parseInt(searchParams.get('page') || '0', 10)

    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [recentPosts, setRecentPosts] = useState([])

    // Fetch bài viết chính
    useEffect(() => {
        setLoading(true)
        let url = `/api/bai-viet?page=${pageParam}&size=8`
        if (dmSlug) url += `&dm=${encodeURIComponent(dmSlug)}`
        fetch(url)
            .then(r => r.json())
            .then(data => {
                setPosts(data.content || [])
                setTotalPages(data.totalPages || 0)
            })
            .catch(() => setPosts([]))
            .finally(() => setLoading(false))
    }, [dmSlug, pageParam])

    // Fetch danh mục bài viết (sidebar)
    useEffect(() => {
        fetch('/api/danh-muc-bai-viet')
            .then(r => r.json())
            .then(data => setCategories(Array.isArray(data) ? data.filter(c => c.trangThai) : []))
            .catch(() => setCategories([]))
    }, [])

    // Fetch bài viết mới nhất (sidebar — top 5)
    useEffect(() => {
        fetch('/api/bai-viet?page=0&size=5')
            .then(r => r.json())
            .then(data => setRecentPosts(data.content || []))
            .catch(() => setRecentPosts([]))
    }, [])

    const handlePageChange = (newPage) => {
        const params = {}
        if (dmSlug) params.dm = dmSlug
        if (newPage > 0) params.page = newPage
        setSearchParams(params)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCategoryFilter = (slug) => {
        const params = {}
        if (slug) params.dm = slug
        setSearchParams(params)
    }

    const activeCat = categories.find(c => c.slug === dmSlug)

    return (
        <main className="max-w-6xl mx-auto px-3 lg:px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <p className="text-[11px] font-bold text-brown-bark-600 tracking-[0.18em] uppercase mb-1">Cập nhật mới nhất</p>
                <h1 className="text-2xl font-bold text-carbon-black-900">
                    {activeCat ? activeCat.tenDanhMuc : 'Tin Tức'}
                </h1>
                <div className="w-10 h-0.5 bg-golden-earth-400 mt-2 rounded-full" />
            </div>

            <div className="flex gap-6 items-start">
                {/* ===== Left: Danh sách bài viết ===== */}
                <div className="flex-1 min-w-0">
                    {loading ? (
                        <div className="space-y-4">
                            {Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-carbon-black-400">
                            <svg className="w-12 h-12 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-sm">Chưa có bài viết nào</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map(post => <BlogCard key={post.baiVietId} post={post} />)}
                        </div>
                    )}

                    <Pagination page={pageParam} totalPages={totalPages} onChange={handlePageChange} />
                </div>

                {/* ===== Right: Sidebar ===== */}
                <aside className="hidden lg:block w-[280px] shrink-0 space-y-5 sticky top-24">
                    {/* Danh mục */}
                    <div className="bg-white rounded-2xl border border-carbon-black-100 overflow-hidden shadow-sm">
                        <div className="px-5 pt-5 pb-3 border-b border-carbon-black-100">
                            <p className="text-[10px] font-bold text-brown-bark-700 tracking-[0.18em] uppercase mb-1">Phân loại</p>
                            <h3 className="text-base font-bold text-carbon-black-900">Danh mục</h3>
                        </div>
                        <ul className="p-3 space-y-0.5">
                            <li>
                                <button
                                    onClick={() => handleCategoryFilter('')}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${!dmSlug ? 'bg-brown-bark-800 text-golden-earth-50' : 'text-carbon-black-600 hover:bg-carbon-black-50'}`}
                                >
                                    Tất cả bài viết
                                </button>
                            </li>
                            {categories.map(cat => (
                                <li key={cat.danhMucBaiVietId}>
                                    <button
                                        onClick={() => handleCategoryFilter(cat.slug)}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${dmSlug === cat.slug ? 'bg-golden-earth-50 text-brown-bark-700 font-bold' : 'text-carbon-black-700 hover:bg-carbon-black-50 font-medium'}`}
                                    >
                                        {cat.tenDanhMuc}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Bài viết mới nhất */}
                    {recentPosts.length > 0 && (
                        <div className="bg-white rounded-2xl border border-carbon-black-100 overflow-hidden shadow-sm">
                            <div className="px-5 pt-5 pb-3 border-b border-carbon-black-100">
                                <p className="text-[10px] font-bold text-brown-bark-700 tracking-[0.18em] uppercase mb-1">Mới nhất</p>
                                <h3 className="text-base font-bold text-carbon-black-900">Bài viết gần đây</h3>
                            </div>
                            <ul className="p-3 divide-y divide-carbon-black-50">
                                {recentPosts.map(post => (
                                    <li key={post.baiVietId}>
                                        <Link to={`/tin-tuc/${post.slug}`} className="flex gap-3 py-3 group">
                                            {post.anhDaiDien && (
                                                <img
                                                    src={post.anhDaiDien}
                                                    alt={post.tieuDe}
                                                    className="w-16 h-12 rounded-lg object-cover shrink-0"
                                                    loading="lazy"
                                                />
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-carbon-black-800 group-hover:text-brown-bark-700 line-clamp-2 leading-snug transition-colors">
                                                    {post.tieuDe}
                                                </p>
                                                <p className="text-[10px] text-carbon-black-400 mt-1">{formatDate(post.ngayDang)}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            </div>
        </main>
    )
}

export default News
