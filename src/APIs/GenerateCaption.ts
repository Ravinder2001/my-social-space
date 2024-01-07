import { message } from "antd";
import { Bad_Request, LocalStorageKey, Request_Succesfull, Unauthorized } from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const GenerateCaptions = async (post:string) => {
  try {
    const response = await axiosInstance.post(`/GPT/generate_caption`,{post:post});
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default GenerateCaptions;
