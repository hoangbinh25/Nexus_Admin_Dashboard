import { getStorage } from "@/utils/storage";
import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
})

api.interceptors.request.use((config) => {
    const token = getStorage("accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
})


export default api;