import React from "react";
import { Link } from "react-router-dom";
import CongThanhToan from "../../assets/CongThanhToan.png";
import Logo from "../../assets/LOGOMINHANH.png";

export default function Footer({ primary = "#af7b51" }) {
    return (
        <footer className="bg-gradient-to-b from-brown-bark-800/95 to-brown-bark-700 text-golden-earth-50" aria-label="site-footer">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">CÔNG TY CỔ PHẦN XNK MAY HẢI ANH</h3>
                        <div className="text-base text-golden-earth-100 space-y-4">
                            <div>
                                <div className="font-medium mb-2">Hệ thống Showroom:</div>
                                <ul className="list-disc ml-5">
                                    <li>268 Nguyễn Huy Tưởng, Phường Thanh Xuân, TP. Hà Nội</li>
                                    <li>110 Trường Chinh, Phường Kim Liên, TP. Hà Nội</li>
                                    <li>307 Cầu Giấy, Phường Cầu Giấy, TP. Hà Nội</li>
                                    <li>757 Cách Mạng Tháng 8, Phường Tân Hòa, TP. Hồ Chí Minh</li>
                                </ul>
                            </div>

                            <div>
                                <div className="font-medium text-golden-earth-100">Xưởng sản xuất:</div>
                                <ul className="list-disc ml-5">
                                    <li>Thôn Phú Hữu, Xã Tiến Thắng, TP. Hà Nội</li>
                                    <li>Khu Hoàng Xá, Xã Hoàng Cương, Tỉnh Phú Thọ</li>
                                </ul>
                            </div>

                            <div className="flex items-center gap-4 mt-2 text-base">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-golden-earth-100" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 8l7-5 7 5v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span>Hotline: <strong>0886.268.268</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">HỖ TRỢ KHÁCH HÀNG</h3>
                        <ul className="text-base text-golden-earth-100 space-y-3">
                            <li><Link to="/faq" className="hover:underline">Câu hỏi thường gặp</Link></li>
                            <li><Link to="/doi-tra" className="hover:underline">Chính sách đổi trả & bảo hành</Link></li>
                            <li><Link to="/ho-tro" className="hover:underline">Chính sách hỗ trợ khách hàng</Link></li>
                            <li><Link to="/dieu-khoan" className="hover:underline">Điều khoản & Dịch vụ</Link></li>
                            <li><Link to="/thanh-toan" className="hover:underline">Thanh toán & Vận chuyển</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold mb-4">TIN TỨC</h3>
                        <ul className="text-base text-golden-earth-100 space-y-3 mb-6">
                            <li><Link to="/tin-tuc?dm=khuyen-mai" className="hover:underline">Khuyến mãi</Link></li>
                            <li><Link to="/tin-tuc?dm=su-kien" className="hover:underline">Sự kiện</Link></li>
                        </ul>
                        <h3 className="text-lg font-bold mb-4">VỊ TRÍ VĂN PHÒNG</h3>
                        <div className="w-full h-64 rounded-md overflow-hidden flex-1">
                            <iframe
                                title="Minh Anh Location - Can Tho"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.050!2d105.7717!3d10.0294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a088186f0d0001%3A0x1234567890abc!2sHoa%20Binh%20Street%20Can%20Tho!5e0!3m2!1svi!2sus!4v1712500000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <img src={Logo} alt="Logo Footer" className="h-30 w-auto items-center rounded-md object-contain mx-auto " />
            <div className="text-golden-earth-100 text-center text-sm py-4">
                © 2026 Minh Anh Uniform. All rights reserved.
            </div>

        </footer>
    );
}
