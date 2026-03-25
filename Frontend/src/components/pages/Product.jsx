import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CategoryMenu from '../product/CategoryMenu'
import SupportPanel from '../product/SupportPanel'
import ProductList from '../product/ProductList'
import { uiCategories, uiProducts } from '../../assets/catalog'
import Title from '../common/Title'

const Product = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search)
    const keyword = (searchParams.get('q') || '').trim()

    const dm = (searchParams.get('dm') || '').trim() || null
    const sub = (searchParams.get('sub') || '').trim() || null

    const [selectedCategory, setSelectedCategory] = useState(null) // slug
    const [selectedSub, setSelectedSub] = useState(null) // slug
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // Product-field filters (local UI state; category/sub still driven by URL params)
    const [sort, setSort] = useState('new')
    const [onlyNew, setOnlyNew] = useState(false)
    const [onlyHot, setOnlyHot] = useState(false)
    const [brand, setBrand] = useState('')
    const [material, setMaterial] = useState('')
    const [size, setSize] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    useEffect(() => {
        setSelectedCategory(dm)
        setSelectedSub(sub)
    }, [dm, sub])

    const categories = uiCategories
    const products = uiProducts

    const brandOptions = useMemo(() => {
        const values = (products || [])
            .map((p) => (p?.raw?.thuong_hieu || '').trim())
            .filter(Boolean)
        return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'vi'))
    }, [products])

    const materialOptions = useMemo(() => {
        const values = (products || [])
            .map((p) => (p?.raw?.chat_lieu || '').trim())
            .filter(Boolean)
        return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'vi'))
    }, [products])

    const sizeOptions = useMemo(() => {
        const values = (products || []).flatMap((p) => p?.sizes || []).filter(Boolean)
        const order = ['S', 'M', 'L', 'XL', 'XXL']
        return Array.from(new Set(values)).sort((a, b) => {
            const ia = order.indexOf(a)
            const ib = order.indexOf(b)
            if (ia !== -1 && ib !== -1) return ia - ib
            if (ia !== -1) return -1
            if (ib !== -1) return 1
            return String(a).localeCompare(String(b))
        })
    }, [products])

    const filteredProducts = useMemo(() => {
        let list = products

        if (selectedCategory) list = list.filter((p) => p.categorySlug === selectedCategory)
        if (selectedSub) list = list.filter((p) => p.subCategorySlug === selectedSub)

        if (keyword) {
            const q = keyword.toLowerCase()
            list = list.filter((p) => (p.name || '').toLowerCase().includes(q))
        }

        if (onlyNew) list = list.filter((p) => Boolean(p?.isNew))
        if (onlyHot) list = list.filter((p) => Boolean(p?.isHot))
        if (brand) list = list.filter((p) => String(p?.raw?.thuong_hieu || '').trim() === brand)
        if (material) list = list.filter((p) => String(p?.raw?.chat_lieu || '').trim() === material)
        if (size) list = list.filter((p) => (p?.sizes || []).includes(size))

        const min = minPrice === '' ? null : Number(minPrice)
        const max = maxPrice === '' ? null : Number(maxPrice)
        if (min !== null && !Number.isNaN(min)) list = list.filter((p) => (p?.price ?? 0) >= min)
        if (max !== null && !Number.isNaN(max)) list = list.filter((p) => (p?.price ?? 0) <= max)

        const sorted = list.slice()
        sorted.sort((a, b) => {
            if (sort === 'price-asc') return (a?.price ?? 0) - (b?.price ?? 0)
            if (sort === 'price-desc') return (b?.price ?? 0) - (a?.price ?? 0)
            // “new”: ưu tiên mới/nổi bật trước; fallback theo views
            const hotDiff = Number(Boolean(b?.isHot)) - Number(Boolean(a?.isHot))
            if (hotDiff !== 0) return hotDiff
            const newDiff = Number(Boolean(b?.isNew)) - Number(Boolean(a?.isNew))
            if (newDiff !== 0) return newDiff
            return (b?.raw?.views ?? 0) - (a?.raw?.views ?? 0)
        })

        return sorted
    }, [
        products,
        selectedCategory,
        selectedSub,
        keyword,
        onlyNew,
        onlyHot,
        brand,
        material,
        size,
        minPrice,
        maxPrice,
        sort,
    ])

    const resetFieldFilters = () => {
        setOnlyNew(false)
        setOnlyHot(false)
        setBrand('')
        setMaterial('')
        setSize('')
        setMinPrice('')
        setMaxPrice('')
        setSort('new')
    }

    const handleFilter = (category, sub) => {
        const nextCategory = category || null
        const nextSub = sub || null

        setSelectedCategory(nextCategory)
        setSelectedSub(nextSub)
        setSidebarOpen(false)

        const params = new URLSearchParams(location.search)
        if (nextCategory) params.set('dm', nextCategory)
        else params.delete('dm')

        if (nextSub) params.set('sub', nextSub)
        else params.delete('sub')

        if (!nextCategory) params.delete('sub')

        const qs = params.toString()
        navigate(qs ? `/san-pham?${qs}` : '/san-pham')
    }

    const activeLabel = useMemo(() => {
        if (keyword) return `"${keyword}"`
        const catObj = categories.find((c) => c.slug === selectedCategory) || null
        const subObj = catObj?.subs?.find((s) => s.slug === selectedSub) || null
        return subObj?.name || catObj?.name || 'Tất cả sản phẩm'
    }, [keyword, categories, selectedCategory, selectedSub])

    return (
        <div className="min-h-screen bg-carbon-black-50">

            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
                {/* Mobile filter toggle */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setSidebarOpen((s) => !s)}
                        className="flex items-center gap-2 border border-brown-bark-400 text-brown-bark-700 bg-white px-4 py-2 rounded-lg text-sm font-semibold hover:border-brown-bark-500 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 12h10M11 20h2" />
                        </svg>
                        Lọc danh mục
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Sidebar */}
                    <aside className={`w-full lg:w-64 shrink-0 flex flex-col gap-6 ${sidebarOpen ? 'block' : 'hidden'
                        } lg:flex`}>
                        <CategoryMenu
                            categories={categories}
                            onFilter={handleFilter}
                            selectedCategory={selectedCategory}
                            selectedSub={selectedSub}
                        />

                        {/* Product field filters */}
                        <div className="bg-white rounded-2xl overflow-hidden border border-carbon-black-100 shadow-sm">
                            <div className="px-5 pt-5 pb-3 border-b border-carbon-black-100">
                                <p className="text-[10px] font-bold text-brown-bark-700 tracking-[0.18em] uppercase mb-1">
                                    Bộ lọc
                                </p>
                                <h3 className="text-base font-bold text-carbon-black-900 tracking-tight">SẢN PHẨM</h3>
                            </div>

                            <div className="p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="block">
                                        <span className="block text-xs font-semibold text-carbon-black-700 mb-1">Giá từ</span>
                                        <input
                                            inputMode="numeric"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, ''))}
                                            placeholder="0"
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-carbon-black-100 bg-white focus:outline-none focus:ring-2 focus:ring-golden-earth-100/70 focus:border-carbon-black-200"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="block text-xs font-semibold text-carbon-black-700 mb-1">Giá đến</span>
                                        <input
                                            inputMode="numeric"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, ''))}
                                            placeholder="..."
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-carbon-black-100 bg-white focus:outline-none focus:ring-2 focus:ring-golden-earth-100/70 focus:border-carbon-black-200"
                                        />
                                    </label>
                                </div>

                                <label className="block">
                                    <span className="block text-xs font-semibold text-carbon-black-700 mb-1">Thương hiệu</span>
                                    <select
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-carbon-black-100 bg-white focus:outline-none focus:ring-2 focus:ring-golden-earth-100/70 focus:border-carbon-black-200 cursor-pointer"
                                    >
                                        <option value="">Tất cả</option>
                                        {brandOptions.map((x) => (
                                            <option key={x} value={x}>
                                                {x}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="block text-xs font-semibold text-carbon-black-700 mb-1">Chất liệu</span>
                                    <select
                                        value={material}
                                        onChange={(e) => setMaterial(e.target.value)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-carbon-black-100 bg-white focus:outline-none focus:ring-2 focus:ring-golden-earth-100/70 focus:border-carbon-black-200 cursor-pointer"
                                    >
                                        <option value="">Tất cả</option>
                                        {materialOptions.map((x) => (
                                            <option key={x} value={x}>
                                                {x}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="block text-xs font-semibold text-carbon-black-700 mb-1">Kích thước</span>
                                    <select
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-carbon-black-100 bg-white focus:outline-none focus:ring-2 focus:ring-golden-earth-100/70 focus:border-carbon-black-200 cursor-pointer"
                                    >
                                        <option value="">Tất cả</option>
                                        {sizeOptions.map((x) => (
                                            <option key={x} value={x}>
                                                {x}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <div className="grid grid-cols-2 gap-2">
                                    <label className="flex items-center gap-2 rounded-xl border border-carbon-black-100 bg-carbon-black-50 px-3 py-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={onlyNew}
                                            onChange={(e) => setOnlyNew(e.target.checked)}
                                            className="accent-brown-bark-700"
                                        />
                                        <span className="text-xs font-semibold text-carbon-black-800">Mới</span>
                                    </label>
                                    <label className="flex items-center gap-2 rounded-xl border border-carbon-black-100 bg-carbon-black-50 px-3 py-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={onlyHot}
                                            onChange={(e) => setOnlyHot(e.target.checked)}
                                            className="accent-brown-bark-700"
                                        />
                                        <span className="text-xs font-semibold text-carbon-black-800">Nổi bật</span>
                                    </label>
                                </div>

                                <button
                                    type="button"
                                    onClick={resetFieldFilters}
                                    className="w-full rounded-xl border border-carbon-black-100 bg-white py-2.5 text-xs font-bold tracking-widest uppercase text-carbon-black-700 hover:bg-carbon-black-50 transition-colors"
                                >
                                    Xoá bộ lọc
                                </button>
                            </div>
                        </div>

                        <SupportPanel />
                    </aside>

                    {/* Product grid */}
                    <div className="flex-1 min-w-0">
                        {keyword && (
                            <p className="mb-4 text-sm text-gray-500">
                                Kết quả tìm kiếm cho <span className="font-semibold text-gray-800">"{keyword}"</span>
                            </p>
                        )}

                        <div className="flex items-center justify-between gap-3 mb-6">
                            <p className="text-sm text-carbon-black-600">
                                <span className="font-bold text-carbon-black-900">{filteredProducts.length}</span> sản phẩm
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-carbon-black-400 hidden sm:inline">Sắp xếp:</span>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="text-sm border border-carbon-black-100 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-golden-earth-100/70 focus:border-carbon-black-200 cursor-pointer"
                                >
                                    <option value="new">Mới nhất</option>
                                    <option value="price-asc">Giá: thấp → cao</option>
                                    <option value="price-desc">Giá: cao → thấp</option>
                                </select>
                            </div>
                        </div>

                        <ProductList products={filteredProducts} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
