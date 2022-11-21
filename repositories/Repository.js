import axios from "axios";

const baseURL = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
})

axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) useRouter().push('/admin/login');
    return Promise.reject(error);
});

export default axiosInstance;