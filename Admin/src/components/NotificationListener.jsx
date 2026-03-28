import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Bell } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { fetchConsultations } from '../app/slices/consultationSlice'

const NotificationListener = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // Sử dụng đường dẫn tương đối để đi qua proxy của vite
        const eventSource = new EventSource('/api/notifications/subscribe')
        
        console.log('Đang kết nối tới hệ thống thông báo SSE...');

        eventSource.onopen = () => {
            console.log('Đã kết nối thành công tới hệ thống thông báo SSE');
        }

        eventSource.addEventListener('notification', (event) => {
            const message = event.data
            
            // Hiển thị toast
            toast(message, {
                icon: '🔔',
                duration: 8000,
                position: 'top-right',
                // Sử dụng style trực tiếp và đảm bảo không bị ghi đè
                style: {
                    borderRadius: '12px',
                    background: '#FFFFFF',
                    color: '#111827',
                    padding: '16px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e5e7eb',
                    fontSize: '14px',
                    fontWeight: '600',
                    maxWidth: '400px',
                },
            })

            // Tự động reload danh sách yêu cầu tư vấn nếu đang ở trang liên quan
            dispatch(fetchConsultations({ page: 0, size: 20 }))

            // Phát sự kiện để Header cập nhật số lượng thông báo
            window.dispatchEvent(new CustomEvent('new-consultation'))
        })

        eventSource.onerror = (error) => {
            console.error('SSE Error:', error)
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [dispatch])

    return null // Component này không hiển thị gì lên giao diện
}

export default NotificationListener
