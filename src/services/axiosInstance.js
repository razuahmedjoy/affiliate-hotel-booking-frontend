import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,  // Set your API base URL
    timeout: 30000,  // Timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});




export default axiosInstance;
