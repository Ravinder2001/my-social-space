import { message } from "antd";
import {
  Bad_Request,
  LocalStorageKey,
  Request_Succesfull,
  Unauthorized,
} from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

type messageObject = {
  room_id: string;
  content: string;
  content_type: string;
};
const SendMessage = async (props: messageObject) => {
  try {
    const response = await axiosInstance.post(`/messages/sendMessage`, props);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    if (error.response == undefined) {
      return;
    }
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
export default SendMessage;
