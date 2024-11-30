import axios from "axios";
import { toast } from "react-toastify";


const BASE_URL = "https://localhost:7186/api";


const token = localStorage.getItem("jwt");

// Tạo instance `axiosJson` cho các yêu cầu JSON
const axiosJson = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    }
});

// Tạo instance `axiosFormData` cho các yêu cầu Form Data
const axiosFormData = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` })
    }
});

// Tạo một interceptor xử lý lỗi dùng chung
const errorInterceptor = (error) => {
    if (error.response) {
        // Lỗi từ phản hồi của server
        console.error('Response error:', error.response);
        const status = error.response.status;
        if (status === 403) {
            toast.error('Tài khoản của bạn đã bị khóa');
        } else if (status === 401) {
            toast.error('Không được phép truy cập');
        } 
        // else {
        //     toast.error(`Lỗi từ server: ${status}`);
        // }
    } else if (error.request) {
        // Không nhận được phản hồi từ server
        console.error('Request error:', error.request);
        toast.error('Không thể kết nối đến server');
    } else {
        // Lỗi khi thiết lập yêu cầu
        console.error('Error:', error.message);
        toast.error('Đã xảy ra lỗi khi đăng nhập');
    }
    return Promise.reject(error);
};

// Áp dụng interceptor lỗi cho cả `axiosJson` và `axiosFormData`
axiosJson.interceptors.response.use(response => response, errorInterceptor);
axiosFormData.interceptors.response.use(response => response, errorInterceptor);

export { axiosJson, axiosFormData };
