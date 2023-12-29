import { message } from "antd";
import {
  Bad_Request,
  LocalStorageKey,
  Request_Succesfull,
  Unauthorized,
} from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const GetPostComments = async (post_id: string) => {
  try {
    const response = await axiosInstance.get(`/post/comment/get/${post_id}`);
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
export default GetPostComments;
