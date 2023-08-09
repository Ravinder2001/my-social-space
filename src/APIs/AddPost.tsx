import { message } from "antd";
import axiosInstanceFormdata from "../Utils/axiosInstance/axiosInstanceFormdata";
import { AxiosError } from "axios";
import {
  Bad_Request,
  LocalStorageKey,
  Request_Succesfull,
  Unauthorized,
} from "../Utils/Constant";

const AddPost = async (data: { id: string; formdata: FormData }) => {
  try {
    const response = await axiosInstanceFormdata.post(
      `/post/add/${data.id}`,
      data.formdata
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
export default AddPost;
