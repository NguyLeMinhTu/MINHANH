import React from 'react'
import BannerScrollBar from '../home/BannerScrollBar'
import TextMarquee from '../home/TextMarquee'
import CategoriesSection from '../home/CategoriesSection'
import NewProductList from '../product/NewProductList'
import BannerPromotion from '../home/BannerPromotion'
import BestSellers from '../home/BestSellers'
import FeaturedCollection from '../home/FeaturedCollection'
import Testimonials from '../home/Testimonials'
import { uiProducts } from '../../assets/catalog'

const Home = () => {
    return (
        <div>
            <BannerScrollBar />
            <TextMarquee />
            <CategoriesSection />
            <NewProductList products={uiProducts} />
            <BannerPromotion />
            <BestSellers products={uiProducts} />
            <FeaturedCollection />
            <Testimonials />
        </div>
    )
}

export default Home
