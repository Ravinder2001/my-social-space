import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const LoginWithEmailAndPassword = async (data: {
  email: string;
  password: string;
  rememberMe: boolean;
}) => {
  try {
    const response = await axiosInstance.post(
      `/loginwithEmailAndPassword`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
export default LoginWithEmailAndPassword;
