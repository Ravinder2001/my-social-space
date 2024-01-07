import { message } from "antd";
import { Bad_Request, LocalStorageKey, Request_Succesfull, Unauthorized } from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const UpdateMessageSeen = async (object: { room_id: string; id: number }) => {
  try {
    const response = await axiosInstance.post(`/messages/updateSeenMessage`, object);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default UpdateMessageSeen;
