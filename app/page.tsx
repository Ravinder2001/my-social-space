"use client";
import { MainLayout } from "@/components/layouts/main-layout";
import { HomeFeed } from "@/components/home/home-feed";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUserDetails, UserState } from "@/lib/Slices/UserSlice";
import { useEffect, useState } from "react";
import CONSTANTS from "@/components/utils/constants";

export default function Home() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const saveSessionDetails = async () => {
    try {
      const session: any = await getSession();
      if (session?.user?.authToken) {
        dispatch(setUserDetails(session.user));
        localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEY, session?.user.authToken);
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
