import React, { useState } from 'react'
import { Search, Plus, Pencil, Trash2, Eye, X } from 'lucide-react'
import { sanPham, danhMucSanPham } from '../assets/assets'

const trangThaiStyle = {
    cong_khai: 'bg-emerald-100 text-emerald-700',
    an: 'bg-gray-100 text-gray-600',
    het_hang: 'bg-red-100 text-red-700',
}
const trangThaiLabel = { cong_khai: 'Công khai', an: 'Ẩn', het_hang: 'Hết hàng' }

const getCategoryName = (id) => danhMucSanPham.find(d => d.danh_muc_id === id)?.ten_danh_muc ?? '—'

const ProductDetail = ({ product, onClose }) => {
    const [activeImg, setActiveImg] = useState(0)
    const images = Array.isArray(product.hinh_anh) ? product.hinh_anh : [product.hinh_anh]
    return (
        <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
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
                        <img src={images[activeImg]} alt={product.ten_san_pham} className="w-full h-56 object-cover rounded-xl border border-gray-100" />
                        {images.length > 1 && (
                            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                                {images.map((img, i) => (
                                    <img
                                        key={i} src={img} alt=""
                                        onClick={() => setActiveImg(i)}
                                        className={`w-14 h-14 object-cover rounded-lg border-2 cursor-pointer shrink-0 transition-all ${i === activeImg ? 'border-[#DAA06D]' : 'border-gray-100 opacity-60 hover:opacity-100'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Name & badges */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 leading-snug">{product.ten_san_pham}</h2>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{product.thuong_hieu}</span>
                            <span className="text-xs bg-[#DAA06D]/10 text-[#DAA06D] px-2 py-0.5 rounded-full">{getCategoryName(product.danh_muc_id)}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${trangThaiStyle[product.trang_thai] ?? 'bg-gray-100 text-gray-600'}`}>
                                {trangThaiLabel[product.trang_thai] ?? product.trang_thai}
                            </span>
                        </div>
                    </div>
                    {/* Price */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1.5">Giá</p>
                        <div className="flex items-end gap-3">
                            <span className="text-2xl font-bold text-gray-800">{product.gia_ban.toLocaleString('vi-VN')}đ</span>
                            {product.gia_khuyen_mai && (
                                <span className="text-sm font-semibold text-red-500 mb-0.5">{product.gia_khuyen_mai.toLocaleString('vi-VN')}đ KM</span>
                            )}
                        </div>
                        {product.gia_tham_khao && (
                            <p className="text-xs text-gray-400 line-through mt-0.5">{product.gia_tham_khao.toLocaleString('vi-VN')}đ</p>
                        )}
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        {[{ label: 'Tồn kho', value: product.so_luong_ton },
                        { label: 'Lượt xem', value: product.views.toLocaleString() },
                        { label: 'Đã bán', value: product.luot_mua }].map(({ label, value }) => (
                            <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                                <p className="text-lg font-bold text-gray-800">{value}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>
                    {/* Details */}
                    <div className="space-y-3">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Thông tin</p>
                        {[{ label: 'Chất liệu', value: product.chat_lieu },
                        { label: 'Xuất xứ', value: product.xuat_xu },
                        { label: 'Đơn vị', value: product.don_vi_tinh },
                        { label: 'Ngày tạo', value: new Date(product.ngay_tao).toLocaleDateString('vi-VN') },
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
                        <p className="text-sm text-gray-600 leading-relaxed">{product.mo_ta}</p>
                    </div>
                    {/* Preservation */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Bảo quản</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{product.bao_quan}</p>
                    </div>
                    {/* Tags */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                            {product.tags.split(',').map(tag => (
                                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{tag.trim()}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Products = () => {
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState(null)
    const filtered = sanPham.filter((p) =>
        p.ten_san_pham.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">DANH SÁCH SẢN PHẨM</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Quản lý thông tin của sản phẩm</p>
                </div>
                <button className="flex items-center gap-2 bg-[#DAA06D] hover:bg-[#c08850] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
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
                            {filtered.map((p) => (
                                <tr key={p.san_pham_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={Array.isArray(p.hinh_anh) ? p.hinh_anh[0] : p.hinh_anh}
                                                alt={p.ten_san_pham}
                                                className="w-11 h-11 rounded-lg object-cover shrink-0 border border-gray-100"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-800 max-w-xs truncate">{p.ten_san_pham}</p>
                                                <p className="text-xs text-gray-400">{p.thuong_hieu}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-500">{getCategoryName(p.danh_muc_id)}</td>
                                    <td className="px-6 py-3.5">
                                        <p className="font-semibold text-gray-800">{p.gia_ban.toLocaleString('vi-VN')}đ</p>
                                        {p.gia_khuyen_mai && (
                                            <p className="text-xs text-red-500">{p.gia_khuyen_mai.toLocaleString('vi-VN')}đ KM</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-600">{p.so_luong_ton}</td>
                                    <td className="px-6 py-3.5 text-gray-500 flex items-center gap-1">
                                        <Eye size={13} /> {p.views}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${trangThaiStyle[p.trang_thai] ?? 'bg-gray-100 text-gray-600'}`}>
                                            {trangThaiLabel[p.trang_thai] ?? p.trang_thai}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-1.5">
                                            <button onClick={() => setSelected(p)} title="Xem chi tiết" className="p-1.5 rounded-lg hover:bg-[#DAA06D]/10 text-gray-400 hover:text-[#DAA06D] transition-colors">
                                                <Eye size={15} />
                                            </button>
                                            <button className="p-1.5 rounded-lg hover:bg-[#DAA06D]/10 text-gray-400 hover:text-[#DAA06D] transition-colors">
                                                <Pencil size={15} />
                                            </button>
                                            <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selected && <ProductDetail product={selected} onClose={() => setSelected(null)} />}
        </div>
    )
}

export default Products
