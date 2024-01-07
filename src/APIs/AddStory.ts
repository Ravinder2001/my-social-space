import { message } from "antd";
import axiosInstanceFormdata from "../Utils/axiosInstance/axiosInstanceFormdata";
import { AxiosError } from "axios";
import { Bad_Request, LocalStorageKey, Request_Succesfull, Unauthorized } from "../Utils/Constant";

const AddStory = async (props: FormData) => {
  try {
    const response = await axiosInstanceFormdata.post(`/story/add`, props);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default AddStory;
