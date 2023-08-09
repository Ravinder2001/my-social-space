import axios, { AxiosInstance } from "axios";

import config from "../config";

import { LocalStorageKey } from "../Constant";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LocalStorageKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response && error.response.status == 401) {
      localStorage.removeItem(LocalStorageKey);
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
