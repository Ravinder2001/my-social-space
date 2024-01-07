import { message } from "antd";
import { Bad_Request, LocalStorageKey, Request_Succesfull, Unauthorized } from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const AcceptFriendRequest = async (request_id: string | number, user_id: string) => {
  try {
    let object = {
      request_id: request_id,
      user_id: user_id,
    };
    const response = await axiosInstance.put(`/friends/accept_friend_request`, object);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default AcceptFriendRequest;
