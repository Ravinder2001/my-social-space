import { message } from "antd";
import {
  Bad_Request,
  LocalStorageKey,
  Request_Succesfull,
  Unauthorized,
} from "../Utils/Constant";

import axiosInstance from "../Utils/axiosInstance/axiosInstance";
type props = {
  job: string;
  location: string;
  delete:Boolean
};
const UpdateProfileData = async (obj: props) => {
  try {
    const response = await axiosInstance.post(`/updateProfileData`,obj);
    if (response.status === Request_Succesfull) {
      return response.data;
    }
  } catch (error: any) {
    console.log("error", error);
  }
};
export default UpdateProfileData;
