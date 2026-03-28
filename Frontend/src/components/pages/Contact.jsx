import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import Title from '../common/Title'
import bannerLienHe from '../../assets/banner-lienhe.jpg'
import logoMinhAnh from '../../assets/logo.png'
import { thong_tin_lien_he } from '../../assets/dataset'
import { ArrowRightToLine } from 'lucide-react'

const Contact = () => {
    const [submitted, setSubmitted] = useState(false)

    const contact = thong_tin_lien_he || {}
    const phoneRaw = String(contact.hotline || '').trim()
    const phoneDisplay = contact.hotline_hien_thi || phoneRaw
    const email = contact.email || ''
    const hours = contact.gio_lam_viec || ''
    const consultant = contact.tu_van_vien || ''
    const showrooms = Array.isArray(contact.he_thong_showroom) ? contact.he_thong_showroom : []
    const factories = Array.isArray(contact.xuong_san_xuat) ? contact.xuong_san_xuat : []

    const jsonLd = useMemo(() => {
        const origin = typeof window !== 'undefined' ? window.location.origin : ''
        const pageUrl = origin ? `${origin}/lien-he` : '/lien-he'

        return JSON.stringify(
            {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: contact.thuong_hieu || 'Minh Anh Uniform',
                url: pageUrl,
                logo: origin ? new URL(logoMinhAnh, origin).toString() : logoMinhAnh,
                image: origin ? new URL(bannerLienHe, origin).toString() : bannerLienHe,
                contactPoint: [
                    {
                        '@type': 'ContactPoint',
                        telephone: phoneRaw ? `+84${phoneRaw.replace(/^0/, '')}` : undefined,
                        contactType: 'customer service',
                        email: email || undefined,
                        availableLanguage: ['vi'],
                        hoursAvailable: hours || undefined,
                    },
                ],
            },
            null,
            2,
        )
    }, [contact.thuong_hieu, email, hours, phoneRaw])

    const onSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        window?.scrollTo?.({ top: 0, behavior: 'smooth' })
    }

    return (
        <main className="bg-carbon-black-50">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

            <section className="relative w-full overflow-hidden bg-carbon-black-950">
                <img
                    src={bannerLienHe}
                    alt="Banner liên hệ Minh Anh Uniform"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                />
                {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-carbon-black-950/70 via-carbon-black-950/15 to-carbon-black-950/70" /> */}
            </section>

            <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
                <section className="space-y-6">
                    <Title
                        overline="Liên hệ"
                        title="Kết nối với Minh Anh Uniform"
                        subtitle="Bên trái là thông tin liên hệ, bên phải là form gửi yêu cầu."
                        size="md"
                        align="left"
                        documentTitle="Liên hệ | Minh Anh Uniform"
                    />

                    <div className="grid gap-6 lg:grid-cols-2">
                        <section aria-labelledby="contact-info" className="rounded-3xl border border-carbon-black-100 bg-white/70 p-6 sm:p-8">
                            <h2 id="contact-info" className="text-lg sm:text-xl font-bold text-carbon-black-900">
                                Thông tin liên hệ
                            </h2>

                            <dl className="mt-5 grid gap-3">
                                {consultant ? (
                                    <div className="rounded-2xl border border-carbon-black-100 bg-carbon-black-50 p-4">
                                        <dt className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">Tư vấn viên</dt>
                                        <dd className="mt-1 text-sm text-carbon-black-800 font-semibold">{consultant}</dd>
                                    </div>
                                ) : null}

                                {phoneRaw ? (
                                    <div className="rounded-2xl border border-carbon-black-100 bg-carbon-black-50 p-4">
                                        <dt className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">Hotline</dt>
                                        <dd className="mt-1 flex flex-wrap items-center gap-3">
                                            <a
                                                href={`tel:${phoneRaw}`}
                                                className="text-sm font-bold text-brown-bark-800 hover:text-brown-bark-700"
                                            >
                                                {phoneDisplay}
                                            </a>
                                            <a
                                                href={`https://zalo.me/${phoneRaw}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center rounded-full border border-carbon-black-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-carbon-black-900 transition hover:border-brown-bark-300"
                                            >
                                                Nhắn Zalo
                                            </a>
                                        </dd>
                                    </div>
                                ) : null}

                                {email ? (
                                    <div className="rounded-2xl border border-carbon-black-100 bg-carbon-black-50 p-4">
                                        <dt className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">Email</dt>
                                        <dd className="mt-1">
                                            <a
                                                href={`mailto:${email}`}
                                                className="text-sm font-semibold text-carbon-black-800 hover:text-brown-bark-700"
                                            >
                                                {email}
                                            </a>
                                        </dd>
                                    </div>
                                ) : null}

                                {hours ? (
                                    <div className="rounded-2xl border border-carbon-black-100 bg-carbon-black-50 p-4">
                                        <dt className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">Giờ làm việc</dt>
                                        <dd className="mt-1 text-sm text-carbon-black-800 font-semibold">{hours}</dd>
                                    </div>
                                ) : null}
                            </dl>

                            {(showrooms.length > 0 || factories.length > 0) ? (
                                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                    {showrooms.length > 0 ? (
                                        <div>
                                            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">Hệ thống showroom</p>
                                            <ul className="mt-3 space-y-2 text-sm text-carbon-black-700">
                                                {showrooms.map((addr) => (
                                                    <li key={addr} className="flex gap-2">
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-golden-earth-500" />
                                                        <span>{addr}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : null}

                                    {factories.length > 0 ? (
                                        <div>
                                            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-brown-bark-700">Xưởng sản xuất</p>
                                            <ul className="mt-3 space-y-2 text-sm text-carbon-black-700">
                                                {factories.map((addr) => (
                                                    <li key={addr} className="flex gap-2">
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-golden-earth-500" />
                                                        <span>{addr}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}
                        </section>

                        <section aria-labelledby="contact-form" className="rounded-3xl border border-carbon-black-100 bg-white/70 p-6 sm:p-8">
                            <h2 id="contact-form" className="text-lg sm:text-xl font-bold text-carbon-black-900">
                                Biểu mẫu liên hệ
                            </h2>
                            <p className="mt-2 text-carbon-black-700">
                                Điền thông tin để đội ngũ hỗ trợ tư vấn đúng nhu cầu.
                            </p>

                            {submitted ? (
                                <p className="mt-4 rounded-2xl border border-carbon-black-100 bg-golden-earth-50 px-4 py-3 text-sm text-carbon-black-800">
                                    Đã nhận thông tin. Chúng tôi sẽ liên hệ sớm.
                                </p>
                            ) : null}

                            <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                                <label className="grid gap-1">
                                    <span className="text-xs font-semibold text-carbon-black-700">Họ tên</span>
                                    <input
                                        required
                                        name="name"
                                        className="h-11 rounded-2xl border border-carbon-black-200 bg-white/80 px-4 text-sm text-carbon-black-900 outline-none focus:border-brown-bark-300"
                                        placeholder="Nhập họ tên"
                                    />
                                </label>

                                <label className="grid gap-1">
                                    <span className="text-xs font-semibold text-carbon-black-700">Số điện thoại</span>
                                    <input
                                        required
                                        name="phone"
                                        inputMode="tel"
                                        className="h-11 rounded-2xl border border-carbon-black-200 bg-white/80 px-4 text-sm text-carbon-black-900 outline-none focus:border-brown-bark-300"
                                        placeholder="VD: 0886 268 268"
                                    />
                                </label>

                                <label className="grid gap-1 sm:col-span-2">
                                    <span className="text-xs font-semibold text-carbon-black-700">Email (tuỳ chọn)</span>
                                    <input
                                        name="email"
                                        inputMode="email"
                                        className="h-11 rounded-2xl border border-carbon-black-200 bg-white/80 px-4 text-sm text-carbon-black-900 outline-none focus:border-brown-bark-300"
                                        placeholder="email@domain.com"
                                    />
                                </label>

                                <label className="grid gap-1 sm:col-span-2">
                                    <span className="text-xs font-semibold text-carbon-black-700">Nội dung</span>
                                    <textarea
                                        required
                                        name="message"
                                        rows={5}
                                        className="rounded-2xl border border-carbon-black-200 bg-white/80 px-4 py-3 text-sm text-carbon-black-900 outline-none focus:border-brown-bark-300"
                                        placeholder="Bạn cần đồng phục gì? Số lượng? Có logo không?"
                                    />
                                </label>

                                <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center rounded-full bg-brown-bark-800 px-6 py-2.5 text-sm font-semibold text-golden-earth-50 transition hover:bg-brown-bark-700"
                                    >
                                        Gửi yêu cầu
                                    </button>
                                    <p className="text-xs text-carbon-black-600">
                                        Bằng việc gửi thông tin, bạn đồng ý để chúng tôi liên hệ tư vấn.
                                    </p>
                                </div>
                            </form>
                        </section>

                        <div className="lg:col-span-2 flex justify-end">
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
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Contact
