import { message } from "antd";
import {
  Bad_Request,
  LocalStorageKey,
  Request_Succesfull,
  Unauthorized,
} from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";
// type RemovePostProps = {
//   post_id: string;
// };
const RemovePostLike = async (post_id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/post/like/delete/${post_id}`
    );
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default RemovePostLike;
