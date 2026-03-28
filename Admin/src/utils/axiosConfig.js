import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Đường dẫn tới Backend Java
    timeout: 10000,
    withCredentials: true, // QUAN TRỌNG: Cho phép gửi và nhận Cookie
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor: Trước khi gửi request đi
axiosInstance.interceptors.request.use(
    (config) => {
        // Không cần lấy token từ localStorage và gắn vào header nữa
        // Vì trình duyệt sẽ tự động gửi Cookie kèm theo nếu withCredentials = true
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor: Sau khi nhận response về
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data; // Trả về data luôn cho gọn
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Chỉ redirect nếu chưa ở trang login (tránh vòng lặp)
            if (window.location.pathname !== '/login') {
                console.warn("Phiên đăng nhập hết hạn. Chuyển về trang đăng nhập...");
                localStorage.removeItem('admin_user'); // Xóa trước khi redirect
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
