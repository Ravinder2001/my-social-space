"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import Config from "@/lib/config";
import { showToast } from "../utils/toast";
import CONSTANTS from "../utils/constants";

// Define the context type
interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });
const URL = Config.API_BASE_URL;

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status }: any = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Only connect if authenticated
    if (status === "authenticated" && !socketRef.current) {
      const newSocket = io(URL, {
        auth: {
          token: session?.user?.authToken, // Adjust if your session has a token
        },
        autoConnect: true,
        transports: ["websocket"],
      });
      newSocket.on(CONSTANTS.SOCKET_EVENTS.CONNECT, () => {
        showToast({ message: "Socket connected", type: "success" });
      });
      newSocket.on(CONSTANTS.SOCKET_EVENTS.DISCONNECT, () => {
        showToast({ message: "Socket disconnected", type: "error" });
      });
      newSocket.on(CONSTANTS.SOCKET_EVENTS.ERROR, (errMsg) => {
        showToast({ message: errMsg, type: "error" });
      });
      socketRef.current = newSocket;
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
        socketRef.current = null;
        setSocket(null);
      };
    }

    // Disconnect if not authenticated
    if (status !== "authenticated" && socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
    }
  }, [status, session]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
