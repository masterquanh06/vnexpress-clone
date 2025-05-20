import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/v1", // hoặc domain backend của bạn
    withCredentials: true, // để gửi cookie
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default axiosInstance;
