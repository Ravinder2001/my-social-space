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
    console.log("error", error);
  }
};
export default CreateRoom;
