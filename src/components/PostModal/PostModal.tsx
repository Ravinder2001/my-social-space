"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  caption: string;
  likes: number;
  comments: Comment[];
  currentUser: {
    username: string;
    avatar: string;
  };
}

export function PostModal({ isOpen, onClose, images, caption, likes, comments, currentUser }: PostModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newComment, setNewComment] = useState("");

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the comment to your backend
    console.log("New comment:", newComment);
    setNewComment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-[80vh]">
          {/* Image Carousel */}
          <div className="relative w-full md:w-2/3 bg-black flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Post image ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full"
                  onClick={prevImage}
                >
                  &lt;
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full"
                  onClick={nextImage}
                >
                  &gt;
                </Button>
              </>
            )}
          </div>

          {/* Comments and Likes */}
          <div className="w-full md:w-1/3 flex flex-col bg-white">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  <span className="font-semibold">{likes} likes</span>
                </div>
              </div>
              <p className="text-sm">{caption}</p>
            </div>

            <ScrollArea className="flex-grow p-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2 mb-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.avatar} alt={comment.username} />
                    <AvatarFallback>{comment.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-semibold text-sm">{comment.username}</span>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>

            <form onSubmit={handleCommentSubmit} className="p-4 border-t flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                <AvatarFallback>{currentUser.username[0]}</AvatarFallback>
              </Avatar>
              <Input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon" disabled={!newComment.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
