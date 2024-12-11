import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import MainFeed from "@/components/MainFeed/MainFeed";
import Navbar from "@/components/Navbar/Navbar";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import React from "react";

async function page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <LeftSidebar />
          <MainFeed />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default page;
