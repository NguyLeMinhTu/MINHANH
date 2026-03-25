import React from 'react'

const SupportPanel = ({ name = 'Ms Quỳnh', phone = '0886 268 268', email = 'kinhdoanh@dpha.vn', hours = '8h00 - 21h00' }) => {
    return (
        <div className="bg-brown-bark-800 rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-5 pt-5 pb-4">
                <p className="text-[10px] font-bold text-golden-earth-200 tracking-[0.18em] uppercase mb-1">Thông tin</p>
                <h3 className="text-base font-bold text-white tracking-tight leading-tight">HỖ TRỢ TƯ VẤN</h3>
            </div>

            <div className="bg-white mx-3 mb-3 rounded-xl p-4 space-y-3">
                {/* Consultant */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-golden-earth-50 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-brown-bark-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-carbon-black-400">Tư vấn viên</p>
                        <p className="text-sm font-bold text-carbon-black-900">{name}</p>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-golden-earth-50 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-brown-bark-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-carbon-black-400">Hotline</p>
                        <p className="text-sm font-bold text-brown-bark-700">{phone}</p>
                    </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-golden-earth-50 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-brown-bark-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-carbon-black-400">Giờ làm việc</p>
                        <p className="text-sm font-bold text-carbon-black-900">{hours}</p>
                    </div>
                </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-2 px-3 pb-4">
                <a
                    href={`https://zalo.me/${phone.replace(/\s/g, '')}`}
                    target="_blank" rel="noreferrer"
                    className="flex-1 bg-brown-bark-700 hover:bg-brown-bark-800 text-white rounded-xl py-2.5 text-xs font-bold text-center transition-colors"
                >
                    Nhắn Zalo
                </a>
                <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex-1 bg-white hover:bg-carbon-black-50 text-brown-bark-900 rounded-xl py-2.5 text-xs font-bold text-center transition-colors"
                >
                    Gọi ngay
                </a>
            </div>
        </div>
    )
}

export default SupportPanel
