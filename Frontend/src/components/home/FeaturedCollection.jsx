import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import img1 from '../../assets/collection-cong-so.jpg';
import img2 from '../../assets/collection-bao-ho.jpg';

const collections = [
    {
        id: 1,
        title: "Bộ Sưu Tập Công Sở",
        desc: "Thanh lịch, sang trọng và chuyên nghiệp trong từng đường may.",
        img: img1,
        link: "/san-pham?dm=dong-phuc-cong-so",
        color: "bg-golden-earth-500",
        hoverColor: "hover:bg-golden-earth-600"
    },
    {
        id: 2,
        title: "Trang Bị Bảo Hộ",
        desc: "An toàn là trên hết. Đảm bảo chất lượng tiêu chuẩn quốc tế.",
        img: img2,
        link: "/san-pham?dm=dong-phuc-bao-ho",
        color: "bg-brown-bark-600",
        hoverColor: "hover:bg-brown-bark-700"
    }
];

const FeaturedCollection = ({ collections = [] }) => {
    // Nếu chưa có dữ liệu từ backend, trả về null hoặc data mặc định nếu muốn
    if (!collections || collections.length === 0) return null;

    // Chỉ lấy tối đa 4 bộ sưu tập nổi bật
    const displayItems = collections.slice(0, 4);

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Tiêu đề phần */}
                <div className="mb-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-brown-bark-900 mb-3 tracking-tight">BỘ SƯU TẬP NỔI BẬT</h2>
                    <div className="w-12 h-1 bg-golden-earth-400 mx-auto rounded-full"></div>
                </div>

                {/* Grid banner ảnh to */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {displayItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.link || '/san-pham'}
                            className="group relative block aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-sm"
                        >
                            {/* Image with zoom effect */}
                            <img
                                src={item.urlHinh}
                                alt={item.tieuDe}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            
                            {/* Simple Overlay on Bottom */}
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{item.tieuDe}</h3>
                                <p className="text-white/80 text-sm font-medium flex items-center gap-2">
                                    Xem ngay <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
