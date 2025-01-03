"use client";
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { showToast } from "@/utils/comman/Toast";

const useApiFetch = (initialUrl: string, initialOptions?: AxiosRequestConfig) => {
  const [data, setData] = useState<{
    success: number;
    message: string;
    data?: any;
    count?: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async (url = initialUrl, options = initialOptions) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance(url, options);
      setData(response.data);
    } catch (error: any) {
      showToast.error(error.data.error || error.data.message || error.message || "Something went wrong");
      setError(error.data.error || error.data.message || error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchData };
};

export default useApiFetch;
