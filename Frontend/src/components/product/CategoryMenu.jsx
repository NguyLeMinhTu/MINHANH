import React, { useState } from 'react'

const CategoryMenu = ({ categories = [], onFilter = () => { }, selectedCategory = null, selectedSub = null }) => {
    const [openIdx, setOpenIdx] = useState(null)

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-carbon-black-100 shadow-sm">
            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-carbon-black-100">
                <p className="text-[10px] font-bold text-brown-bark-700 tracking-[0.18em] uppercase mb-1">Khám phá</p>
                <h3 className="text-base font-bold text-carbon-black-900 tracking-tight">Danh mục sản phẩm</h3>
            </div>

            <div className="p-3">
                {/* All products */}
                <button
                    onClick={() => onFilter(null, null)}
                    className={`w-full text-left py-2 px-3 mb-1 rounded-xl text-sm font-semibold transition-colors ${!selectedCategory
                        ? 'bg-brown-bark-800 text-golden-earth-50'
                        : 'text-carbon-black-600 hover:bg-carbon-black-50'
                        }`}
                >
                    Tất cả sản phẩm
                </button>

                <ul className="space-y-0.5">
                    {categories.length === 0 ? (
                        <li className="py-2 px-3 text-sm text-carbon-black-400">Không có danh mục</li>
                    ) : (
                        categories.map((c, i) => (
                            <li key={c.slug || c.name}>
                                <button
                                    onClick={() => {
                                        setOpenIdx(openIdx === i ? null : i)
                                        onFilter(c.slug || null, null)
                                    }}
                                    className={`w-full flex items-center justify-between py-2 px-3 rounded-xl text-sm transition-colors ${selectedCategory === (c.slug || null)
                                        ? 'bg-golden-earth-50 text-brown-bark-700 font-bold'
                                        : 'text-carbon-black-700 hover:bg-carbon-black-50 font-medium'
                                        }`}
                                >
                                    <span>{c.name}</span>
                                    <svg
                                        className={`w-3.5 h-3.5 transition-transform duration-200 ${openIdx === i ? 'rotate-180 text-brown-bark-700' : 'text-carbon-black-300'
                                            }`}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {openIdx === i && (
                                    <ul className="mt-0.5 ml-2 mb-1 space-y-0.5">
                                        {(c.subs || []).map((s) => (
                                            <li key={s.slug || s.name}>
                                                <button
                                                    onClick={() => onFilter(c.slug || null, s.slug || null)}
                                                    className={`w-full text-left flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs transition-colors ${selectedSub === (s.slug || null)
                                                        ? 'text-brown-bark-700 font-bold'
                                                        : 'text-carbon-black-500 hover:text-carbon-black-800'
                                                        }`}
                                                >
                                                    <span className={`w-1 h-1 rounded-full shrink-0 ${selectedSub === (s.slug || null) ? 'bg-brown-bark-700' : 'bg-carbon-black-200'
                                                        }`} />
                                                    {s.name}
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
