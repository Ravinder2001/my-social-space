import { message } from "antd";
import {
  Bad_Request,
  LocalStorageKey,
  Request_Succesfull,
  Unauthorized,
} from "../Utils/Constant";
import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const GetServerHealth = async () => {
  try {
    await axiosInstance.get(`/health`);
    return "OK";
  } catch (error: any) {
    return "DOWN";
  }
};
export default GetServerHealth;
