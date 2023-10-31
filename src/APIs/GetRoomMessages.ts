import { message } from "antd";
import { Bad_Request, LocalStorageKey, Request_Succesfull, Unauthorized, MessagePerPage } from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const GetRoomMessages = async (room_id: string, page: number) => {
  try {
    const response = await axiosInstance.get(`/messages/getRoomMessages?room_id=${room_id}&page=${page}&messagePerPage=${MessagePerPage}`);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
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
export default GetRoomMessages;
