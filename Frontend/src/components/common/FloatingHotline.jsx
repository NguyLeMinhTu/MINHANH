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
            className="relative h-11 md:h-12 rounded-full shadow-2xl overflow-visible pl-12 md:pl-14 pr-4 md:pr-5 bg-red-500 text-white flex items-center hover:opacity-95 transition-opacity">
            <span className="absolute -left-1.5 md:-left-2 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white shadow-2xl flex items-center justify-center">
                <img src={hotImg} alt="" className="w-7 h-7 md:w-8 md:h-8 object-contain" aria-hidden />
            </span>

            <span className="flex flex-col leading-tight gap-0.5 md:gap-0">
                <span className="text-[10px] md:text-xs font-semibold tracking-wide uppercase opacity-95">{title}</span>
                <span className="text-[13px] md:text-[15px] font-extrabold">{displayText}</span>
            </span>
        </a>
    );
}
