import axios from "axios";
import { showToast } from "./toast";
import CONSTANTS from "./constants";
import { signOut } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7777",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY);
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
    if (error.status == 401) {
      return signOut();
    }
    const message = error?.response?.data?.message || "Something went wrong!";
    showToast({
      message: message,
      type: "error",
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;
