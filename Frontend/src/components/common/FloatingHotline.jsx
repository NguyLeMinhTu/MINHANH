import React from 'react';
import hotImg from "../../assets/Foating-hotline.png";

function formatPhoneDisplay(phoneHref) {
    if (!phoneHref) return '';
    const raw = String(phoneHref).replace(/^tel:/i, '').trim();
    const digits = raw.replace(/\D/g, '');
    if (digits.length === 10) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    if (digits.length === 11) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    return raw;
}

export default function FloatingHotline({ phone = 'tel:0886268268', title = 'HOTLINE TƯ VẤN', display }) {
    const displayText = display ?? formatPhoneDisplay(phone) ?? '';
    return (
        <a
            href={phone}
            aria-label={`${title}${displayText ? `: ${displayText}` : ''}`}
            className="relative h-14 md:h-16 rounded-full shadow-2xl overflow-visible pl-14 md:pl-16 pr-6 bg-red-600 text-white flex items-center hover:opacity-95 transition-opacity">
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-2xl flex items-center justify-center">
                <img src={hotImg} alt="" className="w-11 h-11 md:w-13 md:h-13 object-contain" aria-hidden />
            </span>

            <span className="flex flex-col leading-none">
                <span className="text-xs md:text-sm font-semibold tracking-wide uppercase opacity-95">{title}</span>
                <span className="text-base md:text-lg font-extrabold">{displayText}</span>
            </span>
        </a>
    );
}
