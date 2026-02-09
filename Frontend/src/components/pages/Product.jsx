import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CategoryMenu from '../product/CategoryMenu'
import SupportPanel from '../product/SupportPanel'
import ProductList from '../product/ProductList'
import { products as sampleProducts } from '../../assets/dataProduct'

const Product = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const keyword = (searchParams.get('q') || '').trim()

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSub, setSelectedSub] = useState(null)

    // build category -> set(subs) map from sampleProducts
    const categories = useMemo(() => {
        const map = new Map()
            ; (sampleProducts || []).forEach((p) => {
                const cat = p.category || 'Khác'
                const sub = p.subCategory || 'Khác'
                if (!map.has(cat)) map.set(cat, new Set())
                map.get(cat).add(sub)
            })

        return Array.from(map.entries()).map(([name, subs]) => ({ name, subs: Array.from(subs) }))
    }, [])

    const products = sampleProducts || []

    const filteredProducts = useMemo(() => {
        let list = products

        if (selectedCategory) {
            list = list.filter((p) => p.category === selectedCategory)
        }
        if (selectedSub) {
            list = list.filter((p) => p.subCategory === selectedSub)
        }
        if (keyword) {
            const q = keyword.toLowerCase()
            list = list.filter((p) => (p.name || '').toLowerCase().includes(q))
        }

        return list
    }, [products, selectedCategory, selectedSub, keyword])

    const handleFilter = (category, sub) => {
        setSelectedCategory(category || null)
        setSelectedSub(sub || null)
    }

    return (
        <div className="flex gap-7 p-5">
            <div className="w-[18rem] h-[calc(80vh-40px)] flex flex-col gap-5">
                <CategoryMenu categories={categories} onFilter={handleFilter} selectedCategory={selectedCategory} selectedSub={selectedSub} />
                <SupportPanel />
            </div>

            <div className="flex-1 w-[calc(80%-18rem)]">
                {keyword && (
                    <div className="mb-2 text-sm text-gray-600">
                        Kết quả cho "{keyword}" ({filteredProducts.length} sản phẩm)
                    </div>
                )}
                <ProductList products={filteredProducts} />
            </div>
        </div>
    )
}

export default Product
