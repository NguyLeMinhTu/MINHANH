import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const location = useLocation()

    return (
        <div className="min-h-screen bg-gray-50/50 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} />
            <Header
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen((prev) => !prev)}
            />
            <main
                className={`transition-all duration-300 pt-16 min-h-screen ${sidebarOpen ? 'ml-64' : 'ml-20'
                    }`}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="p-8"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    )
}

export default AdminLayout
