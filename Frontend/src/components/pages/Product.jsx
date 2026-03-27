import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CategoryMenu from '../product/CategoryMenu'
import CustomSelect from '../common/CustomSelect'
import Pagination from '../common/Pagination'
import SupportPanel from '../product/SupportPanel'
import ProductList from '../product/ProductList'
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
    const [origin, setOrigin] = useState('') // Mới thêm: Lọc theo Xuất xứ
    const [size, setSize] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    // Tự động quay về trang 0 khi thay đổi bất kỳ bộ lọc nào (trừ tham số 'page')
    useEffect(() => {
        setPage(0)
    }, [keyword, selectedCategory, selectedSub, onlyNew, onlyHot, sort, brand, material, origin, minPrice, maxPrice])

    const [categories, setCategories] = useState([])

    useEffect(() => {
        setSelectedCategory(dm)
        setSelectedSub(sub)
    }, [dm, sub])

    useEffect(() => {
        // Tải danh mục từ Backend cho Sidebar
        fetch("/api/danh-muc-san-pham/tree")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Map từ DTO Backend sang format của UI Sidebar
                    const mapped = data.map(parent => ({
                        id: parent.id,
                        name: parent.tenDanhMuc,
                        slug: parent.slug,
                        subs: (parent.children || []).map(child => ({
                            id: child.id,
                            name: child.tenDanhMuc,
                            slug: child.slug
                        }))
                    }));
                    setCategories(mapped);
                }
            })
            .catch(err => console.error("Lỗi khi tải danh mục Sidebar:", err));
    }, []);

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [totalElements, setTotalElements] = useState(0)

    const brandOptions = useMemo(() => {
        const values = (products || [])
            .map((p) => (p?.thuongHieu || '').trim())
            .filter(Boolean)
        return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'vi'))
    }, [products])

    const materialOptions = useMemo(() => {
        const values = (products || [])
            .map((p) => (p?.chatLieu || '').trim())
            .filter(Boolean)
        return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'vi'))
    }, [products])

    const originOptions = useMemo(() => {
        const values = (products || [])
            .map((p) => (p?.xuatXu || '').trim())
            .filter(Boolean)
        return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'vi'))
    }, [products])

    const sizeOptions = useMemo(() => {
        // Hiện tại DTO card chưa có data size các biến thể, để trống tạm thời
        return []
    }, [products])

    useEffect(() => {
        setLoading(true)
        // Ánh xạ các bộ lọc sang query params cho API
        const params = new URLSearchParams()
        params.set('page', page)
        params.set('size', 12)
        if (keyword) params.set('keyword', keyword)
        if (selectedCategory) params.set('categorySlug', selectedCategory)
        if (selectedSub) params.set('subCategorySlug', selectedSub)
        if (onlyNew) params.set('isNew', true)
        if (onlyHot) params.set('isFeatured', true)
        if (minPrice) params.set('minPrice', minPrice)
        if (maxPrice) params.set('maxPrice', maxPrice)
        if (brand) params.set('brand', brand)
        if (material) params.set('material', material)
        if (origin) params.set('origin', origin)

        // Quy đổi cách sắp xếp React UI sang Backend Enum
        let backendSort = 'newest'
        if (sort === 'price-asc') backendSort = 'price_asc'
        if (sort === 'price-desc') backendSort = 'price_desc'
        params.set('sort', backendSort)

        fetch(`/api/san-pham?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                // Backend trả về 'sanPham' trong ProductPageResponse DTO
                setProducts(data.sanPham || [])
                setTotalElements(data.totalElements || 0)
                setLoading(false)
            })
            .catch(err => {
                console.error("Lỗi khi tải sản phẩm:", err)
                setLoading(false)
            })
    }, [page, keyword, selectedCategory, selectedSub, onlyNew, onlyHot, sort, brand, material, origin, minPrice, maxPrice])

    const filteredProducts = products // Bây giờ products đã được lọc từ Backend

    const resetFieldFilters = () => {
        setOnlyNew(false)
        setOnlyHot(false)
        setBrand('')
        setMaterial('')
        setOrigin('')
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

                                <CustomSelect
                                    label="Thương hiệu"
                                    value={brand}
                                    options={brandOptions}
                                    onChange={setBrand}
                                />

                                <CustomSelect
                                    label="Chất liệu"
                                    value={material}
                                    options={materialOptions}
                                    onChange={setMaterial}
                                />

                                <CustomSelect
                                    label="Xuất xứ"
                                    value={origin}
                                    options={originOptions}
                                    onChange={setOrigin}
                                />

                                <CustomSelect
                                    label="Kích thước"
                                    value={size}
                                    options={sizeOptions}
                                    onChange={setSize}
                                />

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
                            <p className="mb-4 text-sm text-gray-500 italic">
                                Kết quả tìm kiếm cho <span className="font-semibold text-gray-800">"{keyword}"</span>
                            </p>
                        )}

                        <div className="flex items-center justify-between gap-3 mb-6">
                            <p className="text-sm text-carbon-black-600">
                                <span className="font-bold text-carbon-black-900">{totalElements}</span> sản phẩm
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-carbon-black-400 hidden sm:inline">Sắp xếp:</span>
                                <div className="w-48">
                                    <CustomSelect
                                        value={sort}
                                        options={[
                                            { label: 'Mặc định', value: 'new' },
                                            { label: 'Giá: thấp → cao', value: 'price-asc' },
                                            { label: 'Giá: cao → thấp', value: 'price-desc' }
                                        ]}
                                        onChange={setSort}
                                        placeholder="Mặc định"
                                        hideAllOption={true}
                                    />
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24">
                                <div className="w-12 h-12 border-4 border-brown-bark-200 border-t-brown-bark-800 rounded-full animate-spin"></div>
                                <p className="mt-4 text-gray-500 font-medium">Đang tải sản phẩm...</p>
                            </div>
                        ) : products.length > 0 ? (
                            <ProductList products={products} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <svg className="w-12 h-12 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-lg font-bold text-gray-300">Không tìm thấy sản phẩm</p>
                                <p className="text-sm text-gray-400 mt-1">Thử chọn danh mục khác hoặc điều chỉnh bộ lọc</p>
                            </div>
                        )}

                        <Pagination
                            currentPage={page}
                            totalElements={totalElements}
                            pageSize={12}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
