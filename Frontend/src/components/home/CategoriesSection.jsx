import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-golden-earth-50/30 to-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 relative">

                {/* Decoration background shapes */}
                <motion.div
                    className="absolute top-0 right-10 w-72 h-72 bg-golden-earth-100 rounded-full blur-3xl opacity-40 pointer-events-none"
                    animate={{
                        y: [0, 30, 0],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-10 left-10 w-80 h-80 bg-dark-goldenrod-100 rounded-full blur-3xl opacity-30 pointer-events-none"
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="text-center mb-14 md:mb-20 relative z-10"
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <Title
                        title="Danh Mục Sản Phẩm"
                        size="md"
                        className="flex justify-center"
                        titleClassName="text-dark-goldenrod-700 tracking-[0.3em] uppercase text-2xl md:text-3xl font-bold"
                    />
                    <motion.p
                        className="text-carbon-black-600 mt-5 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Khám phá các dòng sản phẩm đồng phục chất lượng cao, thiết kế chuẩn phom dáng dành riêng cho doanh nghiệp và tổ chức.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
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
                            <motion.div
                                key={id}
                                variants={itemVariants}
                            >
                                <Link
                                    to={linkUrl}
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="group relative block aspect-[2/3] overflow-hidden rounded-xl bg-carbon-black-100 shadow-lg transition-all duration-500 hover:shadow-2xl"
                                >
                                    {/* Hình nền danh mục - Full bleed (2:3 Ratio) */}
                                    <motion.img
                                        src={img}
                                        alt={name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    />

                                    {/* Gradient Overlay - Phủ tối phía dưới để nổi bật chữ */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-carbon-black-950/95 via-carbon-black-900/40 to-transparent opacity-60"
                                        initial={{ opacity: 0.6 }}
                                        whileHover={{ opacity: 0.8 }}
                                        transition={{ duration: 0.4 }}
                                    />

                                    {/* Nội dung chữ - Phông chữ đậm và to hơn theo yêu cầu */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center pb-8">
                                        <motion.h3
                                            className="text-white text-lg md:text-xl font-bold uppercase tracking-widest leading-snug"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileHover={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {name}
                                        </motion.h3>
                                        <motion.div
                                            className="w-10 h-1 bg-gradient-to-r from-transparent via-golden-earth-400 to-transparent rounded-full mt-4"
                                            initial={{ scaleX: 0, opacity: 0 }}
                                            whileHover={{ scaleX: 1, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        />

                                        {/* Arrow icon */}
                                        <motion.svg
                                            className="w-6 h-6 text-golden-earth-300 mt-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            initial={{ opacity: 0, y: -10 }}
                                            whileHover={{ opacity: 1, y: 5 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </motion.svg>
                                    </div>

                                    {/* Shine effect on hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                    />
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default CategoriesSection;
