import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({ products = [] }) => {
    return (
        <div>
            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <svg className="w-12 h-12 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-bold text-gray-300">Không tìm thấy sản phẩm</p>
                    <p className="text-sm text-gray-400 mt-1">Thử chọn danh mục khác</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                    {products.map((p, i) => (
                        <ProductCard key={i} product={p} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductList
