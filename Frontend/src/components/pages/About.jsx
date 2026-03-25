import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import Title from '../common/Title'
import bannerGioiThieu from '../../assets/banner-gioi-thieu.jpg'
import logoMinhAnh from '../../assets/logo.png'
import { ArrowRightToLine } from 'lucide-react'

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
                    'Minh Anh Uniform cung cấp giải pháp đồng phục doanh nghiệp: áo polo, áo thun, sơ mi công sở và đồng phục may theo yêu cầu.',
                sameAs: [],
            },
            null,
            2,
        )
    }, [])

    return (
        <main className="bg-carbon-black-50">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

            <section className="relative w-full overflow-hidden bg-carbon-black-950 h-[260px] sm:h-[340px] md:h-[420px]">
                <img
                    src={bannerGioiThieu}
                    alt="Banner giới thiệu Minh Anh Uniform"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-carbon-black-950/70 via-carbon-black-950/15 to-carbon-black-950/70" />
            </section>

            <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
                <section className="rounded-3xl border border-carbon-black-100 bg-white/70 p-6 sm:p-8">
                    <Title
                        overline="Minh Anh Uniform"
                        title="Giải pháp đồng phục doanh nghiệp: đẹp – bền – đồng bộ nhận diện"
                        subtitle="Từ áo polo, áo thun đến sơ mi công sở – thiết kế theo brand, chọn chất liệu phù hợp, may đúng form và hỗ trợ đặt số lượng linh hoạt."
                        size="md"
                        tone="dark"
                        align="left"
                        documentTitle="Giới thiệu | Minh Anh Uniform"
                    />

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            to="/san-pham"
                            className="inline-flex items-center justify-center rounded-full bg-golden-earth-500 px-5 py-2.5 text-sm font-semibold text-carbon-black-950 transition hover:bg-golden-earth-400"
                        >
                            Xem sản phẩm
                        </Link>
                        <Link
                            to="/lien-he"
                            className="inline-flex items-center justify-center rounded-full border border-carbon-black-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-carbon-black-900 transition hover:border-brown-bark-300"
                        >
                            Liên hệ
                        </Link>
                        <Link
                            to="/faq"
                            className="inline-flex items-center justify-center rounded-full border border-carbon-black-200 bg-transparent px-5 py-2.5 text-sm font-semibold text-carbon-black-900 transition hover:border-brown-bark-300"
                        >
                            Câu hỏi thường gặp
                        </Link>
                    </div>

                    <dl className="mt-7 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-carbon-black-100 bg-carbon-black-50 p-4">
                            <dt className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">
                                Thiết kế theo nhận diện
                            </dt>
                            <dd className="mt-1 text-sm text-carbon-black-700">
                                Màu sắc, logo, kiểu cổ tay/cổ áo đồng bộ brand.
                            </dd>
                        </div>
                        <div className="rounded-2xl border border-carbon-black-100 bg-carbon-black-50 p-4">
                            <dt className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">
                                Chất liệu chọn lọc
                            </dt>
                            <dd className="mt-1 text-sm text-carbon-black-700">
                                Tư vấn theo môi trường làm việc &amp; ngân sách.
                            </dd>
                        </div>
                        <div className="rounded-2xl border border-carbon-black-100 bg-carbon-black-50 p-4">
                            <dt className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">
                                Form mặc dễ đẹp
                            </dt>
                            <dd className="mt-1 text-sm text-carbon-black-700">
                                Ưu tiên trải nghiệm: đứng form, thoáng, dễ vận động.
                            </dd>
                        </div>
                    </dl>
                </section>

                <section className="grid gap-8 lg:grid-cols-3">
                    <article className="lg:col-span-2 space-y-8">
                        <section aria-labelledby="about-overview">
                            <h2
                                id="about-overview"
                                className="text-xl sm:text-2xl font-bold tracking-tight text-carbon-black-900"
                            >
                                Minh Anh Uniform là ai?
                            </h2>
                            <p className="mt-3 text-carbon-black-700 leading-relaxed">
                                Minh Anh Uniform tập trung vào đồng phục doanh nghiệp: từ đồng phục công sở, áo polo, áo thun đến các mẫu đồng phục may theo yêu cầu.
                                Mục tiêu của chúng tôi là giúp doanh nghiệp có hình ảnh chuyên nghiệp, đồng bộ và dễ triển khai cho nhiều bộ phận.
                            </p>
                            <p className="mt-3 text-carbon-black-700 leading-relaxed">
                                Trên website, bạn có thể xem các mẫu tham khảo, lọc theo danh mục và chọn size nhanh. Khi cần tư vấn, bạn có thể ghé{' '}
                                <Link to="/lien-he" className="font-semibold text-brown-bark-700 hover:text-brown-bark-600">
                                    liên hệ
                                </Link>{' '}
                                để được tư vấn, xem chất liệu và trao đổi chi tiết.
                            </p>
                        </section>

                        <section aria-labelledby="about-services" className="rounded-3xl border border-carbon-black-100 bg-carbon-black-50 p-6">
                            <h2 id="about-services" className="text-lg sm:text-xl font-bold text-carbon-black-900">
                                Dịch vụ &amp; danh mục đồng phục
                            </h2>
                            <p className="mt-2 text-carbon-black-700">
                                Tập trung vào các nhóm sản phẩm phổ biến, tối ưu cho đặt số lượng và sử dụng dài hạn.
                            </p>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                <Link
                                    to="/san-pham?dm=ao-dong-phuc-cong-ty"
                                    className="group rounded-2xl border border-carbon-black-100 bg-white/70 p-4 transition hover:border-brown-bark-300"
                                >
                                    <div className="text-sm font-bold text-carbon-black-900 group-hover:text-brown-bark-800">
                                        Áo đồng phục công ty
                                    </div>
                                    <div className="mt-1 text-sm text-carbon-black-600">
                                        Nhiều chất liệu, phù hợp hoạt động nội bộ &amp; sự kiện.
                                    </div>
                                </Link>

                                <Link
                                    to="/san-pham?dm=ao-polo-dong-phuc"
                                    className="group rounded-2xl border border-carbon-black-100 bg-white/70 p-4 transition hover:border-brown-bark-300"
                                >
                                    <div className="text-sm font-bold text-carbon-black-900 group-hover:text-brown-bark-800">
                                        Áo polo đồng phục
                                    </div>
                                    <div className="mt-1 text-sm text-carbon-black-600">
                                        Lịch sự – năng động, dễ phối logo và màu nhận diện.
                                    </div>
                                </Link>

                                <Link
                                    to="/san-pham?dm=dong-phuc-cong-so"
                                    className="group rounded-2xl border border-carbon-black-100 bg-white/70 p-4 transition hover:border-brown-bark-300"
                                >
                                    <div className="text-sm font-bold text-carbon-black-900 group-hover:text-brown-bark-800">
                                        Đồng phục công sở
                                    </div>
                                    <div className="mt-1 text-sm text-carbon-black-600">
                                        Sơ mi, quần âu… ưu tiên form chuẩn và chỉn chu.
                                    </div>
                                </Link>

                                <Link
                                    to="/dong-phuc-may-san"
                                    className="group rounded-2xl border border-carbon-black-100 bg-white/70 p-4 transition hover:border-brown-bark-300"
                                >
                                    <div className="text-sm font-bold text-carbon-black-900 group-hover:text-brown-bark-800">
                                        Đồng phục may sẵn
                                    </div>
                                    <div className="mt-1 text-sm text-carbon-black-600">
                                        Giải pháp nhanh gọn, phù hợp nhu cầu triển khai gấp.
                                    </div>
                                </Link>
                            </div>
                        </section>

                        <section aria-labelledby="about-process">
                            <h2 id="about-process" className="text-lg sm:text-xl font-bold text-carbon-black-900">
                                Quy trình làm đồng phục
                            </h2>
                            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                                <li className="rounded-2xl border border-carbon-black-100 bg-white/70 p-4">
                                    <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">
                                        Bước 1
                                    </div>
                                    <div className="mt-1 font-semibold text-carbon-black-900">Tư vấn nhu cầu</div>
                                    <p className="mt-1 text-sm text-carbon-black-600">
                                        Số lượng, môi trường làm việc, ngân sách, yêu cầu in/thêu.
                                    </p>
                                </li>
                                <li className="rounded-2xl border border-carbon-black-100 bg-white/70 p-4">
                                    <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">
                                        Bước 2
                                    </div>
                                    <div className="mt-1 font-semibold text-carbon-black-900">Chọn mẫu &amp; chất liệu</div>
                                    <p className="mt-1 text-sm text-carbon-black-600">
                                        Đề xuất form, bảng màu, chất vải phù hợp từng vị trí.
                                    </p>
                                </li>
                                <li className="rounded-2xl border border-carbon-black-100 bg-white/70 p-4">
                                    <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">
                                        Bước 3
                                    </div>
                                    <div className="mt-1 font-semibold text-carbon-black-900">Thiết kế &amp; duyệt</div>
                                    <p className="mt-1 text-sm text-carbon-black-600">
                                        Canh vị trí logo, màu phối, sizing; duyệt trước khi sản xuất.
                                    </p>
                                </li>
                                <li className="rounded-2xl border border-carbon-black-100 bg-white/70 p-4">
                                    <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">
                                        Bước 4
                                    </div>
                                    <div className="mt-1 font-semibold text-carbon-black-900">Sản xuất &amp; bàn giao</div>
                                    <p className="mt-1 text-sm text-carbon-black-600">
                                        Hoàn thiện, kiểm tra, đóng gói theo bộ phận (nếu cần).
                                    </p>
                                </li>
                            </ol>
                        </section>
                    </article>

                    <aside className="space-y-4">
                        <section className="rounded-3xl border border-carbon-black-100 bg-white/70 p-6">
                            <h2 className="text-base font-bold text-carbon-black-900">Cam kết chất lượng</h2>
                            <ul className="mt-3 space-y-2 text-sm text-carbon-black-700">
                                <li className="flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-golden-earth-500" />
                                    Tư vấn chất liệu theo mục đích sử dụng.
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-golden-earth-500" />
                                    Form mặc dễ đẹp, tối ưu cho nhiều size.
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-golden-earth-500" />
                                    Kiểm tra trước khi bàn giao, hạn chế lỗi phát sinh.
                                </li>
                            </ul>
                        </section>

                        <section className="rounded-3xl border border-carbon-black-100 bg-white/70 p-6">
                            <h2 className="text-base font-bold text-carbon-black-900">Xem thêm</h2>
                            <div className="mt-3 grid gap-2">
                                <Link
                                    to="/san-pham"
                                    className="rounded-2xl border border-carbon-black-100 bg-carbon-black-50 px-4 py-3 text-sm font-semibold text-carbon-black-800 transition hover:border-brown-bark-300"
                                >
                                    Trang sản phẩm
                                </Link>
                                <Link
                                    to="/thanh-toan"
                                    className="rounded-2xl border border-carbon-black-100 bg-carbon-black-50 px-4 py-3 text-sm font-semibold text-carbon-black-800 transition hover:border-brown-bark-300"
                                >
                                    Hướng dẫn thanh toán
                                </Link>
                                <Link
                                    to="/doi-tra"
                                    className="rounded-2xl border border-carbon-black-100 bg-carbon-black-50 px-4 py-3 text-sm font-semibold text-carbon-black-800 transition hover:border-brown-bark-300"
                                >
                                    Chính sách đổi trả
                                </Link>
                                <Link
                                    to="/ho-tro"
                                    className="rounded-2xl border border-carbon-black-100 bg-carbon-black-50 px-4 py-3 text-sm font-semibold text-carbon-black-800 transition hover:border-brown-bark-300"
                                >
                                    Chính sách hỗ trợ
                                </Link>
                            </div>
                        </section>
                    </aside>
                </section>

                <section className="rounded-3xl border border-carbon-black-100 bg-white/70 p-6 sm:p-8">
                    <Title
                        overline="FAQ"
                        title="Câu hỏi thường gặp về đồng phục"
                        subtitle="Một vài thắc mắc phổ biến khi đặt đồng phục doanh nghiệp."
                        as="h2"
                        size="md"
                    />

                    <div className="mt-6 grid gap-3">
                        <details className="group rounded-2xl border border-carbon-black-100 bg-carbon-black-50 px-4 py-3">
                            <summary className="cursor-pointer list-none font-semibold text-carbon-black-900">
                                Nên chọn áo polo hay áo thun đồng phục?
                            </summary>
                            <p className="mt-2 text-sm text-carbon-black-700 leading-relaxed">
                                Áo polo phù hợp môi trường cần sự lịch sự – gọn gàng; áo thun phù hợp hoạt động năng động và triển khai số lượng lớn.
                                Tốt nhất nên dựa vào công việc, thời tiết và mức độ cần “chỉn chu”.
                            </p>
                        </details>

                        <details className="group rounded-2xl border border-carbon-black-100 bg-carbon-black-50 px-4 py-3">
                            <summary className="cursor-pointer list-none font-semibold text-carbon-black-900">
                                Logo nên in hay thêu để bền đẹp?
                            </summary>
                            <p className="mt-2 text-sm text-carbon-black-700 leading-relaxed">
                                Thêu cho cảm giác cao cấp và bền; in phù hợp logo nhiều màu/chi tiết và tối ưu chi phí theo số lượng.
                                Tùy mẫu và chất vải, đội ngũ sẽ tư vấn phương án hợp lý.
                            </p>
                        </details>

                        <details className="group rounded-2xl border border-carbon-black-100 bg-carbon-black-50 px-4 py-3">
                            <summary className="cursor-pointer list-none font-semibold text-carbon-black-900">
                                Làm sao chọn size cho nhiều nhân sự?
                            </summary>
                            <p className="mt-2 text-sm text-carbon-black-700 leading-relaxed">
                                Bạn có thể dùng bảng size tham khảo trên trang sản phẩm, hoặc phân nhóm theo bộ phận và form mong muốn.
                                Khi cần, hãy liên hệ để được tư vấn nhanh về chất liệu và form.
                            </p>
                        </details>

                        <details className="group rounded-2xl border border-carbon-black-100 bg-carbon-black-50 px-4 py-3">
                            <summary className="cursor-pointer list-none font-semibold text-carbon-black-900">
                                Có nhận may theo thiết kế riêng không?
                            </summary>
                            <p className="mt-2 text-sm text-carbon-black-700 leading-relaxed">
                                Có. Minh Anh Uniform hỗ trợ may theo yêu cầu: phối màu, bo cổ/tay, form dáng và xử lý logo theo nhận diện.
                                Bạn có thể bắt đầu bằng việc chọn mẫu tham khảo trong danh mục.
                            </p>
                        </details>
                    </div>
                </section>
            </div>
            <div className="lg:col-span-2 flex justify-end px-4 py-10">
                <Link
                    to="/san-pham"
                    className="inline-block rounded-xl border border-golden-earth-200 bg-golden-earth-50 px-4 py-2.5 text-center shadow transition hover:bg-golden-earth-100"
                >
                    <div className="inline-flex items-center gap-2">
                        <span className="text-base font-bold text-brown-bark-900 tracking-wide">Trang sản phẩm </span>
                        <ArrowRightToLine className="ml-2 h-5 w-5 text-brown-bark-900" />

                    </div>
                </Link>
            </div>
        </main>
    )
}

export default About
