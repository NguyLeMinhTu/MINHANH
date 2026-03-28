import React, { useEffect, useState } from 'react'
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
    // State lưu trữ dữ liệu trang chủ từ backend
    const [homeData, setHomeData] = useState({
        slides: [],
        danhMuc: [],
        sanPhamNoiBat: [],
        sanPhamMoi: [],
        faq: []
    });

    // Gọi API lấy dữ liệu trang chủ khi component mount
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const response = await fetch('/api/trang-chu');
                if (response.ok) {
                    const data = await response.json();
                    console.log("Dữ liệu trang chủ nhận được:", data);
                    setHomeData(data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu trang chủ:", error);
            }
        };

        fetchHomeData();
    }, []);

    return (
        <div>
            <BannerScrollBar slides={homeData.slides} />
            <TextMarquee />
            <CategoriesSection categories={homeData.danhMuc} />
            
            {/* Nếu có dữ liệu từ backend thì dùng, không thì fallback về dữ liệu mẫu */}
            <NewProductList products={homeData.sanPhamMoi.length > 0 ? homeData.sanPhamMoi : uiProducts} />
            
            <BannerPromotion />
            
            <BestSellers products={homeData.sanPhamNoiBat.length > 0 ? homeData.sanPhamNoiBat : uiProducts} />
            
            <FeaturedCollection collections={homeData.collections} />
            <Testimonials />
        </div>
    )
}

export default Home
