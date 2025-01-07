/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { showToast } from "@/utils/comman/Toast";

const useApiFetch = (initialUrl: string, initialOptions?: AxiosRequestConfig) => {
  const [response, setResponse] = useState<{
    data?: any;
    error?: string;
    count?: number;
    success?: number;
    message?: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url = initialUrl, options = initialOptions) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance(url, options);
      setResponse({
        data: data.data,
        message: data.message,
        success: data.success,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      showToast.error(errorMessage);
      setResponse({ error: errorMessage, success: error.response?.data?.success });
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, fetchData };
};

export default useApiFetch;
