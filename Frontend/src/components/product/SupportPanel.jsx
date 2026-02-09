import React from 'react'

const SupportPanel = ({ name = 'Ms Quỳnh', phone = '0886 268 268', email = 'kinhdoanh@dpha.vn', hours = '8h00 - 21h00' }) => {
    const primary = '#af7b51'
    return (
        <div className="rounded-md mt-4 border border-gray-100 overflow-hidden">
            <div className="bg-[#af7b51] text-white px-3 py-2 font-semibold text-xs text-center">HỖ TRỢ TƯ VẤN</div>

            <div className="p-3 text-gray-800 text-sm">
                <div className="mb-1 text-sm">{name}</div>
                <div className="font-bold mb-2 text-sm">{phone}</div>
                <div className="mb-2 text-sm">Email<br /><a href={`mailto:${email}`} className="text-gray-700">{email}</a></div>
                <div className="mb-2 text-sm">Thời gian làm việc<br /><strong>Giờ mở cửa: {hours}</strong></div>

                <div className="flex gap-2">
                    <button className="flex-1 bg-[#af7b51] text-white rounded-md py-1.5 px-2 text-sm">Nhắn qua zalo</button>
                    <button className="flex-1 bg-white text-[#af7b51] border-2 border-[#af7b51] rounded-md py-1.5 px-2 text-sm">Gọi ngay</button>
                </div>
            </div>
        </div>
    )
}

export default SupportPanel
