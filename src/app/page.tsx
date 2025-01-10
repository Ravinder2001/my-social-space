"use client";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import Navbar from "@/components/Navbar/Navbar";
import { PostPreview } from "@/components/PostBox/PostBox";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import VideoCallNotification from "@/components/VideoCallNotification/VideoCallNotification";

function Page() {
  const posts = [
    {
      username: "JohnDoe",
      userImage: "/api/placeholder/32/32",
      caption: "Exploring the beautiful beaches of Hawaii! 🌴🌊",
      images: [
        "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
      ],
      timestamp: "2 hours ago",
      likes: 1234,
      comments: 56,
    },
    {
      username: "JohnDoe",
      userImage: "/api/placeholder/32/32",
      caption: "Exploring the beautiful beaches of Hawaii! 🌴🌊",
      images: [
        "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
      ],
      timestamp: "2 hours ago",
      likes: 1234,
      comments: 56,
    },
    {
      username: "JohnDoe",
      userImage: "/api/placeholder/32/32",
      caption: "Exploring the beautiful beaches of Hawaii! 🌴🌊",
      images: [
        "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
      ],
      timestamp: "2 hours ago",
      likes: 1234,
      comments: 56,
    },
  ];

  //notifications
  const [showNotification, setShowNotification] = useState(false);

  const handleAccept = () => {
    console.log("Call accepted");
    setShowNotification(false);
  };

  const handleDecline = () => {
    console.log("Call declined");
    setShowNotification(false);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <LeftSidebar />
          {/* <MainFeed /> */}
          <div className="max-w-xl mx-auto space-y-4">
            <Button onClick={() => setShowNotification(true)} className="mb-4">
              Simulate Incoming Call
            </Button>
            {showNotification && (
              <VideoCallNotification
                callerName="John Doe"
                callerImage="/placeholder.svg?height=100&width=100"
                onAccept={handleAccept}
                onDecline={handleDecline}
              />
            )}

            {posts.map((post, index) => (
              <PostPreview key={index} {...post} />
            ))}
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default Page;
