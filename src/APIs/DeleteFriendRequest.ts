import { message } from "antd";
import {
  Bad_Request,
  LocalStorageKey,
  Request_Succesfull,
  Unauthorized,
} from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const DeleteFriendRequest = async (request_id: string|number) => {
  try {
    const response = await axiosInstance.delete(`/friends/delete_friend_request/${request_id}`);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default DeleteFriendRequest;
