import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const location = useLocation()

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar isOpen={sidebarOpen} />
            <Header
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen((prev) => !prev)}
            />
            <main
                className={`transition-all duration-300 pt-16 min-h-screen ${sidebarOpen ? 'ml-64' : 'ml-20'
                    }`}
            >
                <div key={location.pathname} className="p-8 animate-fade-up">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AdminLayout
