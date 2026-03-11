import React, { useState } from 'react'
import { Save, Globe, Mail, Phone, MapPin, Facebook, Instagram, Link } from 'lucide-react'
import { cauHinh } from '../assets/assets'

const buildInitial = () => {
    const obj = {}
    cauHinh.forEach(c => { obj[c.khoa] = c.gia_tri })
    return obj
}

const Settings = () => {
    const [form, setForm] = useState(buildInitial)
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h2 className="text-xl font-bold text-gray-800">CẤU HÌNH</h2>
                <p className="text-sm text-gray-500 mt-0.5">Cài đặt thông tin chung của website</p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Phone size={18} className="text-[#DAA06D]" />
                    Thông tin liên hệ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email liên hệ</label>
                        <div className="relative">
                            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="email_lien_he" value={form.email_lien_he ?? ''} onChange={handleChange}
                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA06D]" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Hotline</label>
                        <div className="relative">
                            <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="hotline" value={form.hotline ?? ''} onChange={handleChange}
                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA06D]" />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Địa chỉ</label>
                        <div className="relative">
                            <MapPin size={15} className="absolute left-3 top-3.5 text-gray-400" />
                            <input name="dia_chi" value={form.dia_chi ?? ''} onChange={handleChange}
                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA06D]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Facebook size={18} className="text-[#DAA06D]" />
                    Mạng xã hội &amp; Liên kết
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Facebook</label>
                        <div className="relative">
                            <Link size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="facebook_link" value={form.facebook_link ?? ''} onChange={handleChange}
                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA06D]" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Instagram</label>
                        <div className="relative">
                            <Instagram size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="instagram_link" value={form.instagram_link ?? ''} onChange={handleChange}
                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA06D]" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Zalo</label>
                        <div className="relative">
                            <Link size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="zalo_link" value={form.zalo_link ?? ''} onChange={handleChange}
                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA06D]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* All settings table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Globe size={18} className="text-[#DAA06D]" />
                    Tất cả cấu hình
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="text-left px-4 py-3 font-medium">Khóa</th>
                                <th className="text-left px-4 py-3 font-medium">Giá trị</th>
                                <th className="text-left px-4 py-3 font-medium">Mô tả</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {cauHinh.map((c) => (
                                <tr key={c.khoa} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-mono text-xs text-[#DAA06D]">{c.khoa}</td>
                                    <td className="px-4 py-3 text-gray-700">{c.gia_tri}</td>
                                    <td className="px-4 py-3 text-gray-400 text-xs">{c.mo_ta}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-[#DAA06D] hover:bg-[#c08850] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <Save size={16} />
                    Lưu cài đặt
                </button>
            </div>
        </div>
    )
}

export default Settings
