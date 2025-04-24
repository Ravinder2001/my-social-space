"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Heart, MessageCircle, Share, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditPostType, PostType } from "../utils/CommanTypes";
import moment from "moment";

type Props = {
  post: PostType;
  onEditClick: (e: EditPostType) => void;
};

export function PostCard({ post, onEditClick }: Props) {
  const [liked, setLiked] = useState(post.is_liked);
  const [likesCount, setLikesCount] = useState(post.like_count);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const toggleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const nextMedia = () => {
    if (currentMediaIndex < post.images.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  const prevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  // Truncate content if it's too long
  const shouldTruncate = post.caption.length > 150 && !expanded;
  const displayContent = shouldTruncate ? post.caption.substring(0, 150) + "..." : post.caption;

  // Determine how many images to show (max 4)
  const visibleMedia = post.images.slice(0, 4);
  const remainingCount = post.images.length > 4 ? post.images.length - 4 : 0;

  return (
    <div className="bg-card rounded-xl shadow-sm overflow-hidden animate-fade-in">
      {/* Post header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.profile_picture} alt={post.user_name} />
            <AvatarFallback>{post.user_name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{post.user_name}</span>
            </div>
            <p className="text-xs text-muted-foreground">{moment(post.created_at).format("DD-MM-YYYY HH:MM")}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {post.ownPost ? (
              <DropdownMenuItem
                onClick={() => {
                  onEditClick({
                    id: post.post_id,
                    caption: post.caption,
                    visibility: post.visibility,
                    images: post.images.map((item) => ({ key: item, url: item })),
                  });
                }}
              >
                Edit Post
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem>Save Post</DropdownMenuItem>
            <DropdownMenuItem>Hide Post</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Report Post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post content */}
      <div className="px-4 pb-3">
        <p className="whitespace-pre-line">
          {displayContent}
          {shouldTruncate && (
            <Button variant="link" className="px-0 h-auto font-normal" onClick={() => setExpanded(true)}>
              See more
            </Button>
          )}
        </p>
      </div>

      {/* Post images */}
      {post.images.length > 0 && (
        <div className="relative">
          {post.images.length === 1 ? (
            // Single image
            <img src={post.images[0] || "/placeholder.svg"} alt={`Post by ${post.user_name}`} className="w-full object-cover max-h-[400px]" />
          ) : (
            // Multiple images grid
            <div className={`grid gap-1 ${post.images.length === 2 ? "grid-cols-2" : "grid-cols-2 grid-rows-2"}`}>
              {visibleMedia.map((images, index) => (
                <div key={index} className="relative aspect-square">
                  <img src={images || "/placeholder.svg"} alt={`Post by ${post.user_name}`} className="w-full h-full object-cover" />
                  {/* Show count overlay on the last visible image if there are more */}
                  {index === visibleMedia.length - 1 && remainingCount > 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">+{remainingCount}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Navigation arrows for single image view */}
          {post.images.length > 1 && post.images.length <= 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full"
                onClick={prevMedia}
                disabled={currentMediaIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full"
                onClick={nextMedia}
                disabled={currentMediaIndex === post.images.length - 1}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </>
          )}
        </div>
      )}

      {/* Post stats */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-muted-foreground">
        <div>
          {likesCount > 0 && (
            <span>
              {likesCount} {likesCount === 1 ? "like" : "likes"}
            </span>
          )}
        </div>
        <div className="flex gap-4">
          {post.comment_count > 0 && (
            <span>
              {post.comment_count} {post.comment_count === 1 ? "comment" : "comments"}
            </span>
          )}
        </div>
      </div>

      <Separator />

      {/* Post actions */}
      <div className="px-2 py-1 flex justify-between">
        <Button variant="ghost" size="sm" className={cn("gap-2 flex-1", liked ? "text-brand-red" : "")} onClick={toggleLike}>
          <Heart className={cn("h-5 w-5", liked ? "fill-current animate-pulse-once" : "")} />
          <span>Like</span>
        </Button>

        <Button variant="ghost" size="sm" className="gap-2 flex-1">
          <MessageCircle className="h-5 w-5" />
          <span>Comment</span>
        </Button>

        <Button variant="ghost" size="sm" className="gap-2 flex-1">
          <Share className="h-5 w-5" />
          <span>Share</span>
        </Button>
      </div>

      {/* Comments preview */}
      {post.comment_count > 0 && (
        <div className="px-4 py-2 bg-muted/30">
          <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
            View all {post.comment_count} comments
          </Button>
        </div>
      )}
      {post.latest_comment ? (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.latest_comment.profile_picture} alt={post.latest_comment.user_name} />
            <AvatarFallback>{post.latest_comment.user_name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{post.latest_comment.user_name}</span>
            </div>
            <p className="text-xs text-muted-foreground">{post.latest_comment.content}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
