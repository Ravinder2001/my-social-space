import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7777",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Helper function to get the session token (not using hooks)
const getAuthToken = async () => {
  const session = await getSession();
  return session?.user?.authToken;
};
// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Skip adding auth header for auth-related endpoints
    if (config.url?.includes("/auth/")) {
      return config;
    }

    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("🚀 error:", error);
    const message = error?.response?.data?.message || "Something went wrong!";
    // errorAlert(message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
