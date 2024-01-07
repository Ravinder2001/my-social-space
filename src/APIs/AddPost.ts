import { message } from "antd";
import axiosInstanceFormdata from "../Utils/axiosInstance/axiosInstanceFormdata";
import { AxiosError } from "axios";
import { Bad_Request, LocalStorageKey, Request_Succesfull, Unauthorized } from "../Utils/Constant";

const AddPost = async (data: { formdata: FormData }) => {
  try {
    const response = await axiosInstanceFormdata.post(`/post/add`, data.formdata);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default AddPost;
