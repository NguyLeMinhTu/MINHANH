import React from 'react';
import zaloImg from '../../assets/Foating-zalo.png';

export default function FloatingZalo({ href = '#', title = 'TƯ VẤN QUA', label = 'ZALO' }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${title} ${label}`}
            className="relative h-11 md:h-12 rounded-full shadow-2xl overflow-visible pl-12 md:pl-14 pr-4 md:pr-5 bg-blue-500 text-white flex items-center hover:opacity-95 transition-opacity">
            <span className="absolute -left-1.5 md:-left-2 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-blue-500 shadow-2xl flex items-center justify-center">
                <img src={zaloImg} alt="" className="w-7 h-7 md:w-8 md:h-8 object-contain" aria-hidden />
            </span>

            <span className="flex flex-col leading-tight gap-0.5 md:gap-0">
                <span className="text-[10px] md:text-xs font-semibold tracking-wide uppercase opacity-95">{title}</span>
                <span className="text-[13px] md:text-[15px] font-extrabold">{label}</span>
            </span>
        </a>
    );
}
