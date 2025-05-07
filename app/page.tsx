"use client";
import { MainLayout } from "@/components/layouts/main-layout";
import { HomeFeed } from "@/components/home/home-feed";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUserDetails, UserState } from "@/lib/Slices/UserSlice";
import { useEffect, useState } from "react";
import CONSTANTS from "@/components/utils/constants";
import socket from "@/components/utils/socket";
import { showToast } from "@/components/utils/toast";

export default function Home() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  const saveSessionDetails = async () => {
    try {
      const session: any = await getSession();
      if (session?.user?.authToken) {
        dispatch(setUserDetails(session.user));
        localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEY, session?.user.authToken);
        setUserData(session?.user);
      }
    } catch (error) {
      console.error("Error saving session details:", error);
    } finally {
      setIsLoading(false); // Set loading to false after processing
    }
  };

  useEffect(() => {
    saveSessionDetails();
  }, []);

  useEffect(() => {
    if (userData?.authToken) {
      socket.connect();

      socket.on(CONSTANTS.SOCKET_EVENTS.CONNECT, () => {
        console.log("Connected to the socket server");
        showToast({ message: "Connected to the socket server", type: "success" });
      });

      socket.on(CONSTANTS.SOCKET_EVENTS.ERROR, (data) => {
        console.error("Socket Error", data);
        showToast({ message: data, type: "error" });
      });

      socket.on(CONSTANTS.SOCKET_EVENTS.DISCONNECT, () => {
        console.log("Disconnected from the socket server");
        showToast({ message: "Disconnected from the socket server", type: "error" });
      });

      // Cleanup on unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [userData]);

  // Render nothing or a loading indicator while isLoading is true
  if (isLoading) {
    return <div>Loading...</div>; // You can customize this (e.g., a spinner)
  }

  // Render the UI once loading is complete
  return (
    <MainLayout>
      <HomeFeed />
    </MainLayout>
  );
}
