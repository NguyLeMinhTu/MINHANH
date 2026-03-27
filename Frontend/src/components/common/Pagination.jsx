import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalElements, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalElements / pageSize);

    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 7;

        if (totalPages <= maxPagesToShow) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(renderButton(i));
            }
        } else {
            // Luôn hiện trang đầu
            pages.push(renderButton(0));

            if (currentPage > 3) {
                pages.push(<span key="dots1" className="px-2 text-carbon-black-400">...</span>);
            }

            // Các trang xung quanh trang hiện tại
            const start = Math.max(1, currentPage - 1);
            const end = Math.min(totalPages - 2, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (i === 0 || i === totalPages - 1) continue;
                pages.push(renderButton(i));
            }

            if (currentPage < totalPages - 4) {
                pages.push(<span key="dots2" className="px-2 text-carbon-black-400">...</span>);
            }

            // 3 trang cuối cùng (theo yêu cầu của user)
            for (let i = totalPages - 3; i < totalPages; i++) {
                if (i <= (currentPage + 1) && i > 0 && i < totalPages - 1 && currentPage >= totalPages - 4) continue; // Tránh trùng
                if (pages.find(p => p.key === i.toString())) continue; // Thực sự tránh trùng
                pages.push(renderButton(i));
            }
        }
        return pages;
    };

    const renderButton = (i) => (
        <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                currentPage === i
                    ? 'bg-brown-bark-800 text-golden-earth-50 shadow-lg scale-110'
                    : 'text-carbon-black-600 hover:bg-carbon-black-50 hover:text-carbon-black-900 border border-transparent hover:border-carbon-black-100'
            }`}
        >
            {i + 1}
        </button>
    );

    return (
        <div className="flex items-center justify-center gap-2 py-12">
            <button
                onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-carbon-black-100 text-carbon-black-400 hover:bg-carbon-black-50 hover:text-carbon-black-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
                {renderPageNumbers()}
            </div>

            <button
                onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-carbon-black-100 text-carbon-black-400 hover:bg-carbon-black-50 hover:text-carbon-black-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Pagination;
