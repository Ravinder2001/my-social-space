import axios, { AxiosInstance } from "axios";

import config from "../config";

import { Bad_Request, LocalStorageKey, Unauthorized } from "../Constant";
import { message } from "antd";
let apiFailureCounter = 0;

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
    apiFailureCounter++;
    if (apiFailureCounter === 1) {
      if (error.response && error.response.status == Unauthorized) {
        message.error(error.response.data.message ?? "Access denied");
        localStorage.removeItem(LocalStorageKey);
        window.location.reload();
      } else if (error.response && error.response.status == Bad_Request) {
        message.error(error.response.data.message ?? "An error occurred while fetching data.");
      } else {
        message.error("An error occurred while fetching data.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
