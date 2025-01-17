import axios from "axios";
import Config from "@/utils/config";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session: any = await getSession();
    const token = session?.user?.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
