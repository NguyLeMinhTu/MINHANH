import React from 'react';
import zaloImg from '../../assets/Foating-zalo.png';

export default function FloatingZalo({ href = '#' }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Zalo"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl overflow-visible relative bg-white flex items-center justify-center">
            <img src={zaloImg} alt="Zalo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />

            {/* Red badge top-right */}
            <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white" aria-hidden>
            </span>
        </a>
    );
}
