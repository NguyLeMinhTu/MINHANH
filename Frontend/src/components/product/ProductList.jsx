import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({ products = [] }) => {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
                <div>Hiển thị 1-{Math.min(24, products.length)} của {products.length} kết quả</div>
                <div>
                    <select className="px-3 py-2 border rounded" defaultValue="new">
                        <option value="new">Mới nhất</option>
                        <option value="price-asc">Giá: thấp → cao</option>
                        <option value="price-desc">Giá: cao → thấp</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p, i) => (
                    <ProductCard key={i} product={p} />
                ))}
            </div>
        </div>
    )
}

export default ProductList
