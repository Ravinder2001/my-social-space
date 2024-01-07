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
    console.log("error", error);
  }
};
export default SendMessage;
