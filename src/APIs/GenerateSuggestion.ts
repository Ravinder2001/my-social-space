import { message } from "antd";
import { Bad_Request, LocalStorageKey, Request_Succesfull, Unauthorized } from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const GenerateSuggestion = async (msg: string) => {
  try {
    const response = await axiosInstance.post(`/GPT/generate_suggestion`, { message: msg });
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default GenerateSuggestion;
