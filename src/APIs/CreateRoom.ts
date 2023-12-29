import { message } from "antd";
import { Bad_Request, LocalStorageKey, Request_Succesfull, Unauthorized } from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";
type RoomProps = {
  type: number;
  name: string;
  users: { user_id: string; isMessageAllowed: boolean }[];
};

const CreateRoom = async (props: RoomProps) => {
  try {
    const response = await axiosInstance.post(`/messages/createRoom`, props);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("🚀  file: AddComment.tsx:25  error:", error);
    if (error.response.status === Bad_Request) {
      message.error(error.response.data.message);
    }
    if (error.response.status === Unauthorized) {
      message.error(error.response.data.message);
      localStorage.removeItem(LocalStorageKey);
      window.location.reload();
    }
  }
};
export default CreateRoom;
