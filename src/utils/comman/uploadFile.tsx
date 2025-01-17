import axiosInstance from "../axiosInstance";
import APIRoutes from "../constants/APIRoutes";
import { showToast } from "./Toast";

const UploadFileAPI = async (files: File[]): Promise<any> => {
  try {
    const formData = new FormData();

    // Append each file to the FormData object
    files.forEach((file) => {
      formData.append("file", file);
    });

    // Make the POST request to upload files
    const response = await axiosInstance.post(APIRoutes.FILE_UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Return the server's response
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "File upload failed";
    showToast.error(errorMessage);
  }
};

export default UploadFileAPI;
