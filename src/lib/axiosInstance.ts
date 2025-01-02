"use client"
import axios from "axios";
import Config from "@/utils/config";
import { auth } from "@/auth";

console.log("cofig",Config)

const axiosInstance = axios.create({
  baseURL: "http://localhost:7777",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("coming----")
    const authDetails = await auth();
    console.log("🚀  authDetails:", authDetails)
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
    console.log("🚀  response:", response)
    return response;
  },
  (error) => {
    console.log("Error in axios res interceptors=====>", error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
