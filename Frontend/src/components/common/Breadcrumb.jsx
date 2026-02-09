import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    // Mapping for readable names
    const nameMap = {
        'san-pham': 'Sản phẩm',
        've-chung-toi': 'Về chúng tôi',
        'tin-tuc': 'Tin tức',
        'lien-he': 'Liên hệ',
        'cua-hang': 'Cửa hàng',
        // Add more as needed
    };

    const getName = (slug) => {
        // Try to find in map, else capitalize and replace dashes
        return nameMap[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    if (pathnames.length === 0) return null;

    return (
        <nav className="bg-white py-3 px-4 shadow-sm">
            <div className="max-w-7xl mx-auto">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                    <li>
                        <Link to="/" className="hover:text-[#af7b51] transition-colors">
                            Trang chủ
                        </Link>
                    </li>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        return (
                            <li key={name} className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                {isLast ? (
                                    <span className="text-gray-900 font-medium">{getName(name)}</span>
                                ) : (
                                    <Link to={routeTo} className="hover:text-[#af7b51] transition-colors">
                                        {getName(name)}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
}