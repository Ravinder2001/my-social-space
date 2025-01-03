/* eslint-disable  @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
import Config from "@/utils/config";
import axios from "axios";

type ServerAPIResponse<T> = {
  data: T | null;
  error: string | null;
};

export async function serverAPICall<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
  headers: Record<string, string> = {}
): Promise<ServerAPIResponse<T>> {
  let data: T | null = null;
  let error: string | null = null;

  try {
    const authDetails = await auth();
    const token = authDetails?.user?.token || "";
    const fullURL = Config.API_BASE_URL + url;

    const response = await axios({
      url: fullURL,
      method,
      data: body,
      headers: { ...headers, Authorization: `Bearer ${token}` },
    });

    data = response.data;
  } catch (err: any) {
    error = err.response?.data?.message || err.message || "An error occurred";
  }

  return { data, error };
}
