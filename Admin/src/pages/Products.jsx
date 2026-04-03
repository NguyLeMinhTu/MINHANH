import React, { useState, useEffect } from 'react'
import { sileo } from 'sileo'
import { Search, Plus, Pencil, Trash2, Eye, LayoutGrid, List, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct } from '../app/slices/productSlice'
import { fetchCategories } from '../app/slices/categorySlice'
import ProductFormModal from '../components/ProductFormModal'
import ProductAddForm from '../components/ProductAddForm'
import Title from '../components/Title'

const trangThaiStyle = {
    cong_khai: 'bg-emerald-100 text-emerald-700',
    an: 'bg-gray-100 text-gray-600',
    het_hang: 'bg-red-100 text-red-700',
}
const trangThaiLabel = { cong_khai: 'Công khai', an: 'Ẩn', het_hang: 'Hết hàng' }

const ProductDetail = ({ product, onClose }) => {
    const [activeImg, setActiveImg] = useState(0)

    // Xử lý list hình ảnh từ backend: [{hinhAnhId, urlAnh, ...}]
    let images = Array.isArray(product.hinhAnh) && product.hinhAnh.length > 0
        ? [...product.hinhAnh].sort((a, b) => a.hinhAnhId - b.hinhAnhId).map(img => img.urlAnh || img.url)
        : ['https://placehold.co/400x400?text=No+Image']

    // MOCK DATA: Chèn thêm 4 ảnh phụ để test thử layout hiển thị nhiều ảnh
    if (images.length === 1 && !images[0].includes('placehold.co')) {
        images = [
            images[0],
            'https://placehold.co/400x400/f8f9fa/a1a1aa?text=Anh+phu+1',
            'https://placehold.co/400x400/f8f9fa/a1a1aa?text=Anh+phu+2',
            'https://placehold.co/400x400/f8f9fa/a1a1aa?text=Anh+phu+3',
            'https://placehold.co/400x400/f8f9fa/a1a1aa?text=Anh+phu+4'
        ]
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={onClose} />
            <div className="fixed top-0 right-0 h-full w-[480px] max-w-full bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                    <h3 className="font-bold text-gray-800 text-base">Chi tiết sản phẩm</h3>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={18} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                    {/* Gallery */}
                    <div>
                        <div className="w-full h-80 rounded-xl border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                            <img src={images[activeImg]} alt={product.tenSanPham} className="w-full h-full object-contain" />
                        </div>
                        {images.length > 1 && (
                            <div className="grid grid-cols-5 gap-2 mt-2">
                                {images.map((imgUrl, i) => (
                                    <img
                                        key={i} src={imgUrl} alt=""
                                        onClick={() => setActiveImg(i)}
                                        className={`w-full aspect-square object-cover rounded-lg border-2 cursor-pointer transition-all ${i === activeImg ? 'border-primary-500' : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Name & badges */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 leading-snug">{product.tenSanPham}</h2>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{product.thuongHieu || 'Không rõ'}</span>
                            <span className="text-xs bg-primary-500/10 text-primary-600 px-2 py-0.5 rounded-full">{product.danhMuc?.tenDanhMuc || 'Chưa phân loại'}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${trangThaiStyle[product.trangThai || 'an'] ?? 'bg-gray-100 text-gray-600'}`}>
                                {trangThaiLabel[product.trangThai] ?? product.trangThai ?? 'Ẩn'}
                            </span>
                        </div>
                    </div>
                    {/* Price */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1.5">Giá</p>
                        <div className="flex items-end gap-3">
                            <span className="text-2xl font-bold text-gray-800">{(product.giaBan || 0).toLocaleString('vi-VN')}đ</span>
                            {product.giaKhuyenMai > 0 && (
                                <span className="text-sm font-semibold text-red-500 mb-0.5">{(product.giaKhuyenMai || 0).toLocaleString('vi-VN')}đ KM</span>
                            )}
                        </div>
                        {product.giaThamKhao > 0 && (
                            <p className="text-xs text-gray-400 line-through mt-0.5">{(product.giaThamKhao || 0).toLocaleString('vi-VN')}đ</p>
                        )}
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        {[{ label: 'Tồn kho', value: product.soLuongTon || 0 },
                        { label: 'Lượt xem', value: (product.views || 0).toLocaleString() },
                        { label: 'Đã bán', value: product.luotMua || 0 }].map(({ label, value }) => (
                            <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                                <p className="text-lg font-bold text-gray-800">{value}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>
                    {/* Details */}
                    <div className="space-y-3">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Thông tin</p>
                        {[{ label: 'Chất liệu', value: product.chatLieu || '—' },
                        { label: 'Xuất xứ', value: product.xuatXu || '—' },
                        { label: 'Đơn vị', value: product.donViTinh || 'Cái' },
                        { label: 'Ngày tạo', value: product.ngayTao ? new Date(product.ngayTao).toLocaleDateString('vi-VN') : '—' },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex justify-between text-sm">
                                <span className="text-gray-400 shrink-0">{label}</span>
                                <span className="text-gray-700 font-medium text-right ml-4">{value}</span>
                            </div>
                        ))}
                    </div>
                    {/* Description */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Mô tả</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{product.moTa || 'Chưa có mô tả'}</p>
                    </div>
                    {/* Preservation */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Bảo quản</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{product.baoQuan || '—'}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

const Products = () => {
    const dispatch = useDispatch()
    const { data: pageData, status: prodStatus } = useSelector(state => state.products)
    const { items: categoriesList, status: catStatus } = useSelector(state => state.categories)

    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'
    const [selected, setSelected] = useState(null)
    const [editingProduct, setEditingProduct] = useState(null)
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        dispatch(fetchProducts({ page: 0, size: 50 }))
        dispatch(fetchCategories())
    }, [dispatch])

    const sanPhamList = pageData.content || []

    const filtered = sanPhamList.filter((p) => {
        const matchesSearch = p.tenSanPham?.toLowerCase().includes(search.toLowerCase())

        // So sánh ID danh mục linh hoạt (hỗ trợ cả kiểu chuỗi và số)
        const productCatId = p.danhMuc?.danhMucId || p.danhMucId;
        const matchesCategory = categoryFilter === 'all' || String(productCatId) === String(categoryFilter);

        const matchesStatus = statusFilter === 'all' || p.trangThai === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    })

    // Helper để hiển thị danh mục theo cấp bậc trong dropdown
    const renderCategoryOptions = (cats, level = 0) => {
        return cats.map(cat => (
            <React.Fragment key={cat.danhMucId}>
                <option value={cat.danhMucId}>
                    {'\u00A0'.repeat(level * 4)}{level > 0 ? '↳ ' : ''}{cat.tenDanhMuc}
                </option>
                {/* Nếu có children thì render tiếp (nếu bạn có cấu trúc lồng, nếu không thì categoriesList là phẳng) */}
                {/* Ở đây categoriesList là phẳng nhưng có parent, ta có thể lọc theo parent */}
                {Array.isArray(categoriesList) && categoriesList
                    .filter(c => c.parent?.danhMucId === cat.danhMucId)
                    .map(child => renderCategoryOptions([child], level + 1))
                }
            </React.Fragment>
        ))
    }

    const parentCategories = Array.isArray(categoriesList) ? categoriesList.filter(c => !c.parent) : []

    const handleDelete = (p) => {
        sileo.action({
            title: 'Xóa vĩnh viễn sản phẩm?',
            description: `Bạn có thật sự muốn XÓA VĨNH VIỄN sản phẩm "${p.tenSanPham}" không? Thao tác này không thể hoàn tác.`,
            button: {
                title: 'Xác nhận xóa',
                onClick: () => {
                    sileo.promise(dispatch(deleteProduct(p.sanPhamId)).unwrap(), {
                        loading: { title: 'Đang xử lý...', description: `Đang xóa vĩnh viễn "${p.tenSanPham}"` },
                        success: () => {
                            dispatch(fetchProducts({ page: 0, size: 50 }));
                            return { title: 'Đã xóa thành công!', description: 'Sản phẩm đã bị xóa vĩnh viễn khỏi hệ thống.' };
                        },
                        error: (err) => ({ title: 'Lỗi', description: (err.message || JSON.stringify(err)) })
                    });
                }
            }
        });
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <Title text1="Danh sách" text2="sản phẩm" subText="Quản lý thông tin, trạng thái và tồn kho của sản phẩm" />
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-linear-to-b from-primary-600 to-primary-700/60 hover:from-primary-600 hover:to-primary-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95 mb-8"
                >
                    <Plus size={18} />
                    Thêm sản phẩm
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50/30 flex flex-wrap items-center justify-between gap-6">
                    {/* Tabs for Status */}
                    <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200">
                        {[
                            { label: 'Tất cả', value: 'all' },
                            { label: 'Công khai', value: 'cong_khai' },
                            { label: 'Đang ẩn', value: 'an' },
                            { label: 'Hết hàng', value: 'het_hang' }
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setStatusFilter(tab.value)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${statusFilter === tab.value
                                    ? 'bg-primary-800 text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 flex flex-wrap items-center justify-end gap-3 min-w-[300px]">
                        <div className="relative flex-1 max-w-xs">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={14} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-[13px] bg-white transition-all placeholder:text-gray-300"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="bg-white border border-gray-200 px-3 py-2 text-[13px] rounded-lg focus:outline-none focus:border-primary-500 transition-all text-gray-600 outline-none cursor-pointer"
                        >
                            <option value="all">Tất cả danh mục</option>
                            {renderCategoryOptions(parentCategories)}
                        </select>

                        <div className="flex items-center gap-1 bg-white border border-gray-200 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Xem dạng bảng"
                            >
                                <List size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Xem dạng lưới"
                            >
                                <LayoutGrid size={18} />
                            </button>
                        </div>

                        {(search !== '' || categoryFilter !== 'all' || statusFilter !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearch('')
                                    setCategoryFilter('all')
                                    setStatusFilter('all')
                                }}
                                className="text-[11px] font-bold text-gray-400 hover:text-primary-600 transition-colors px-2"
                            >
                                Làm mới
                            </button>
                        )}
                    </div>
                </div>

                {prodStatus === 'loading' ? (
                    <div className="p-10 text-center text-gray-400 text-sm">Đang tải dữ liệu...</div>
                ) : (
                    <div className="p-6">
                        {viewMode === 'list' ? (
                            <div className="overflow-x-auto border border-gray-100 rounded-xl">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                                            <th className="text-left px-6 py-4">Sản phẩm</th>
                                            <th className="text-left px-6 py-4">Danh mục</th>
                                            <th className="text-left px-6 py-4">Giá bán</th>
                                            <th className="text-center px-6 py-4">Tồn kho</th>
                                            <th className="text-left px-6 py-4">Trạng thái</th>
                                            <th className="text-right px-6 py-4">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filtered.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-10 text-gray-400 italic">Không có sản phẩm nào phù hợp</td>
                                            </tr>
                                        ) : filtered.map((p) => {
                                            const images = p.hinhAnh ? (Array.isArray(p.hinhAnh) ? p.hinhAnh : JSON.parse(p.hinhAnh)) : []
                                            const imgUrl = (images[0]?.urlAnh || images[0]?.url || images[0]) || 'https://placehold.co/100x100?text=No+Img'

                                            return (
                                                <tr key={p.sanPhamId} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={imgUrl}
                                                                alt={p.tenSanPham}
                                                                className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                                                            />
                                                            <div>
                                                                <p className="text-sm font-semibold text-gray-900 line-clamp-1">{p.tenSanPham}</p>
                                                                <p className="text-[11px] text-gray-400 font-medium uppercase">{p.thuongHieu || 'Không rõ'}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded">
                                                            {p.danhMuc?.tenDanhMuc || '—'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-gray-900">{(p.giaBan || 0).toLocaleString('vi-VN')}₫</span>
                                                            {p.giaKhuyenMai > 0 && (
                                                                <span className="text-[11px] text-red-500 line-through">{(p.giaBan || 0).toLocaleString('vi-VN')}₫</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="text-sm text-gray-600">{p.soLuongTon || 0}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.trangThai === 'cong_khai'
                                                                ? 'bg-green-100 text-green-700'
                                                                : p.trangThai === 'het_hang'
                                                                    ? 'bg-red-100 text-red-700'
                                                                    : 'bg-gray-100 text-gray-600'
                                                            }`}>
                                                            {trangThaiLabel[p.trangThai] || 'Không rõ'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button onClick={() => setSelected(p)} className="p-1.5 rounded-lg hover:bg-sky-50 text-gray-400 hover:text-sky-600 transition-all bg-white border border-gray-100 shadow-sm" title="Xem chi tiết">
                                                                <Eye size={14} />
                                                            </button>
                                                            <button onClick={() => setEditingProduct(p)} className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600 transition-all bg-white border border-gray-100 shadow-sm" title="Chỉnh sửa">
                                                                <Pencil size={14} />
                                                            </button>
                                                            <button onClick={() => handleDelete(p)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all bg-white border border-red-100 shadow-sm" title="Xóa vĩnh viễn">
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                {filtered.length === 0 ? (
                                    <div className="col-span-full text-center py-10 text-gray-400 italic">Không có sản phẩm nào phù hợp</div>
                                ) : filtered.map((p) => {
                                    const images = p.hinhAnh ? (Array.isArray(p.hinhAnh) ? p.hinhAnh : JSON.parse(p.hinhAnh)) : []
                                    const imgUrl = (images[0]?.urlAnh || images[0]?.url || images[0]) || 'https://placehold.co/400x400?text=No+Img'

                                    return (
                                        <div key={p.sanPhamId} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
                                            <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-50">
                                                <img
                                                    src={imgUrl}
                                                    alt={p.tenSanPham}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                                    <button onClick={() => setSelected(p)} className="p-2 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-primary-600 rounded-lg shadow-sm">
                                                        <Eye size={16} />
                                                    </button>
                                                    <button onClick={() => setEditingProduct(p)} className="p-2 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-primary-600 rounded-lg shadow-sm">
                                                        <Pencil size={16} />
                                                    </button>
                                                </div>
                                                <div className="absolute bottom-2 left-2">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${p.trangThai === 'cong_khai'
                                                            ? 'bg-green-500/80 text-white'
                                                            : p.trangThai === 'het_hang'
                                                                ? 'bg-red-500/80 text-white'
                                                                : 'bg-gray-500/80 text-white'
                                                        }`}>
                                                        {trangThaiLabel[p.trangThai] || 'Ẩn'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col">
                                                <p className="text-[10px] text-primary-600 font-bold uppercase tracking-wider mb-1">
                                                    {p.danhMuc?.tenDanhMuc || '—'}
                                                </p>
                                                <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors h-10">
                                                    {p.tenSanPham}
                                                </h4>
                                                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-extrabold text-gray-900">{(p.giaBan || 0).toLocaleString('vi-VN')}₫</span>
                                                        {p.giaKhuyenMai > 0 && (
                                                            <span className="text-[11px] text-red-500 line-through">{(p.giaBan || 0).toLocaleString('vi-VN')}₫</span>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-gray-400 font-medium">Kho: {p.soLuongTon || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {selected && <ProductDetail product={selected} onClose={() => setSelected(null)} />}
            {editingProduct && (
                <ProductFormModal
                    product={editingProduct}
                    categories={categoriesList || []}
                    onClose={() => setEditingProduct(null)}
                />
            )}
            {isAdding && (
                <ProductAddForm
                    categories={categoriesList || []}
                    onClose={() => setIsAdding(false)}
                />
            )}
        </div>
    )
}

export default Products
