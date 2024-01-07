import { message } from "antd";
import {
  Bad_Request,
  LocalStorageKey,
  Request_Succesfull,
  Unauthorized,
} from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const GetAllPostOfAnotherUser = async (user_id: string) => {
  try {
    const response = await axiosInstance.get(`/post/all/${user_id}`);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default GetAllPostOfAnotherUser;
