import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen bg-surface-50">
            <Sidebar isOpen={sidebarOpen} />
            <Header
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen((prev) => !prev)}
            />
            <main
                className={`transition-all duration-300 pt-16 min-h-screen ${sidebarOpen ? 'ml-64' : 'ml-16'
                    }`}
            >
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AdminLayout
