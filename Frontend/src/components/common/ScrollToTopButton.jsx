import { useEffect, useState } from 'react'

export default function ScrollToTopButton() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            // Show when scrolled to 70% of page height
            const scrollY = window.scrollY || window.pageYOffset
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            setShow(docHeight > 0 && scrollY / docHeight > 0.7)
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!show) return null

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 rounded-full bg-golden-earth-500 text-brown-bark-900 shadow-lg px-4 py-3 font-bold text-sm hover:bg-golden-earth-400 transition"
            aria-label="Lên đầu trang"
        >
            ↑ Lên đầu trang
        </button>
    )
}
