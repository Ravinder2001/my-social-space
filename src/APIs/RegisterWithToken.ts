import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const RegisterWithToken = async (data: { token: string; password: string }) => {
  try {
    const response = await axiosInstance.post(`/registerWithtoken`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
export default RegisterWithToken;
