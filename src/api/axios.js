import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// Request Interceptor - Add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("📤 Request:", config.method.toUpperCase(), config.url, {
      hasToken: !!token,
      headers: config.headers,
    });

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

// Response Interceptor - Handle 401 and other errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    // Handle 401 - Token expired or invalid
    if (error.response?.status === 401) {
      console.warn("⚠️ Token invalid/expired. Clearing localStorage");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optionally redirect to login
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
