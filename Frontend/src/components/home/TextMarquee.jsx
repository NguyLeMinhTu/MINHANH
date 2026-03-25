import React from 'react';

const TextMarquee = () => {
    const messages = [
        "Minh Anh Uniform – Đồng phục cao cấp",
        "Trao giá trị - Nhận niềm tin",
        "Tham khảo mẫu - Tư vấn ngay !"
    ];

    return (
        <div className="w-full bg-gradient-to-r from-golden-earth-100 via-golden-earth-50 to-golden-earth-100 border-y border-carbon-black-100 py-2.5 overflow-hidden flex relative select-none group">
            <style>
                {`
                    @keyframes marquee-scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee-smooth {
                        animation: marquee-scroll 50s linear infinite;
                    }
                    .group:hover .animate-marquee-smooth {
                        animation-play-state: paused;
                    }
                `}
            </style>

            <div className="flex items-center w-max animate-marquee-smooth">
                {/* Render two identical large halves so translateX(-50%) loops exactly */}
                {[0, 1].map((halfIdx) => (
                    <div key={halfIdx} className="flex items-center shrink-0">
                        {/* Repeat messages multiple times within each half to assure it fills the screen */}
                        {[0, 1, 2].map((repeatIdx) => (
                            <React.Fragment key={`${halfIdx}-${repeatIdx}`}>
                                {messages.map((msg, idx) => (
                                    <div key={idx} className="flex items-center px-4 md:px-10">
                                        <span className="text-xs md:text-sm font-bold tracking-wider uppercase text-brown-bark-800 whitespace-nowrap">
                                            {msg}
                                        </span>
                                        <span className="w-1.5 h-1.5 mx-4 md:mx-10 rounded-full bg-dark-goldenrod-400 shrink-0" />
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TextMarquee;
