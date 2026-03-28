import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

/**
 * Widget Sản phẩm mới — dùng chung ở sidebar trang Tin tức & Chi tiết bài viết
 */
const NewProductsWidget = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('/api/san-pham?page=0&size=6&sort=newest')
            .then(r => r.json())
            .then(data => setProducts(data.sanPham || []))
            .catch(() => { })
    }, [])

    if (products.length === 0) return null

    return (
        <div className="bg-white rounded-2xl border border-carbon-black-100 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-carbon-black-100 bg-brown-bark-800">
                <h3 className="text-sm font-bold text-golden-earth-100 uppercase tracking-widest">
                    Sản phẩm mới
                </h3>
            </div>

            {/* List */}
            <ul className="p-3 divide-y divide-carbon-black-50">
                {products.map(product => {
                    const thumb = product.images?.[0] || product.anhDaiDien || null
                    const name = product.tenSanPham || ''
                    const slug = product.slug || ''

                    return (
                        <li key={product.sanPhamId || product.id || slug}>
                            <Link
                                to={`/san-pham/${slug}`}
                                className="flex items-center gap-3 py-2.5 group"
                            >
                                {/* Thumbnail */}
                                <div className="w-14 h-14 rounded-lg overflow-hidden bg-carbon-black-50 shrink-0">
                                    {thumb ? (
                                        <img src={thumb} alt={name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                            loading="lazy" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-carbon-black-300">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                {/* Name */}
                                <p className="text-xs font-semibold text-carbon-black-800 group-hover:text-brown-bark-700 line-clamp-2 leading-snug transition-colors">
                                    {name}
                                </p>
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <div className="px-4 pb-4">
                <Link to="/san-pham"
                    className="block w-full text-center py-2 rounded-xl bg-golden-earth-50 text-brown-bark-700 text-xs font-bold hover:bg-golden-earth-100 transition-colors border border-golden-earth-200">
                    Xem tất cả sản phẩm →
                </Link>
            </div>
        </div>
    )
}

export default NewProductsWidget
