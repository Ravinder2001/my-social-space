import axiosInstance from "./axiosInstance";
import moment from "moment";

export const UploadFile = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  try {
    const response = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};

export function formatTimeAgo(dateInput: string | number | Date): string {
  return moment(dateInput).fromNow();
}
