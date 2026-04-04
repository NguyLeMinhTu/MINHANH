import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { sileo } from 'sileo'
import { Search, Plus, Pencil, Trash2, Eye, LayoutGrid, List, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct } from '../app/slices/productSlice'
import { fetchCategories } from '../app/slices/categorySlice'
import ProductFormModal from '../components/ProductFormModal'
import ProductAddForm from '../components/ProductAddForm'
import Title from '../components/Title'
import useScrollLock from '../hooks/useScrollLock'

const trangThaiStyle = {
    cong_khai: 'bg-emerald-100 text-emerald-700',
    an: 'bg-gray-100 text-gray-600',
    het_hang: 'bg-red-100 text-red-700',
}
const trangThaiLabel = { cong_khai: 'Công khai', an: 'Ẩn', het_hang: 'Hết hàng' }

const ProductDetail = ({ product, onClose }) => {
    useScrollLock();
    const [activeTab, setActiveTab] = useState('thong_tin');

    // Logic "Unflatten" biến thể: Group by Color
    const groupedVariants = React.useMemo(() => {
        const flattened = Array.isArray(product.bienThe) ? product.bienThe : [];
        const groups = {};
        flattened.forEach(v => {
            const color = v.mauSac || 'Mặc định';
            if (!groups[color]) groups[color] = [];
            groups[color].push({ size: v.size || 'F', soLuong: v.soLuong || 0, gia: v.gia || 0 });
        });
        return Object.keys(groups).map(color => ({
            color: color,
            sizes: groups[color]
        }));
    }, [product.bienThe]);

    // Xử lý danh sách hình ảnh
    let images = Array.isArray(product.hinhAnh) && product.hinhAnh.length > 0
        ? [...product.hinhAnh].sort((a, b) => a.hinhAnhId - b.hinhAnhId).map(img => img.urlAnh || img.url)
        : ['https://placehold.co/400x400?text=No+Image'];

    const tabs = [
        { id: 'thong_tin', label: 'Thông tin chung' },
        { id: 'noi_dung', label: 'Nội dung chi tiết' },
        { id: 'bien_the', label: `Phân loại hàng (${product.bienThe?.length || 0})` },
        { id: 'hinh_anh', label: `Bộ sưu tập ảnh (${images.length})` }
    ];

    const InfoItem = ({ label, value, className = "" }) => (
        <div className={`p-4 bg-gray-50/50 border border-gray-100 rounded-2xl ${className}`}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm font-bold text-gray-800">{value || '—'}</p>
        </div>
    );

    return createPortal(
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-300" onClick={onClose}>
            <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-gray-50 shrink-0">
                    <div>
                        <h3 className="font-extrabold text-gray-900 text-xl uppercase tracking-tight">Chi tiết sản phẩm</h3>
                        <p className="text-xs text-gray-400 mt-0.5 font-medium">Xem toàn bộ thông tin chi tiết của mã hàng #{product.sanPhamId?.substring(0, 8)}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all active:scale-90">
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs selection */}
                <div className="flex gap-6 px-8 pt-4 border-b border-gray-50 bg-white shrink-0 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={(e) => { e.stopPropagation(); setActiveTab(tab.id); }}
                            className={`pb-3 px-1 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50/20">
                    {/* TAB: THÔNG TIN CHUNG */}
                    <div className={activeTab === 'thong_tin' ? 'space-y-6 block' : 'hidden'}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-4">
                                <div className="aspect-square rounded-3xl overflow-hidden border border-gray-100 bg-white p-2 shadow-sm">
                                    <img src={images[0]} alt="" className="w-full h-full object-contain" />
                                </div>
                            </div>
                            <div className="lg:col-span-8 flex flex-col gap-4">
                                <div className="p-5 bg-white border border-gray-100 rounded-3xl shadow-sm">
                                    <div className="flex justify-between items-start gap-4">
                                        <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2">{product.tenSanPham}</h2>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${trangThaiStyle[product.trangThai || 'an']}`}>
                                            {trangThaiLabel[product.trangThai] || 'Ẩn'}
                                        </span>
                                        {product.spNoiBat && <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Nổi bật</span>}
                                        {product.spMoi && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Mới</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    <InfoItem label="Danh mục" value={product.danhMuc?.tenDanhMuc} />
                                    <InfoItem label="Thương hiệu" value={product.thuongHieu} />
                                    <InfoItem label="Giá niêm yết" value={`${(product.giaBan || 0).toLocaleString('vi-VN')}₫`} />
                                    <InfoItem label="Giá khuyến mãi" value={product.giaKhuyenMai > 0 ? `${(product.giaKhuyenMai || 0).toLocaleString('vi-VN')}₫` : '—'} />
                                    <InfoItem label="Tồn kho" value={`${product.soLuongTon || 0} ${product.donViTinh || 'Cái'}`} />
                                    <InfoItem label="Lượt xem" value={(product.views || 0).toLocaleString()} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TAB: NỘI DUNG CHI TIẾT */}
                    <div className={activeTab === 'noi_dung' ? 'space-y-6 block' : 'hidden'}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-6">
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Bài viết mô tả sản phẩm</p>
                                    <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                        {product.moTa || 'Chưa có nội dung mô tả sản phẩm này.'}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Thông số kỹ thuật</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 font-medium text-[10px] uppercase tracking-wider">Chất liệu</span>
                                            <span className="text-gray-900 font-bold text-right">{product.chatLieu || '—'}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 font-medium text-[10px] uppercase tracking-wider">Xuất xứ</span>
                                            <span className="text-gray-900 font-bold text-right">{product.xuatXu || '—'}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 font-medium text-[10px] uppercase tracking-wider">Đơn vị</span>
                                            <span className="text-gray-900 font-bold text-right">{product.donViTinh || 'Cái'}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 font-medium text-[10px] uppercase tracking-wider">Ngày tạo</span>
                                            <span className="text-gray-900 font-bold text-right">{product.ngayTao ? new Date(product.ngayTao).toLocaleDateString('vi-VN') : '—'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Hướng dẫn bảo quản</p>
                                    <p className="text-xs text-gray-600 italic leading-relaxed">{product.baoQuan || 'Sử dụng và bảo quản theo quy trình thông thường.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TAB: PHÂN LOẠI HÀNG */}
                    <div className={activeTab === 'bien_the' ? 'space-y-4 block' : 'hidden'}>
                        {groupedVariants.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <p className="text-gray-400 text-sm font-medium italic">Sản phẩm này không có biến thể phân loại hàng.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {groupedVariants.map((group, idx) => (
                                    <div key={idx} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="bg-gray-50/50 px-5 py-3 border-b border-gray-50 flex items-center gap-3">
                                            <div className="w-1.5 h-4 bg-primary-500 rounded-full"></div>
                                            <span className="font-extrabold text-gray-900 text-sm">{group.color}</span>
                                        </div>
                                        <div className="p-4">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                        <th className="text-left py-2">Kích cỡ</th>
                                                        <th className="text-center py-2">Số lượng</th>
                                                        <th className="text-right py-2">Giá TB</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {group.sizes.map((s, sIdx) => (
                                                        <tr key={sIdx} className="text-sm group/row hover:bg-gray-50/50 transition-colors">
                                                            <td className="py-2.5 font-bold text-gray-800">{s.size}</td>
                                                            <td className="py-2.5 text-center font-mono text-blue-600 font-bold">{s.soLuong}</td>
                                                            <td className="py-2.5 text-right font-mono font-bold text-amber-600">
                                                                {s.gia > 0 ? `${s.gia.toLocaleString('vi-VN')}₫` : 'Theo giá gốc'}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* TAB: BỘ SƯU TẬP ẢNH */}
                    <div className={activeTab === 'hinh_anh' ? 'block' : 'hidden'}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {images.map((url, i) => (
                                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-white p-1 hover:shadow-md transition-shadow group relative shadow-sm">
                                    <img src={url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    {i === 0 && <span className="absolute top-2 left-2 bg-[#DAA06D] text-white text-[8px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-tighter border border-white/20 shadow-sm">Ảnh bìa</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-4 border-t border-gray-50 bg-white flex justify-end shrink-0">
                    <button onClick={onClose} className="px-10 py-2.5 text-sm font-black text-white bg-primary-900 rounded-2xl hover:bg-primary-600 transition-all active:scale-95 shadow-xl shadow-gray-200">
                        Đóng thông tin
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
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

    const filtered = React.useMemo(() => {
        const sanPhamList = pageData?.content || [];
        return sanPhamList.filter((p) => {
            const matchesSearch = p.tenSanPham?.toLowerCase().includes(search.toLowerCase());

            // So sánh ID danh mục linh hoạt (hỗ trợ cả kiểu chuỗi và số)
            const productCatId = p.danhMuc?.danhMucId || p.danhMucId;
            const matchesCategory = categoryFilter === 'all' || String(productCatId) === String(categoryFilter);

            const matchesStatus = statusFilter === 'all' || p.trangThai === statusFilter;
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [pageData?.content, search, categoryFilter, statusFilter]);

    const parentCategories = React.useMemo(() => 
        Array.isArray(categoriesList) ? categoriesList.filter(c => !c.parent) : []
    , [categoriesList]);

    // Helper để hiển thị danh mục theo cấp bậc trong dropdown
    const renderCategoryOptions = (cats, level = 0) => {
        return cats.map(cat => (
            <React.Fragment key={cat.danhMucId}>
                <option value={cat.danhMucId}>
                    {'\u00A0'.repeat(level * 4)}{level > 0 ? '↳ ' : ''}{cat.tenDanhMuc}
                </option>
                {/* Ở đây categoriesList là phẳng nhưng có parent, lọc theo parent */}
                {Array.isArray(categoriesList) && categoriesList
                    .filter(c => c.parent?.danhMucId === cat.danhMucId)
                    .map(child => renderCategoryOptions([child], level + 1))
                }
            </React.Fragment>
        ));
    };

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
                                            <th className="text-center px-6 py-4">Lượt xem</th>
                                            <th className="text-left px-6 py-4">Trạng thái</th>
                                            <th className="text-right px-6 py-4">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filtered.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="text-center py-10 text-gray-400 italic">Không có sản phẩm nào phù hợp</td>
                                            </tr>
                                        ) : filtered.map((p) => {
                                            const images = p.hinhAnh ? (Array.isArray(p.hinhAnh) ? p.hinhAnh : JSON.parse(p.hinhAnh)) : []
                                            const imgUrl = (images[0]?.urlAnh || images[0]?.url || images[0]) || 'https://placehold.co/100x100?text=No+Img'

                                            return (
                                                <tr key={p.sanPhamId} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3 max-w-[240px]">
                                                            <img
                                                                src={imgUrl}
                                                                alt={p.tenSanPham}
                                                                className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0"
                                                            />
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-semibold text-gray-900 truncate">{p.tenSanPham}</p>
                                                                <p className="text-[11px] text-gray-400 font-medium uppercase truncate">{p.thuongHieu || 'Minh Anh Uniform'}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-block whitespace-nowrap text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded">
                                                            {p.danhMuc?.tenDanhMuc || '—'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col whitespace-nowrap">
                                                            <span className="text-sm font-bold text-gray-900">{(p.giaBan || 0).toLocaleString('vi-VN')}₫</span>
                                                            {p.giaKhuyenMai > 0 && (
                                                                <span className="text-[11px] text-red-500 line-through">{(p.giaBan || 0).toLocaleString('vi-VN')}₫</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="text-sm text-gray-600">{p.soLuongTon || 0}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="text-sm font-semibold text-blue-600">
                                                            {p.views >= 1000
                                                                ? `${(p.views / 1000).toFixed(1).replace('.0', '')}k`
                                                                : (p.views || 0).toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${p.trangThai === 'cong_khai'
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
