import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import Navbar from "@/components/Navbar/Navbar";
import { PostPreview } from "@/components/PostBox/PostBox";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import React from "react";

function page() {
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
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <LeftSidebar />
          {/* <MainFeed /> */}
          <div className="max-w-xl mx-auto space-y-4">
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

export default page;
