import { io } from "socket.io-client";
import config from "./Utils/config";

const URL = config.baseURL ?? "";

export const socket = io(URL);
