/* eslint-disable */
import { useState, useCallback } from "react";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "@/components/utils/axiosInstance";

const useApiFetch = (initialUrl: string, initialOptions?: AxiosRequestConfig) => {
  const [response, setResponse] = useState<{
    data?: any;
    error?: string;
    count?: number;
    success?: number;
    message?: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  // Memoize fetchData to prevent recreation on every render
  const fetchData = useCallback(
    async (url = initialUrl, options = initialOptions) => {
      setIsLoading(true);
      try {
        const { data } = await axiosInstance(url, {
          ...options, // Spread existing options
        });
        setResponse({
          data: data.data,
          message: data.message,
          success: data.success,
        });
      } catch (error: any) {
        const errorMessage = error?.data?.message || error.response?.data?.message || "Something went wrong";

        if (error.status === 401) {
          localStorage.clear();
          window.location.href = "/";
        }
        setResponse({ error: errorMessage, success: 0 });
      } finally {
        setIsLoading(false);
      }
    },
    [initialUrl, initialOptions] // Dependencies that, if changed, recreate fetchData
  );

  return { response, isLoading, fetchData };
};

export default useApiFetch;
