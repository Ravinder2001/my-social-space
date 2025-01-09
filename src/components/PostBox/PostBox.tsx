"use client";
import React, { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PostModal } from "../PostModal/PostModal";

export const PostPreview = ({
  username = "Username",
  userImage = "/api/placeholder/32/32",
  caption,
  images,
  timestamp = "2 hours ago",
  likes = 0,
  comments = [],
  isPreview = false,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ImageGrid = ({ images }) => {
    if (!images?.length) return null;

    if (images.length === 1) {
      return (
        <div className="relative">
          <img src={images[0]} alt="Post" className="w-full rounded-lg object-cover max-h-[24rem]" />
        </div>
      );
    }

    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Post ${index + 1}`} className="w-full rounded-lg object-cover max-h-[24rem]" />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2" onClick={() => setIsModalOpen(true)}>
        <img src={images[0]} alt="Post 1" className="w-full rounded-lg object-cover max-h-[24rem]" />
        <div className="relative">
          <img src={images[1]} alt="Post 2" className="w-full rounded-lg object-cover max-h-[24rem]" />
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-semibold">+{images.length - 2}</span>
          </div>
        </div>
      </div>
    );
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-md overflow-hidden p-2", isPreview ? "border p-4" : "border-b pb-4")}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img src={userImage} alt={username} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900">{username}</div>
            {!isPreview && <div className="text-xs text-gray-500">{timestamp}</div>}
          </div>
        </div>
        {!isPreview && (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Images */}
      <div className="mb-4">
        <ImageGrid images={images} />
      </div>

      {/* Action Buttons */}
      {!isPreview && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLike}>
              <Heart className={cn("h-5 w-5", isLiked && "fill-red-500 text-red-500")} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSaved(!isSaved)}>
            <Bookmark className={cn("h-5 w-5", isSaved && "fill-black text-black")} />
          </Button>
        </div>
      )}

      {/* Likes & Caption */}
      {!isPreview && (
        <div className="space-y-2">
          <div className="font-medium text-sm text-gray-900">{likeCount.toLocaleString()} likes</div>
          <div className="text-sm text-gray-800">
            <span className="font-medium mr-2">{username}</span>
            {caption}
          </div>
          {comments.length > 0 && <div className="text-sm text-gray-500 cursor-pointer">View all {comments.toLocaleString()} comments</div>}
        </div>
      )}

      {/* Preview Caption */}
      {isPreview && caption && (
        <div className="text-sm text-gray-800 px-4">
          <span className="font-medium mr-2">{username}</span>
          {caption}
        </div>
      )}
      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        caption={caption}
        likes={likeCount}
        comments={[]}
        currentUser={{
          username: "CurrentUser",
          avatar: "/api/placeholder/32/32",
        }}
      />
    </div>
  );
};
