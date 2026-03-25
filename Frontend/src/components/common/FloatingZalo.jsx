import React from 'react';
import zaloImg from '../../assets/Foating-zalo.png';

export default function FloatingZalo({ href = '#', title = 'TƯ VẤN QUA', label = 'ZALO' }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${title} ${label}`}
            className="relative h-14 md:h-16 rounded-full shadow-2xl overflow-visible pl-14 md:pl-16 pr-7 bg-blue-600 text-white flex items-center hover:opacity-95 transition-opacity">
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-600 shadow-2xl flex items-center justify-center">
                <img src={zaloImg} alt="" className="w-11 h-11 md:w-13 md:h-13 object-contain" aria-hidden />
            </span>

            <span className="flex flex-col leading-none">
                <span className="text-xs md:text-sm font-semibold tracking-wide uppercase opacity-95">{title}</span>
                <span className="text-base md:text-lg font-extrabold">{label}</span>
            </span>
        </a>
    );
}
