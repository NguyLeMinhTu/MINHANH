import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../assets/banner-home.jpg';

const BannerPromotion = () => {
    return (
        <section className="py-6 md:py-10 bg-carbon-black-50">
            <div className="max-w-5xl mx-auto px-3 md:px-4">
                <Link
                    to="/san-pham?dm=ao-dong-phuc-cong-ty"
                    onClick={() => window.scrollTo(0, 0)}
                    className="block overflow-hidden rounded-2xl md:rounded-[32px]"
                >
                    <img
                        src={bannerImg}
                        alt="Đồng phục công ty Minh Anh"
                        className="w-full h-auto object-cover md:object-contain transition-all"
                    />
                </Link>
            </div>
        </section>
    );
};

export default BannerPromotion;
