import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { sileo } from 'sileo'

import Title from '../common/Title'
import bannerLienHe from '../../assets/banner-lienhe.jpg'
import logoMinhAnh from '../../assets/logo.png'
import { thong_tin_lien_he } from '../../assets/dataset'
import { ArrowRightToLine } from 'lucide-react'

const Contact = () => {
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [lastSubmitTime, setLastSubmitTime] = useState(0)

    // Validation functions
    const validateName = (name) => {
        if (!name || !name.trim()) return 'Vui lòng nhập họ tên'
        if (name.trim().length < 2) return 'Họ tên phải có ít nhất 2 ký tự'
        if (name.trim().length > 100) return 'Họ tên không được quá 100 ký tự'
        if (!/^[a-zA-ZÀ-ỿ\s]+$/.test(name.trim())) return 'Họ tên chỉ được chứa chữ cái'
        return ''
    }

    const validatePhone = (phone) => {
        if (!phone || !phone.trim()) return 'Vui lòng nhập số điện thoại'
        const cleanPhone = phone.replace(/\D/g, '')
        if (cleanPhone.length < 9) return 'Số điện thoại quá ngắn'
        if (cleanPhone.length > 12) return 'Số điện thoại quá dài'
        // Vietnamese phone format
        if (!/^(0|84)[0-9]{9,11}$/.test(cleanPhone)) {
            return 'Số điện thoại không hợp lệ (VD: 0901234567 hoặc 84901234567)'
        }
        return ''
    }

    const validateEmail = (email) => {
        if (!email || !email.trim()) return 'Vui lòng nhập email'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email không hợp lệ'
        if (email.length > 100) return 'Email quá dài'
        return ''
    }

    const validateMessage = (message) => {
        if (!message || !message.trim()) return 'Vui lòng nhập nội dung'
        if (message.trim().length < 10) return 'Nội dung phải có ít nhất 10 ký tự'
        if (message.trim().length > 1000) return 'Nội dung không được quá 1000 ký tự'
        return ''
    }

    const sanitizeInput = (input) => {
        if (!input) return ''
        // Remove extra whitespace and trim
        return input.trim().replace(/\s+/g, ' ')
    }

    const checkRateLimit = () => {
        const now = Date.now()
        const timeSinceLastSubmit = now - lastSubmitTime
        const MIN_INTERVAL = 5000 // 5 seconds minimum between submissions
        
        if (timeSinceLastSubmit < MIN_INTERVAL) {
            return `Vui lòng đợi ${Math.ceil((MIN_INTERVAL - timeSinceLastSubmit) / 1000)} giây trước khi gửi lại`
        }
        return ''
    }

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

    const onSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)

        // Get and sanitize form inputs
        const name = sanitizeInput(formData.get('name'))
        const phone = formData.get('phone')?.trim() || ''
        const email = sanitizeInput(formData.get('email'))
        const message = sanitizeInput(formData.get('message'))

        // Validate all fields
        const newErrors = {}
        
        const nameError = validateName(name)
        if (nameError) newErrors.name = nameError

        const phoneError = validatePhone(phone)
        if (phoneError) newErrors.phone = phoneError

        const emailError = validateEmail(email)
        if (emailError) newErrors.email = emailError

        const messageError = validateMessage(message)
        if (messageError) newErrors.message = messageError

        // Check rate limiting
        const rateLimitError = checkRateLimit()
        if (rateLimitError) newErrors.rateLimit = rateLimitError

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        setLoading(true)

        // Normalize phone number for storage
        const normalizedPhone = phone.replace(/\D/g, '')

        const payload = {
            tenKhach: name,
            soDienThoai: normalizedPhone,
            email: email,
            noiDung: message,
        }

        // Add timeout to fetch (30 seconds)
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000)

        const promise = fetch('/api/yeu-cau-tu-van', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            signal: controller.signal
        })
            .then(res => {
                clearTimeout(timeoutId)
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
                }
                return res.json().catch(() => ({}))
            })
            .catch(err => {
                clearTimeout(timeoutId)
                if (err.name === 'AbortError') {
                    throw new Error('Yêu cầu hết thời gian chờ (30s). Vui lòng kiểm tra kết nối và thử lại.')
                }
                throw err
            })

        sileo.promise(promise, {
            loading: { title: 'Đang gửi...', description: 'Đang gửi thông tin liên hệ của bạn.' },
            success: () => {
                setLoading(false)
                setSubmitted(true)
                setLastSubmitTime(Date.now())
                form.reset()
                setErrors({})
                window?.scrollTo?.({ top: 0, behavior: 'smooth' })
                return { 
                    title: 'Gửi thành công!', 
                    description: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm.' 
                }
            },
            error: (err) => {
                setLoading(false)
                const errorMsg = err.message || 'Không thể gửi thông tin. Vui lòng thử lại sau.'
                setErrors({ submit: errorMsg })
                return { 
                    title: 'Lỗi', 
                    description: errorMsg 
                }
            }
        })
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

                            {errors.rateLimit && (
                                <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3">
                                    <p className="text-sm text-red-700 font-semibold">{errors.rateLimit}</p>
                                </div>
                            )}

                            {errors.submit && (
                                <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3">
                                    <p className="text-sm text-red-700 font-semibold">{errors.submit}</p>
                                </div>
                            )}

                            <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                                <label className="grid gap-1">
                                    <span className="text-xs font-semibold text-carbon-black-700">Họ tên</span>
                                    <input
                                        required
                                        name="name"
                                        className={`h-11 rounded-2xl border bg-white/80 px-4 text-sm text-carbon-black-900 outline-none focus:border-brown-bark-300 ${
                                            errors.name ? 'border-red-400' : 'border-carbon-black-200'
                                        }`}
                                        placeholder="Nhập họ tên"
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-600 font-semibold">{errors.name}</p>}
                                </label>

                                <label className="grid gap-1">
                                    <span className="text-xs font-semibold text-carbon-black-700">Số điện thoại</span>
                                    <input
                                        required
                                        name="phone"
                                        inputMode="tel"
                                        className={`h-11 rounded-2xl border bg-white/80 px-4 text-sm text-carbon-black-900 outline-none focus:border-brown-bark-300 ${
                                            errors.phone ? 'border-red-400' : 'border-carbon-black-200'
                                        }`}
                                        placeholder="VD: 0886 268 268"
                                    />
                                    {errors.phone && <p className="mt-1 text-xs text-red-600 font-semibold">{errors.phone}</p>}
                                </label>

                                <label className="grid gap-1 sm:col-span-2">
                                    <span className="text-xs font-semibold text-carbon-black-700">Email (tuỳ chọn)</span>
                                    <input
                                        name="email"
                                        inputMode="email"
                                        className={`h-11 rounded-2xl border bg-white/80 px-4 text-sm text-carbon-black-900 outline-none focus:border-brown-bark-300 ${
                                            errors.email ? 'border-red-400' : 'border-carbon-black-200'
                                        }`}
                                        placeholder="email@domain.com"
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-600 font-semibold">{errors.email}</p>}
                                </label>

                                <label className="grid gap-1 sm:col-span-2">
                                    <span className="text-xs font-semibold text-carbon-black-700">Nội dung</span>
                                    <textarea
                                        required
                                        name="message"
                                        rows={5}
                                        className={`rounded-2xl border bg-white/80 px-4 py-3 text-sm text-carbon-black-900 outline-none focus:border-brown-bark-300 ${
                                            errors.message ? 'border-red-400' : 'border-carbon-black-200'
                                        }`}
                                        placeholder="Bạn cần đồng phục gì? Số lượng? Có logo không?"
                                    />
                                    {errors.message && <p className="mt-1 text-xs text-red-600 font-semibold">{errors.message}</p>}
                                </label>

                                <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex items-center justify-center rounded-full bg-brown-bark-800 px-6 py-2.5 text-sm font-semibold text-golden-earth-50 transition hover:bg-brown-bark-700 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
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
