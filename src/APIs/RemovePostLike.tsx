import { message } from "antd";
import {
  Bad_Request,
  LocalStorageKey,
  Request_Succesfull,
  Unauthorized,
} from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";
type RemovePostProps = {
  post_id: string;
  user_id: string;
};
const RemovePostLike = async (props: RemovePostProps) => {
  try {
    const response = await axiosInstance.post(
      `/post/like/remove/${props.post_id}`,
      {
        user_id: props.user_id,
      }
    );
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
export default RemovePostLike;
