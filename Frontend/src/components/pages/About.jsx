import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Factory, Users, Award, Laptop, Mail, Ruler, Truck, ShieldCheck, Zap, ArrowRightToLine } from 'lucide-react'

import Title from '../common/Title'
import bannerGioiThieu from '../../assets/banner-gioi-thieu.jpg'
import logoMinhAnh from '../../assets/logo.png'
import aboutTailor from '../../assets/about-tailor.png'
import aboutShowroom from '../../assets/about-showroom.png'
import aboutQuality from '../../assets/about-quality.png'

const About = () => {
    const jsonLd = useMemo(() => {
        const origin = typeof window !== 'undefined' ? window.location.origin : ''
        const pageUrl = origin ? `${origin}/gioi-thieu` : '/gioi-thieu'

        return JSON.stringify(
            {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Minh Anh Uniform',
                url: pageUrl,
                logo: origin ? new URL(logoMinhAnh, origin).toString() : logoMinhAnh,
                image: origin ? new URL(bannerGioiThieu, origin).toString() : bannerGioiThieu,
                description:
                    'Minh Anh Uniform cung cấp giải pháp đồng phục doanh nghiệp chuyên nghiệp: áo polo, áo thun, sơ mi công sở và đồng phục may theo yêu cầu.',
                sameAs: [],
            },
            null,
            2,
        )
    }, [])

    return (
        <main className="bg-[#fafafa]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

            {/* --- HERO SECTION --- */}
            <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center">
                <img
                    src={bannerGioiThieu}
                    alt="Banner giới thiệu Minh Anh Uniform"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brown-bark-950/80 via-brown-bark-950/40 to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-left font-heading">
                    <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-1000">
                        <p className="text-golden-earth-400 font-bold tracking-[0.3em] uppercase mb-4 text-sm sm:text-base">Tinh hoa đồng phục</p>
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tighter">
                            Nâng tầm nhận diện <br /> <span className="text-golden-earth-400">Vững bước thành công</span>
                        </h1>
                        <p className="text-lg text-white/80 font-medium max-w-md leading-relaxed font-sans">
                            Giải pháp đồng phục doanh nghiệp trọn gói: Từ tư vấn thiết kế đến sản xuất chất lượng cao, giúp thương hiệu của bạn tỏa sáng.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-20 space-y-32">

                {/* --- WHO WE ARE (SPLIT SECTION) --- */}
                <section className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-block p-1 px-3 rounded-full bg-brown-bark-50 border border-brown-bark-100 text-brown-bark-700 text-[10px] font-bold uppercase tracking-widest">Về chúng tôi</div>
                        <h2 className="text-3xl md:text-4xl font-bold text-brown-bark-950 tracking-tight leading-tight uppercase font-heading">
                            Minh Anh Uniform: <br /> Đối tác đồng phục tin cậy của hàng nghìn doanh nghiệp
                        </h2>
                        <div className="space-y-4 text-carbon-black-600 leading-relaxed text-base font-medium font-sans">
                            <p>
                                Minh Anh Uniform không chỉ là một xưởng may, chúng tôi là xưởng sáng tạo giải pháp nhận diện. Chúng tôi tập trung vào các dòng sản phẩm đồng phục doanh nghiệp cao cấp: từ polo năng động, sơ mi công sở chỉn chu đến các mẫu bảo hộ lao động đạt chuẩn.
                            </p>
                            <p>
                                Sứ mệnh của chúng tôi là giúp mỗi nhân viên cảm thấy tự hào khi khoác lên mình bộ đồng phục, đồng thời giúp doanh nghiệp xây dựng phong cách chuyên nghiệp, nhất quán trên mọi điểm chạm.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-4">
                            {[
                                { icon: <Award className="w-5 h-5" />, label: "10+ Năm kinh nghiệm" },
                                { icon: <Users className="w-5 h-5" />, label: "5000+ Khách hàng" },
                                { icon: <Zap className="w-5 h-5" />, label: "3-5 Ngày thiết kế" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 bg-white shadow-sm border border-carbon-black-100 p-3 rounded-2xl transition-transform hover:scale-105">
                                    <div className="text-golden-earth-600 font-bold">{item.icon}</div>
                                    <span className="text-xs font-bold text-carbon-black-800 uppercase tracking-tighter">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-golden-earth-200/30 rounded-[40px] blur-2xl group-hover:bg-golden-earth-300/40 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                        <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-4/3 flex items-center justify-center">
                            <img src={aboutShowroom} alt="Showroom Minh Anh" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                    </div>
                </section>

                {/* --- SERVICES GRID --- */}
                <section className="space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4 font-heading">
                        <h2 className="text-3xl font-bold text-carbon-black-900 uppercase tracking-tighter leading-tight">Mô hình dịch vụ chuyên nghiệp</h2>
                        <div className="w-16 h-1.5 bg-golden-earth-500 mx-auto rounded-full" />
                        <p className="text-carbon-black-500 font-medium font-sans italic text-sm">Tối ưu hóa hình ảnh thương hiệu thông qua các dòng sản phẩm đồng phục được chọn lọc kỹ lưỡng.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Áo Polo', desc: 'Lịch sự, năng động, chất vải Cá sấu cao cấp.', link: '/san-pham?dm=ao-polo-dong-phuc' },
                            { title: 'Áo Thun', desc: 'Trẻ trung, thoáng mát, in thêu logo sắc nét.', link: '/san-pham?dm=ao-thun-dong-phuc' },
                            { title: 'Công Sở', desc: 'Sơ mi, quần âu chuẩn form, chỉn chu chuyên nghiệp.', link: '/san-pham?dm=dong-phuc-cong-so' },
                            { title: 'May Sẵn', desc: 'Giải pháp nhanh gọn, giao ngay trong 24h.', link: '/dong-phuc-may-san' }
                        ].map((item, i) => (
                            <Link key={i} to={item.link} className="group relative bg-white border border-carbon-black-100 p-8 rounded-[32px] transition-all hover:shadow-2xl hover:-translate-y-2 overflow-hidden flex flex-col items-center text-center">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-golden-earth-50/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                                <div className="relative space-y-4">
                                    <div className="w-14 h-14 mx-auto rounded-2xl bg-golden-earth-100 text-brown-bark-700 flex items-center justify-center transition-colors group-hover:bg-golden-earth-500 group-hover:text-white shadow-lg group-hover:rotate-12 duration-300">
                                        {i === 0 ? <Zap className="w-6 h-6" /> : i === 1 ? <Users className="w-6 h-6" /> : i === 2 ? <Award className="w-6 h-6" /> : <Truck className="w-6 h-6" />}
                                    </div>
                                    <h3 className="text-lg font-bold text-carbon-black-900 uppercase tracking-tight font-heading">{item.title}</h3>
                                    <p className="text-xs text-carbon-black-500 font-medium leading-relaxed font-sans">{item.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* --- PROCESS (HIGHLIGHT TIMELINE) --- */}
                <section className="bg-gradient-to-br from-brown-bark-800 via-brown-bark-700 to-golden-earth-700 rounded-[50px] p-10 md:p-20 text-white relative overflow-hidden group/process">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <img src={aboutTailor} alt="Tailoring background" className="w-full h-full object-cover transition-transform duration-[10s] group-hover/process:scale-110" />
                    </div>
                    <div className="relative z-10 space-y-16">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 font-heading">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold uppercase tracking-tighter">Quy trình sản xuất chuyên nghiệp</h2>
                                <p className="text-white/60 font-medium max-w-sm font-sans text-sm italic">Quy trình 4 bước tiêu chuẩn đảm bảo chất lượng từ khâu tư vấn đến khi sản phẩm tới tay khách hàng.</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="p-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"><Ruler className="w-5 h-5 text-golden-earth-400" /></div>
                                <div className="p-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"><Truck className="w-5 h-5 text-golden-earth-400" /></div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { step: '01', title: 'Tư vấn', desc: 'Số lượng, ngân sách, chất liệu & in thêu logo.' },
                                { step: '02', title: 'Thiết kế', desc: 'Lên market sản phẩm, duyệt logo & sizing.' },
                                { step: '03', title: 'May mẫu', desc: 'Kiểm tra chất vải thực tế & độ bền màu mẫu.' },
                                { step: '04', title: 'Bàn giao', desc: 'Hoàn thiện, kiểm tra KCS & giao tận nơi.' }
                            ].map((item, i) => (
                                <div key={i} className="group/item relative border-l-2 border-white/10 pl-8 space-y-4 hover:border-golden-earth-500 transition-colors duration-500">
                                    <div className="absolute -left-0.5 top-0 w-1 h-0 bg-golden-earth-500 transition-all duration-700 group-hover/item:h-full" />
                                    <div className="text-5xl font-bold text-white/5 group-hover/item:text-golden-earth-500 transition-colors italic tracking-tighter duration-500">{item.step}</div>
                                    <h4 className="text-xl font-bold uppercase tracking-tighter text-golden-earth-400 font-heading leading-tight">{item.title}</h4>
                                    <p className="text-xs text-white/60 font-medium leading-relaxed font-sans">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- QUALITY COMMITMENT (WIDE SECTION) --- */}
                <section className="flex flex-col lg:flex-row rounded-[40px] bg-white border border-carbon-black-100 overflow-hidden shadow-sm group/quality">
                    <div className="lg:w-1/2 p-10 md:p-16 space-y-10 flex flex-col justify-center">
                        <div className="space-y-4 font-heading">
                            <h2 className="text-3xl font-bold text-carbon-black-900 uppercase tracking-tighter leading-[0.9]">Cam kết về <br /> <span className="text-golden-earth-600">từng đường kim mũi chỉ</span></h2>
                            <p className="text-carbon-black-400 font-medium text-sm font-sans italic">Chúng tôi không chỉ may áo, chúng tôi may niềm tự hào cho doanh nghiệp bạn.</p>
                        </div>
                        <div className="space-y-6">
                            {[
                                { title: 'Tư vấn chuyên tâm', desc: 'Chúng tôi tư vấn chất liệu vải phù hợp nhất với điều kiện làm việc của nhân sự bạn.' },
                                { title: 'Form dáng hiện đại', desc: 'Áo may chuẩn form, đứng dáng nhưng vẫn đảm bảo sự thoáng mát và dễ vận động.' },
                                { title: 'Kiểm tra nghiêm ngặt', desc: '100% sản phẩm được kiểm tra thủ công qua khâu KCS trước khi đóng gói bàn giao.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 group/row">
                                    <div className="shrink-0 w-8 h-8 rounded-full bg-golden-earth-100 text-golden-earth-600 flex items-center justify-center group-hover/row:bg-golden-earth-500 group-hover/row:text-white transition-colors duration-300">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h5 className="text-base font-bold text-carbon-black-800 uppercase tracking-tighter font-heading">{item.title}</h5>
                                        <p className="text-xs text-carbon-black-500 font-medium leading-relaxed font-sans">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4">
                            <Link to="/lien-he" className="inline-flex items-center gap-2 bg-golden-earth-500 text-brown-bark-950 px-10 py-5 rounded-2xl font-bold uppercase tracking-tighter text-sm transition-all hover:bg-brown-bark-700 hover:text-white hover:scale-[1.02] shadow-xl">
                                Liên hệ nhận tư vấn ngay
                            </Link>
                        </div>
                    </div>
                    <div className="lg:w-1/2 min-h-[500px] overflow-hidden">
                        <img src={aboutQuality} alt="Quality Control" className="w-full h-full object-cover transition-transform duration-1000 group-hover/quality:scale-110" />
                    </div>
                </section>

                {/* --- FAQ SECTION --- */}
                <section className="rounded-[40px] bg-[#f8f8f8] border border-carbon-black-100 p-10 md:p-16">
                    <div className="grid lg:grid-cols-3 gap-16 items-start">
                        <div className="space-y-8 sticky top-20">
                            <div className="space-y-4 font-heading">
                                <h2 className="text-4xl font-bold text-carbon-black-900 uppercase tracking-tighter leading-tight">Câu hỏi <br /> thường gặp</h2>
                                <div className="w-12 h-1.5 bg-golden-earth-500 rounded-full" />
                            </div>
                            <p className="text-carbon-black-500 font-medium text-sm leading-relaxed font-sans italic">
                                Một vài thắc mắc phổ biến của các doanh nghiệp khi lần đầu triển khai đặt may tại Minh Anh Uniform.
                            </p>
                            <Link to="/faq" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brown-bark-800 hover:text-golden-earth-600 transition-colors">
                                Xem tất cả FAQ <ArrowRightToLine className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                            {[
                                { q: 'Nên chọn áo polo hay áo thun đồng phục?', a: 'Áo polo phù hợp môi trường cần sự lịch sự; áo thun phù hợp hoạt động năng động và triển khai số lượng lớn. Đội ngũ sẽ tư vấn cụ thể dựa trên tính chất công việc thực tế.' },
                                { q: 'Logo nên in hay thêu để bền đẹp?', a: 'Thêu tạo cảm giác cao cấp và bền bỉ vĩnh viễn; in phù hợp với logo nhiều màu sắc, chi tiết nhỏ và giúp tối ưu chi phí. Tùy theo loại vải, chúng tôi sẽ đề xuất phương án tối ưu nhất.' },
                                { q: 'Có nhận may theo thiết kế riêng không?', a: 'Minh Anh Uniform hoàn toàn hỗ trợ may theo yêu cầu mọi chi tiết: phối màu cổ áo, bo tay, điều chỉnh form dáng và in thêu logo theo đúng 100% bộ nhận diện thương hiệu.' }
                            ].map((item, i) => (
                                <details key={i} className="group bg-white border border-carbon-black-100 rounded-[24px] overflow-hidden transition-all hover:border-golden-earth-400 shadow-sm active:scale-[0.99] duration-200">
                                    <summary className="p-8 cursor-pointer list-none flex items-center justify-between">
                                        <span className="font-bold text-brown-bark-950 uppercase tracking-tighter text-base font-heading">{item.q}</span>
                                        <div className="w-10 h-10 rounded-full bg-brown-bark-50 flex items-center justify-center transition-transform group-open:rotate-180 group-open:bg-golden-earth-500 group-open:text-white">
                                            <svg className="w-5 h-5 text-brown-bark-400 group-open:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </summary>
                                    <div className="px-8 pb-8 text-sm text-carbon-black-600 font-medium leading-relaxed font-sans">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <div className="max-w-7xl mx-auto flex justify-center pb-20 px-4">
                <Link
                    to="/san-pham"
                    className="group relative inline-flex items-center gap-4 bg-white border-2 border-golden-earth-500 px-12 py-6 rounded-3xl overflow-hidden transition-all hover:gap-6"
                >
                    <div className="absolute inset-0 bg-golden-earth-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 text-lg font-bold text-brown-bark-900 uppercase tracking-widest group-hover:text-white transition-colors">Xem bộ sưu tập sản phẩm</span>
                    <ArrowRightToLine className="relative z-10 h-6 w-6 text-brown-bark-900 group-hover:text-white transition-colors" />
                </Link>
            </div>
        </main>
    )
}

export default About
