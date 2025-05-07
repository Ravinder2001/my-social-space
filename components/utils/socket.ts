import Config from "@/lib/config";
import { io } from "socket.io-client";
import CONSTANTS from "./constants";

const URL = Config.API_BASE_URL;
const token = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY);

// Create a socket instance
const socket = io(URL, {
  auth: {
    token: token,
  },
});

export default socket;
