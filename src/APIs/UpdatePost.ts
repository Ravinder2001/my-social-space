import { message } from "antd";
import {
  Bad_Request,
  LocalStorageKey,
  Request_Succesfull,
  Unauthorized,
} from "../Utils/Constant";

import axiosInstance from "../Utils/axiosInstance/axiosInstance";
type props = {
  post_id: string;
  data: {
    caption: string;
    like: boolean;
    comment: boolean;
    share: boolean;
    visibility: string;
  };
};
const UpdatePost = async (props: props) => {
  try {
    const response = await axiosInstance.put(
      `/post/edit/${props.post_id}`,
      props.data
    );
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default UpdatePost;
