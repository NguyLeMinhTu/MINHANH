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
        // Xử lý lỗi chung (Ví dụ: Token hết hạn -> logout)
        if (error.response && error.response.status === 401) {
            // Có thể emit event hoặc xử lý logic logout ở đây nếu cần thiết
            console.error("Lỗi 401 Unauthorized - Token có thể đã hết hạn");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
