import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Đường dẫn tới Backend Java
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor: Trước khi gửi request đi
axiosInstance.interceptors.request.use(
    (config) => {
        // Lấy thông tin user (trong đó có token) từ localStorage
        const storedUser = localStorage.getItem('admin_user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user && user.accessToken) {
                    // Gắn token vào header Authorization
                    config.headers['Authorization'] = `Bearer ${user.accessToken}`;
                }
            } catch (error) {
                console.error("Lỗi parse thông tin user từ localStorage", error);
            }
        }
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
        // Xử lý lỗi chung (Ví dụ: Token hết hạn -> logout)
        if (error.response && error.response.status === 401) {
            // Có thể emit event hoặc xử lý logic logout ở đây nếu cần thiết
            console.error("Lỗi 401 Unauthorized - Token có thể đã hết hạn");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
