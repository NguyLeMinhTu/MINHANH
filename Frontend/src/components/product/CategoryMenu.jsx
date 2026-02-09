import React, { useState } from 'react'

const CategoryMenu = ({ categories = [], onFilter = () => { }, selectedCategory = null, selectedSub = null }) => {
    const [openIdx, setOpenIdx] = useState(null)

    return (
        <div className="rounded-md overflow-hidden border border-gray-100">
            <div className="bg-[#af7b51] text-white px-3 py-2 font-semibold text-xs text-center">DANH MỤC SẢN PHẨM</div>

            <div className="p-2">
                <button
                    onClick={() => onFilter(null, null)}
                    className={`w-full text-left py-1.5 px-2 mb-2 rounded text-sm ${!selectedCategory ? 'bg-gray-100' : ''}`}
                >
                    Tất cả sản phẩm
                </button>

                <ul className="space-y-1">
                    {categories.length === 0 ? (
                        <li className="py-1 text-sm">Không có danh mục</li>
                    ) : (
                        categories.map((c, i) => (
                            <li key={c.name}>
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => setOpenIdx(openIdx === i ? null : i)}
                                        className={`text-left w-full py-1.5 px-2 rounded text-sm ${selectedCategory === c.name ? 'font-semibold' : ''}`}
                                    >
                                        {c.name}
                                    </button>
                                    <button className="px-2" onClick={() => onFilter(c.name, null)} aria-label={`Filter ${c.name}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894L9 18v-4.586L3.293 6.707A1 1 0 013 6V4z" />
                                        </svg>
                                    </button>
                                </div>

                                {openIdx === i && (
                                    <ul className="mt-1 ml-3 space-y-1">
                                        {c.subs.map((s) => (
                                            <li key={s}>
                                                <button
                                                    onClick={() => onFilter(c.name, s)}
                                                    className={`text-left w-full py-1 px-2 rounded text-xs ${selectedSub === s ? 'font-semibold text-[#af7b51]' : 'text-gray-700'}`}
                                                >
                                                    {s}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    )
}

export default CategoryMenu
