import { message } from "antd";
import { Bad_Request, LocalStorageKey, Request_Succesfull, Unauthorized } from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";
type AddCommentProps = {
  post_id: string;
  content: string;
};

const AddComment = async (props: AddCommentProps) => {
  try {
    const body = { content: props.content };
    const response = await axiosInstance.post(`/post/comment/add/${props.post_id}`, body);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default AddComment;
