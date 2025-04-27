"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle, Share, MoreHorizontal, ChevronLeft, ChevronRight, Smile, Send, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PostType } from "../utils/CommanTypes";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import moment from "moment";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { formatTimeAgo } from "../utils/functions";

type PostViewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: PostType;
};

type CommentType = {
  comment_id: number;
  user_name: string;
  profile_picture: string;
  content: string;
  created_at: string;
};

export function PostViewModal({ open, onOpenChange, post }: PostViewModalProps) {
  const UserDetails = useSelector((state: RootState) => state.user);

  const [liked, setLiked] = useState(post.is_liked);
  const [saved, setSaved] = useState(post.is_saved);
  const [likesCount, setLikesCount] = useState(post.like_count);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const { fetchData: ToggleLike } = useApiFetch("");
  const { fetchData: AddComment } = useApiFetch("");
  const { fetchData: FetchCommentsList } = useApiFetch(CONSTANTS.API_ROUTES.FETCH_COMMENTS + `/${post.post_id}`);

  const toggleLike = async () => {
    await ToggleLike(CONSTANTS.API_ROUTES.TOGGLE_LIKE + `/${post.post_id}`).then((res) => {
      if (res.success == 1) {
        if (liked) {
          setLikesCount(likesCount - 1);
        } else {
          setLikesCount(likesCount + 1);
        }
        setLiked(!liked);
      }
    });
  };

  const toggleSave = async () => {
    await ToggleLike(CONSTANTS.API_ROUTES.TOGGLE_SAVE + `/${post.post_id}`).then((res) => {
      if (res.success == 1) {
        setSaved(!saved);
      }
    });
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    await AddComment(CONSTANTS.API_ROUTES.ADD_COMMENT + `/${post.post_id}`, {
      method: "POST",
      data: {
        content: newComment,
      },
    }).then((res: any) => {
      if (res.success == 1) {
        setComments((prev) => [
          {
            comment_id: res.data.comment_id,
            content: newComment,
            user_name: UserDetails.name,
            profile_picture: UserDetails.profile_picture,
            created_at: res?.data.created_at,
          },
          ...prev,
        ]);
        setNewComment("");
      }
    });
  };

  const nextMedia = () => {
    if (post && currentMediaIndex < post.images.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  const prevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  useEffect(() => {
    if (open) {
      FetchCommentsList().then((res: any) => {
        if (res.success == 1) {
          setComments(res.data);
        }
      });
    }
  }, [open]);

  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] p-0 max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
        {/* Left side - Image gallery */}
        <div className="relative w-full md:w-1/2 bg-black flex items-center justify-center h-[40vh] md:h-[80vh]">
          {post.images.length > 0 ? (
            <>
              <img
                src={post.images[currentMediaIndex] || "/placeholder.svg"}
                alt={`Post by ${post.user_name}`}
                className="max-h-full max-w-full object-contain"
              />

              {post.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full"
                    onClick={prevMedia}
                    disabled={currentMediaIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Previous</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full"
                    onClick={nextMedia}
                    disabled={currentMediaIndex === post.images.length - 1}
                  >
                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Next</span>
                  </Button>

                  {/* Image thumbnails */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {post.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentMediaIndex ? "bg-white" : "bg-white/50"}`}
                        onClick={() => setCurrentMediaIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">No images available</div>
          )}
        </div>

        {/* Right side - Post details and comments */}
        <div className="w-full md:w-1/2 flex flex-col bg-background h-[60vh] md:h-[80vh]">
          {/* Post header */}
          <div className="p-3 md:p-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-2 md:gap-3">
              <Avatar className="h-7 w-7 md:h-8 md:w-8">
                <AvatarImage src={post.profile_picture || "/placeholder.svg"} alt={post.user_name} />
                <AvatarFallback>{post.user_name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm md:text-base">{post.user_name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{moment(post.created_at).format("DD-MM-YYYY HH:MM")}</p>
              </div>
            </div>
          </div>

          {/* Post content */}
          <div className="p-3 md:p-4 border-b">
            <p className="whitespace-pre-line text-sm md:text-base">{post.caption}</p>
          </div>

          {/* Post stats */}
          <div className="px-3 md:px-4 py-1 md:py-2 flex items-center justify-between text-xs md:text-sm text-muted-foreground border-b">
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

          {/* Post actions */}
          <div className="px-1 md:px-2 py-1 flex justify-between border-b">
            <Button variant="ghost" size="sm" className={cn("gap-1 md:gap-2 flex-1", liked ? "text-brand-red" : "")} onClick={toggleLike}>
              <Heart className={cn("h-4 w-4 md:h-5 md:w-5", liked ? "fill-current animate-pulse-once" : "")} />
              <span className="text-xs md:text-sm">Like</span>
            </Button>

            <Button variant="ghost" size="sm" className="gap-1 md:gap-2 flex-1" onClick={() => commentInputRef.current?.focus()}>
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs md:text-sm">Comment</span>
            </Button>

            <Button variant="ghost" size="sm" className={cn("gap-2 flex-1", saved ? "text-brand-white" : "")} onClick={toggleSave}>
              <Bookmark className={cn("h-5 w-5", saved ? "fill-current animate-pulse-once" : "")} />
              <span>Save</span>
            </Button>
          </div>

          {/* Comments section */}
          <ScrollArea className="flex-1 p-2 md:p-4">
            <div className="space-y-3 md:space-y-4">
              {comments.map((comment) => (
                <div key={comment.comment_id} className="space-y-2">
                  <div className="flex gap-2 md:gap-3">
                    <Avatar className="h-6 w-6 md:h-8 md:w-8 flex-shrink-0">
                      <AvatarImage src={comment.profile_picture || "/placeholder.svg"} alt={comment.user_name} />
                      <AvatarFallback>{comment.user_name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="bg-muted rounded-xl p-2 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs md:text-sm text-primary">{comment.user_name}</span>
                          <span className="text-[10px] md:text-xs text-gray-400">{formatTimeAgo(comment.created_at)}</span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-100 leading-relaxed break-words">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Add comment */}
          <div className="p-2 md:p-4 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 md:h-8 md:w-8 flex-shrink-0">
                <AvatarImage src={UserDetails.profile_picture || "/placeholder.svg"} alt={UserDetails.name} />
                <AvatarFallback>{UserDetails.name[0]}</AvatarFallback>
              </Avatar>
              <div className="relative flex-1">
                <Textarea
                  ref={commentInputRef}
                  placeholder="Add a comment..."
                  className="min-h-[36px] md:min-h-[40px] py-1 md:py-2 pr-10 text-xs md:text-sm resize-none"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      addComment();
                    }
                  }}
                />
                <div className="absolute right-2 top-1 md:top-2 flex items-center gap-1 md:gap-2">
                  <Button variant="ghost" size="icon" className="h-5 w-5 md:h-6 md:w-6 rounded-full">
                    <Smile className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    <span className="sr-only">Add emoji</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 md:h-6 md:w-6 rounded-full text-primary"
                    onClick={addComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="sr-only">Send comment</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
