import React from 'react';
import { Star } from 'lucide-react';

const testimonialsData = [
    {
        id: 1,
        name: 'Nguyễn Trần Tâm',
        role: 'Giám đốc Nhân sự',
        content: 'Các bộ đồng phục từ Minh Anh Form rất chuẩn, chất liệu vải cá sấu mặc rất mát mẻ và bền màu. Nhân viên công ty tôi ai cũng khen ngợi.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Trần Thị Thu Phương',
        role: 'Trưởng phòng Sales',
        content: 'Thiết kế đẹp, thêu logo sắc nét. Thời gian giao hàng đúng cam kết và dịch vụ hỗ trợ khách hàng vô cùng chuyên nghiệp. Sẽ tiếp tục ủng hộ.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Lê Văn Hoàng',
        role: 'Quản lý Dự án',
        content: 'Chúng tôi đặt đồ bảo hộ cho anh em kỹ thuật. Vải kaki dày dặn nhưng vẫn thoáng mát. Các chi tiết phản quang làm rất tỉ mỉ an toàn.',
        rating: 4,
    }
];

const Testimonials = () => {
    return (
        <section className="py-12 md:py-20 bg-golden-earth-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-brown-bark-900 mb-4">Khách hàng nói gì về chúng tôi?</h2>
                <div className="w-24 h-1 bg-brown-bark-400 mx-auto mb-10 md:mb-14 rounded-full"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonialsData.map((item) => (
                        <div key={item.id} className="bg-white p-8 rounded-2xl shadow-sm border border-golden-earth-200 text-left hover:shadow-md transition-shadow">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`w-5 h-5 ${i < item.rating ? 'text-brown-bark-500 fill-brown-bark-500' : 'text-gray-300'}`} 
                                    />
                                ))}
                            </div>
                            <p className="text-carbon-black-700 italic mb-6 line-clamp-4">"{item.content}"</p>
                            <div>
                                <h4 className="font-bold text-brown-bark-900">{item.name}</h4>
                                <span className="text-sm text-carbon-black-500">{item.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
