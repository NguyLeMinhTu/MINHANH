import React from 'react'
import BannerScrollBar from '../home/BannerScrollBar'
import NewProductList from '../product/NewProductList'
import { products } from '../../assets/dataProduct'

const Home = () => {
    return (
        <div>
            <BannerScrollBar />
            <NewProductList products={products} />
        </div>
    )
}

export default Home
