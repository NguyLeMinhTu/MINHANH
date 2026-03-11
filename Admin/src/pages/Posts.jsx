import React, { useState } from 'react'
import { Search, Plus, Pencil, Trash2, Eye, X } from 'lucide-react'
import { baiViet, danhMucBaiViet, nguoiDung } from '../assets/assets'

const statusStyle = {
    cong_khai: 'bg-emerald-100 text-emerald-700',
    nhap: 'bg-gray-100 text-gray-600',
}
const statusLabel = { cong_khai: 'Đã xuất bản', nhap: 'Nháp' }

const getCategoryName = (id) => danhMucBaiViet.find(d => d.danh_muc_bai_viet_id === id)?.ten_danh_muc ?? '—'
const getAuthorName = (id) => nguoiDung.find(u => u.nguoi_dung_id === id)?.ten ?? '—'

const PostDetail = ({ post, onClose }) => (
    <>
        <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
        <div className="fixed top-0 right-0 h-full w-[520px] max-w-full bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                <h3 className="font-bold text-gray-800 text-base">Chi tiết bài viết</h3>
                <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={18} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                {/* Thumbnail */}
                <img src={post.anh_dai_dien} alt={post.tieu_de} className="w-full h-48 object-cover rounded-xl border border-gray-100" />
                {/* Meta & title */}
                <div>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="text-xs bg-[#DAA06D]/10 text-[#DAA06D] px-2 py-0.5 rounded-full">{getCategoryName(post.danh_muc_bai_viet_id)}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[post.trang_thai] ?? 'bg-gray-100 text-gray-600'}`}>
                            {statusLabel[post.trang_thai] ?? post.trang_thai}
                        </span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 leading-snug">{post.tieu_de}</h2>
                    <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{post.tom_tat}</p>
                </div>
                {/* Stats row */}
                <div className="flex items-center gap-4 text-sm text-gray-500 border-y border-gray-100 py-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <Eye size={14} />
                        <span>{post.views.toLocaleString()} lượt xem</span>
                    </div>
                    <span className="text-gray-300">·</span>
                    <span>Tác giả: <span className="font-medium text-gray-700">{getAuthorName(post.nguoi_dung_id)}</span></span>
                    <span className="text-gray-300">·</span>
                    <span>{new Date(post.ngay_dang).toLocaleDateString('vi-VN')}</span>
                </div>
                {/* Content */}
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Nội dung</p>
                    <div
                        className="text-sm text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_p]:mb-2"
                        dangerouslySetInnerHTML={{ __html: post.noi_dung }}
                    />
                </div>
                {/* Tags */}
                {post.tags && (
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                            {post.tags.split(',').map(tag => (
                                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{tag.trim()}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>
)

const Posts = () => {
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState(null)
    const filtered = baiViet.filter((p) =>
        p.tieu_de.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">DANH SÁCH BÀI VIẾT</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Quản lý bài viết và nội dung</p>
                </div>
                <button className="flex items-center gap-2 bg-[#DAA06D] hover:bg-[#c08850] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <Plus size={16} />
                    Viết bài mới
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-sm">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
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
                                <th className="text-left px-6 py-3 font-medium">Tiêu đề</th>
                                <th className="text-left px-6 py-3 font-medium">Danh mục</th>
                                <th className="text-left px-6 py-3 font-medium">Lượt xem</th>
                                <th className="text-left px-6 py-3 font-medium">Ngày đăng</th>
                                <th className="text-left px-6 py-3 font-medium">Trạng thái</th>
                                <th className="text-left px-6 py-3 font-medium">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((post) => (
                                <tr key={post.bai_viet_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <img src={post.anh_dai_dien} alt={post.tieu_de} className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-100" />
                                            <div>
                                                <p className="font-medium text-gray-800 truncate max-w-xs">{post.tieu_de}</p>
                                                <p className="text-xs text-gray-400">{post.tom_tat?.slice(0, 60)}...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-500">{getCategoryName(post.danh_muc_bai_viet_id)}</td>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                            <Eye size={13} />
                                            <span>{post.views.toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-500">
                                        {new Date(post.ngay_dang).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[post.trang_thai] ?? 'bg-gray-100 text-gray-600'}`}>
                                            {statusLabel[post.trang_thai] ?? post.trang_thai}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setSelected(post)} title="Xem chi tiết" className="p-1.5 rounded-lg hover:bg-[#DAA06D]/10 text-gray-400 hover:text-[#DAA06D] transition-colors">
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

            {selected && <PostDetail post={selected} onClose={() => setSelected(null)} />}
        </div>
    )
}

export default Posts
