import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../common/Title';
import { danh_muc_san_pham as local_danh_muc } from '../../assets/dataset';

const CategoriesSection = ({ categories = [] }) => {
    // Sử dụng danh mục từ backend nếu có, ngược lại dùng dữ liệu mẫu
    const activeCategories = categories.length > 0 ? categories : local_danh_muc;

    // Lọc ra danh sách danh mục để hiển thị (phiên bản backend dùng hinhAnh, local dùng hinh_anh)
    const displayCategories = activeCategories.filter(dm => 
        (typeof dm.hinhAnh === 'string') || (typeof dm.hinh_anh === 'string')
    );
    
    // Tạo Map để tra cứu parent nhanh chóng
    const catById = new Map(activeCategories.map(c => [c.danhMucId || c.danh_muc_id, c]));

    return (
        <section className="py-12 md:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative">

                {/* Decoration background shapes */}
                <div className="absolute top-0 right-10 w-64 h-64 bg-golden-earth-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-golden-earth-100 rounded-full blur-3xl opacity-20 pointer-events-none" />

                <div className="text-center mb-12 md:mb-16 relative z-10">
                    <Title
                        title="Danh Mục Sản Phẩm"
                        size="md"
                        className="flex justify-center"
                        titleClassName="text-brown-bark-800 tracking-[0.2em] uppercase text-xl md:text-2xl font-black"
                    />
                    <p className="text-carbon-black-600 mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Khám phá các dòng sản phẩm đồng phục chất lượng cao, thiết kế chuẩn phom dáng dành riêng cho doanh nghiệp và tổ chức.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 relative z-10">
                    {displayCategories.map((dm, index) => {
                        const id = dm.danhMucId || dm.danh_muc_id || dm.id || `cat-${index}`;
                        const name = dm.tenDanhMuc || dm.ten_danh_muc;
                        const img = dm.hinhAnh || dm.hinh_anh;
                        const parentId = dm.parentId || dm.parent_id;

                        const parent = parentId ? catById.get(parentId) : null;
                        const linkUrl = parent 
                            ? `/san-pham?dm=${encodeURIComponent(parent.slug)}&sub=${encodeURIComponent(dm.slug)}`
                            : `/san-pham?dm=${encodeURIComponent(dm.slug)}`;

                        return (
                            <Link
                                key={id}
                                to={linkUrl}
                                onClick={() => window.scrollTo(0, 0)}
                                className="group relative block aspect-[2/3] overflow-hidden rounded-lg bg-slate-50 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                            >
                                {/* Hình nền danh mục - Full bleed (2:3 Ratio) */}
                                <img
                                    src={img}
                                    alt={name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />
                                
                                {/* Gradient Overlay - Phủ tối phía dưới để nổi bật chữ */}
                                <div className="absolute inset-0 bg-gradient-to-t from-carbon-black-900/90 via-carbon-black-900/20 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-70" />
                                
                                {/* Nội dung chữ - Phông chữ đậm và to hơn theo yêu cầu */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center pb-8">
                                    <h3 
                                        className="text-white text-lg md:text-xl font-semibold uppercase tracking-widest leading-tight transition-transform duration-300 group-hover:-translate-y-2 font-sans"
                                        style={{ fontFamily: "Arial, sans-serif" }}
                                    >
                                        {name}
                                    </h3>
                                    <div className="w-12 h-1 bg-golden-earth-400 rounded-full mt-3 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
