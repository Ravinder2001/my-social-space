import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const LoginWithToken = async (data: { token: string }) => {
  try {
    const response = await axiosInstance.post(`/loginWithToken`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
export default LoginWithToken;
