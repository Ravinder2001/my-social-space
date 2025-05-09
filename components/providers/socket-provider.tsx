"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import Config from "@/lib/config";
import { showToast } from "../utils/toast";
import CONSTANTS from "../utils/constants";
import { MessageNotification } from "../messages/message-notification";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });
const URL = Config.API_BASE_URL;

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status }: any = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);

  // Only create and destroy socket on login/logout or tab close
  useEffect(() => {
    if (status === "authenticated" && !socketRef.current) {
      const newSocket = io(URL, {
        auth: {
          token: session?.user?.authToken,
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

      newSocket.on(CONSTANTS.SOCKET_EVENTS.MSG_RECEIVED, (msgObj) => {
        console.log(msgObj);
        setIsNewMessage(true);
        setTimeout(() => {
          setIsNewMessage(false);
        }, 5000);
      });

      socketRef.current = newSocket;
      setSocket(newSocket);

      // Disconnect only on tab close or logout
      const handleBeforeUnload = () => {
        newSocket.disconnect();
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        // Only disconnect if logging out
        if (socketRef.current && status !== "authenticated") {
          socketRef.current.disconnect();
          socketRef.current = null;
          setSocket(null);
        }
      };
    }
    // On logout, disconnect
    if (status !== "authenticated" && socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
    }
  }, [status, session]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {isNewMessage && (
        <MessageNotification
          sender={{ id: "1", name: "Ravinder", avatar: "" }}
          message="New message received"
          onClose={() => {}}
        />
      )}
      {children}
    </SocketContext.Provider>
  );
};
