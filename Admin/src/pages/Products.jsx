import React, { useState, useEffect } from 'react'
import { Search, Plus, Pencil, Trash2, Eye, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct } from '../app/slices/productSlice'
import { fetchCategories } from '../app/slices/categorySlice'
import ProductFormModal from '../components/ProductFormModal'
import ProductAddForm from '../components/ProductAddForm'

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
                                        className={`w-full aspect-square object-cover rounded-lg border-2 cursor-pointer transition-all ${i === activeImg ? 'border-[#DAA06D]' : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-200'
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
                            <span className="text-xs bg-[#DAA06D]/10 text-[#DAA06D] px-2 py-0.5 rounded-full">{product.danhMuc?.tenDanhMuc || 'Chưa phân loại'}</span>
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
    const [selected, setSelected] = useState(null)
    const [editingProduct, setEditingProduct] = useState(null)
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        dispatch(fetchProducts({ page: 0, size: 50 }))
        dispatch(fetchCategories())
    }, [dispatch])

    const sanPhamList = pageData.content || []
    
    const filtered = sanPhamList.filter((p) =>
        p.tenSanPham?.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = async (p) => {
        if (window.confirm(`Bạn có chắc muốn ẨN sản phẩm "${p.tenSanPham}" không?`)) {
            try {
                await dispatch(deleteProduct(p.sanPhamId)).unwrap();
                dispatch(fetchProducts({ page: 0, size: 50 }));
            } catch (error) {
                alert("Lỗi khi xóa: " + JSON.stringify(error));
            }
        }
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">DANH SÁCH SẢN PHẨM</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Quản lý thông tin của sản phẩm</p>
                </div>
                <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-[#DAA06D] hover:bg-[#c08850] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <Plus size={16} />
                    Thêm sản phẩm
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-sm">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA06D]"
                        />
                    </div>
                </div>
                
                {prodStatus === 'loading' ? (
                    <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="text-left px-6 py-3 font-medium">Sản phẩm</th>
                                    <th className="text-left px-6 py-3 font-medium">Danh mục</th>
                                    <th className="text-left px-6 py-3 font-medium">Giá bán</th>
                                    <th className="text-left px-6 py-3 font-medium">Tồn kho</th>
                                    <th className="text-left px-6 py-3 font-medium">Lượt xem</th>
                                    <th className="text-left px-6 py-3 font-medium">Trạng thái</th>
                                    <th className="text-left px-6 py-3 font-medium">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-6 text-gray-400">Không có sản phẩm nào</td>
                                    </tr>
                                ) : filtered.map((p) => {
                                    // Chuyển đổi hinh_anh sang array an toàn và sắp xếp thứ tự
                                    let imgUrl = 'https://placehold.co/100x100?text=No+Img';
                                    if (Array.isArray(p.hinhAnh) && p.hinhAnh.length > 0) {
                                        const sorted = [...p.hinhAnh].sort((a, b) => a.hinhAnhId - b.hinhAnhId);
                                        imgUrl = sorted[0].urlAnh || sorted[0].url;
                                    }
                                        
                                    return (
                                        <tr key={p.sanPhamId} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={imgUrl}
                                                        alt={p.tenSanPham}
                                                        className="w-11 h-11 rounded-lg object-cover shrink-0 border border-gray-100"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-800 max-w-xs truncate">{p.tenSanPham}</p>
                                                        <p className="text-xs text-gray-400">{p.thuongHieu || '—'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5 text-gray-500">{p.danhMuc?.tenDanhMuc || '—'}</td>
                                            <td className="px-6 py-3.5">
                                                <p className="font-semibold text-gray-800">{(p.giaBan || 0).toLocaleString('vi-VN')}đ</p>
                                                {p.giaKhuyenMai > 0 && (
                                                    <p className="text-xs text-red-500">{(p.giaKhuyenMai || 0).toLocaleString('vi-VN')}đ KM</p>
                                                )}
                                            </td>
                                            <td className="px-6 py-3.5 text-gray-600">{p.soLuongTon || 0}</td>
                                            <td className="px-6 py-3.5 text-gray-500">
                                                <div className="flex items-center gap-1.5">
                                                    <Eye size={14} /> {p.views || 0}
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${trangThaiStyle[p.trangThai || 'an'] ?? 'bg-gray-100 text-gray-600'}`}>
                                                    {trangThaiLabel[p.trangThai] ?? p.trangThai ?? 'Ẩn'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-1.5">
                                                    <button onClick={() => setSelected(p)} title="Xem chi tiết" className="p-1.5 rounded-lg hover:bg-[#DAA06D]/10 text-gray-400 hover:text-[#DAA06D] transition-colors">
                                                        <Eye size={15} />
                                                    </button>
                                                    <button onClick={() => setEditingProduct(p)} title="Sửa sản phẩm" className="p-1.5 rounded-lg hover:bg-[#DAA06D]/10 text-gray-400 hover:text-[#DAA06D] transition-colors">
                                                        <Pencil size={15} />
                                                    </button>
                                                    <button onClick={() => handleDelete(p)} title="Xóa mềm" className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
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
