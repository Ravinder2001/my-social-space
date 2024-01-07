import { message } from "antd";
import { Bad_Request, LocalStorageKey, Request_Succesfull, Unauthorized } from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const UpdateMessageStatus = async (props: { message_id: number; status: boolean }) => {
  try {
    const response = await axiosInstance.put(`/messages/updateMessageStatus`, props);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default UpdateMessageStatus;
