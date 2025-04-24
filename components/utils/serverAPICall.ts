import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Config from "@/lib/config";
import axios, { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import { AuthSession } from "next-auth"; // Optional: Adjust based on your session type

// Define a type for the expected session (optional, for type safety)
interface CustomSession extends AuthSession {
  user: {
    authToken?: string;
    [key: string]: any; // Allow other user properties
  };
}

// Define a type for the expected API response (adjust based on your API)
interface ApiResponse {
  data: any; // Replace `any` with your actual data structure, e.g., { posts: Post[] }
  status: number;
  message?: string;
}

// Server-side API call function
export const serverAPICall = async (url: string): Promise<ApiResponse> => {
  try {
    // Get the server session
    const session = (await getServerSession(authOptions)) as CustomSession | null;

    // Check if session and authToken exist
    if (!session || !session.user?.authToken) {
      throw new Error("Unauthorized: No session or auth token found");
    }

    // Make the API call
    const res: AxiosResponse<ApiResponse> = await axios.get(Config.API_BASE_URL + url, {
      headers: {
        Authorization: `Bearer ${session.user.authToken}`,
      },
    });

    // Return the response data
    return {
      data: res.data,
      status: res.status,
      message: res.data.message || "Success",
    };
  } catch (error) {
    // Handle axios or other errors
    if (axios.isAxiosError(error)) {
      throw new Error(`API call failed: ${error.response?.data?.message || error.message}`);
    }
    throw new Error(`Unexpected error: ${(error as Error).message}`);
  }
};
