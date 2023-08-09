import axiosInstance from "../Utils/axiosInstance/axiosInstance";

const RegisterWithEmailAndPassword = async (data: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(
      `/registerWithEmailAndPassword`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
export default RegisterWithEmailAndPassword;
