import { message } from "antd";
import {
  Bad_Request,
  LocalStorageKey,
  Request_Succesfull,
  Unauthorized,
} from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const SendFriendRequest = async (user_id: string) => {
  try {
    let object = {
      user_id,
    };
    const response = await axiosInstance.post(
      `/friends/send_friend_request`,
      object
    );
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default SendFriendRequest;
