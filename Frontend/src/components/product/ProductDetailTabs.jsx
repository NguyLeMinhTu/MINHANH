import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users } from 'lucide-react'

const ProductDetailTabs = ({ activeTab, setActiveTab, description }) => {
    const tabs = [
        { id: 'description', label: 'Mô tả chi tiết' },
        { id: 'diff', label: 'Điểm khác biệt' },
        { id: 'process', label: 'Quy trình đặt hàng' }
    ]

    const tabVariants = {
        initial: () => ({
            opacity: 0,
            y: 10,
        }),
        animate: () => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: 'easeOut'
            }
        }),
        exit: () => ({
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2,
                ease: 'easeIn'
            }
        })
    }

    const underlineVariants = {
        initial: { scaleX: 0 },
        animate: { scaleX: 1 },
        transition: { duration: 0.3, type: 'spring', stiffness: 100 }
    }

    return (
        <div className="bg-white rounded-3xl border border-carbon-black-100 overflow-hidden shadow-sm">
            {/* Tabs Header */}
            <motion.div className="flex border-b border-carbon-black-100 bg-carbon-black-50/50" initial="hidden" animate="visible">
                {tabs.map((tab, idx) => (
                    <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all relative flex-1 sm:flex-none ${activeTab === tab.id
                            ? 'text-brown-bark-800 bg-white'
                            : 'text-carbon-black-400 hover:text-carbon-black-600'}`}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 h-1 bg-brown-bark-700"
                                layoutId="underline"
                                initial={false}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30
                                }}
                            />
                        )}
                    </motion.button>
                ))}
            </motion.div>

            {/* Tabs Content */}
            <div className="p-8">
                <AnimatePresence mode="wait">
                    {/* Description Tab */}
                    {activeTab === 'description' && (
                        <motion.div
                            key="description"
                            variants={tabVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="prose prose-sm max-w-none text-carbon-black-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    )}

                    {/* Difference Tab */}
                    {activeTab === 'diff' && (
                        <motion.div
                            key="diff"
                            variants={tabVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="space-y-12"
                        >
                            <div className="text-center">
                                <motion.h3
                                    className="text-xl font-bold text-brown-bark-900 uppercase tracking-tight mb-2"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Điểm khác biệt tại Minh Anh
                                </motion.h3>
                                <motion.p
                                    className="text-xs text-carbon-black-500 font-medium"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    Chúng tôi không chỉ bán áo, chúng tôi mang lại niềm kiêu hãnh cho tập thể của bạn
                                </motion.p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {[
                                    {
                                        title: 'Chất vải cao cấp',
                                        icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    },
                                    {
                                        title: 'Kỹ thuật may tinh xảo',
                                        icon: <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z" />
                                    },
                                    {
                                        title: 'Công nghệ in tân tiến',
                                        icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    },
                                    {
                                        title: 'Đội ngũ giàu kinh nghiệm',
                                        icon: <Users size={20} />
                                    }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="group relative bg-[#fdfdf7] border border-[#ffd776]/50 rounded-3xl p-6 transition-all hover:shadow-xl hover:-translate-y-2 overflow-hidden"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + i * 0.08 }}
                                        whileHover={{ y: -8 }}
                                    >
                                        {/* Background decorative number */}
                                        <div className="absolute -bottom-4 -right-2 text-7xl font-bold text-[#ffd776]/20 group-hover:text-[#ffd776]/40 transition-colors pointer-events-none">
                                            {i + 1}
                                        </div>
                                        <motion.div
                                            className="w-14 h-14 rounded-2xl bg-white border border-[#ffd776] flex items-center justify-center text-[#c29a3d] mb-6 group-hover:bg-[#ffd776] group-hover:text-carbon-black-900 transition-all duration-300"
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                        >
                                            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                {item.icon}
                                            </svg>
                                        </motion.div>
                                        <h4 className="text-lg font-bold text-carbon-black-800 mb-3 group-hover:text-[#c29a3d] transition-colors uppercase tracking-tighter leading-tight">{item.title}</h4>
                                        <p className="text-xs text-carbon-black-600 leading-relaxed font-medium line-clamp-4">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Process Tab */}
                    {activeTab === 'process' && (
                        <motion.div
                            key="process"
                            variants={tabVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="space-y-12"
                        >
                            <div className="text-center">
                                <motion.h3
                                    className="text-xl font-bold text-brown-bark-900 uppercase tracking-tight mb-2"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Quy trình đặt may chuyên nghiệp
                                </motion.h3>
                                <motion.p
                                    className="text-xs text-carbon-black-500 font-medium"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    Quy trình 5 bước đảm bảo chất lượng tuyệt đối cho từng sản phẩm
                                </motion.p>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between gap-10 relative">
                                {[
                                    { step: '01', label: 'Tư vấn - Báo giá', icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /> },
                                    { step: '02', label: 'Lên Market sản phẩm', icon: <path d="M4 19h16l-1-7h-14l-1 7zM9 19v2M15 19v2M3 19h18M5 12V6a2 2 0 012-2h10a2 2 0 012 2v6" /> },
                                    { step: '03', label: 'Chốt mẫu', icon: <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /> },
                                    { step: '04', label: 'Ký hợp đồng', icon: <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 11-8 0 4 4 0 018 0zm10 0a4 4 0 11-8 0 4 4 0 018 0zm1 14v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" /> },
                                    { step: '05', label: 'Sản xuất', icon: <path d="M2 20a2 2 0 002 2h16a2 2 0 002-2V8l-7 5V8l-7 5V4a2 2 0 00-2-2H4a2 2 0 00-2 2z" /> }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex-1 flex flex-col items-center group"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                    >
                                        <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                                            {/* Step number on top left */}
                                            <div className="absolute -top-1 -left-2 z-10">
                                                <p className="text-[10px] font-bold text-brown-bark-300 uppercase tracking-tighter leading-none mb-1">Bước</p>
                                                <motion.p
                                                    className={`text-4xl font-bold italic leading-none transition-colors ${i === 0 ? 'text-blue-500' : 'text-blue-400'}`}
                                                    whileHover={{ scale: 1.2 }}
                                                >
                                                    {i + 1}
                                                </motion.p>
                                            </div>
                                            {/* Circular border wrapper */}
                                            <motion.div
                                                className="absolute inset-0 border-[3px] border-blue-400 rounded-full border-t-transparent"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                                initial={{ rotate: -45 }}
                                            />
                                            <motion.div
                                                className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-500 transition-transform group-hover:scale-110"
                                                whileHover={{ scale: 1.15 }}
                                            >
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    {item.icon}
                                                </svg>
                                            </motion.div>
                                        </div>
                                        <motion.p
                                            className="text-sm font-bold text-carbon-black-800 uppercase tracking-tighter text-center leading-tight group-hover:text-blue-600 transition-colors"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.25 + i * 0.1 }}
                                        >
                                            {item.label}
                                        </motion.p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ProductDetailTabs
