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

const FeaturedCollection = () => {
    return (
        <section className="py-16 md:py-24 bg-carbon-black-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* Header section */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-brown-bark-900 mb-4 tracking-tight">Bộ Sưu Tập Nổi Bật</h2>
                        <div className="w-16 h-1 bg-brown-bark-400 rounded-full"></div>
                    </div>
                    <p className="text-carbon-black-600 max-w-md md:text-right">Khám phá những thiết kế độc quyền từ Minh Anh, mang lại diện mạo hoàn hảo cho mọi ngành nghề.</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {collections.map((item) => (
                        <div key={item.id} className="group relative rounded-[32px] overflow-hidden bg-carbon-black-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-[500px] md:h-[600px]">
                            
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-carbon-black-900/10 group-hover:bg-carbon-black-900/30 transition-colors duration-700"></div>
                            </div>
                            
                            {/* Glassmorphic Floating Card */}
                            <div className="relative z-10 flex flex-col h-full justify-end p-6 md:p-10">
                                <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl md:text-3xl font-bold text-brown-bark-900 mb-3">{item.title}</h3>
                                    <p className="text-carbon-black-600 mb-8">{item.desc}</p>
                                    <Link
                                        to={item.link}
                                        className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold tracking-wide ${item.color} ${item.hoverColor} transition-all duration-300 w-fit`}
                                    >
                                        Khám phá ngay <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
