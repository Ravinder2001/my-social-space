"use client";
import axios from "axios";
import Config from "@/utils/config";
import { auth } from "@/auth";

const axiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authDetails = await auth();
    const token = authDetails?.user.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach the token to the Authorization header
    }

    return config;
  },
  (error) => {
    console.log("Error in axios req interceptors=====>", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("🚀  response:", response);
    return response;
  },
  (error) => {
    console.log("Error in axios res interceptors=====>", error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
