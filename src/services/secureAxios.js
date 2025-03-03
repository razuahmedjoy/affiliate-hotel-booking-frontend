import axios from "axios";

const secureAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL, // Adjust based on your server URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Add an interceptor to attach the token
secureAxios.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("auth-storage"))?.state?.token; // Or get token from another storage method
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default secureAxios;
