import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../common/Title';
import { danh_muc_san_pham } from '../../assets/dataset';

const CategoriesSection = () => {
    // Lọc ra danh sách danh mục để hiển thị (chỉ lấy các danh mục có hinh_anh là string import - bỏ qua object icon)
    const displayCategories = danh_muc_san_pham.filter(dm => typeof dm.hinh_anh === 'string');
    
    // Tạo Map để tra cứu parent nhanh chóng
    const catById = new Map(danh_muc_san_pham.map(c => [c.danh_muc_id, c]));

    return (
        <section className="py-12 md:py-16 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 relative">

                {/* Decoration background shapes */}
                <div className="absolute top-0 right-10 w-64 h-64 bg-golden-earth-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-golden-earth-100 rounded-full blur-3xl opacity-20 pointer-events-none" />

                <div className="text-center mb-10 md:mb-12 relative z-10">
                    <Title
                        title="Danh Mục Sản Phẩm"
                        size="md"
                        className="flex justify-center"
                        titleClassName="text-brown-bark-800 tracking-[0.15em] uppercase text-xl md:text-2xl font-black"
                    />
                    <p className="text-carbon-black-600 mt-3 text-sm md:text-base max-w-2xl mx-auto">
                        Khám phá các dòng sản phẩm đồng phục chất lượng cao, thiết kế chuẩn phom dáng dành riêng cho doanh nghiệp và tổ chức.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 relative z-10">
                    {displayCategories.map((dm) => {
                        const parent = dm.parent_id ? catById.get(dm.parent_id) : null;
                        const linkUrl = parent 
                            ? `/san-pham?dm=${encodeURIComponent(parent.slug)}&sub=${encodeURIComponent(dm.slug)}`
                            : `/san-pham?dm=${encodeURIComponent(dm.slug)}`;

                        return (
                            <Link
                                key={dm.danh_muc_id}
                                to={linkUrl}
                                onClick={() => window.scrollTo(0, 0)}
                                className="group flex flex-col items-center justify-center bg-golden-earth-50 hover:bg-white border border-transparent hover:border-golden-earth-200 rounded-[28px] p-6 md:p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1.5"
                            >
                                <div className="w-14 h-14 md:w-18 md:h-18 mb-5 bg-slate-50 border border-golden-earth-100 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                    <img
                                        src={dm.hinh_anh}
                                        alt={dm.ten_danh_muc}
                                        className="w-12 h-12 md:w-14 md:h-14 object-contain group-hover:brightness-95 transition-all"
                                    />
                                </div>
                                <h3 className="text-sm md:text-[15px] font-bold text-brown-bark-900 text-center tracking-normal uppercase transition-colors">
                                    {dm.ten_danh_muc}
                                </h3>
                                <span className="mt-2 w-8 h-1 bg-golden-earth-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
