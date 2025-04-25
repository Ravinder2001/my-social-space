"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle, Share, MoreHorizontal, ChevronLeft, ChevronRight, Smile, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { PostType } from "../utils/CommanTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import moment from "moment";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";

type PostViewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: PostType;
};

type CommentType = {
  id: number;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies?: CommentType[];
};

// Mock comments data
const mockComments: CommentType[] = [
  {
    id: "1",
    user: {
      id: "2",
      name: "Emma Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content: "This looks amazing! Great work! 👏",
    timestamp: "2 hours ago",
    likes: 12,
    liked: false,
    replies: [
      {
        id: "1-1",
        user: {
          id: "1",
          name: "Demo User",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: true,
        },
        content: "Thank you so much! 😊",
        timestamp: "1 hour ago",
        likes: 3,
        liked: false,
      },
    ],
  },
  {
    id: "2",
    user: {
      id: "3",
      name: "Noah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    content: "I've been waiting for something like this. When will it be available to the public?",
    timestamp: "1 day ago",
    likes: 8,
    liked: true,
  },
  {
    id: "3",
    user: {
      id: "4",
      name: "Olivia Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    content: "The design is so clean and modern. Would love to see more of your work!",
    timestamp: "2 days ago",
    likes: 15,
    liked: false,
  },
  {
    id: "4",
    user: {
      id: "5",
      name: "Liam Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content: "This is exactly what I've been looking for. Is there a way to get early access?",
    timestamp: "3 days ago",
    likes: 7,
    liked: false,
  },
  {
    id: "5",
    user: {
      id: "6",
      name: "Ava Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    content: "The attention to detail is impressive. How long did it take you to complete this project?",
    timestamp: "4 days ago",
    likes: 9,
    liked: false,
  },
  {
    id: "6",
    user: {
      id: "7",
      name: "William Moore",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    content: "I'm definitely going to share this with my network. Great job!",
    timestamp: "5 days ago",
    likes: 11,
    liked: false,
  },
];

export function PostViewModal({ open, onOpenChange, post }: PostViewModalProps) {
  const UserDetails = useSelector((state: RootState) => state.user);

  const [liked, setLiked] = useState(post.is_liked);
  const [likesCount, setLikesCount] = useState(post.like_count);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [comments, setComments] = useState<CommentType[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const { fetchData: ToggleLike } = useApiFetch("");

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

  const handleCommentLike = (commentId: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          };
        }

        // Check for replies
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  liked: !reply.liked,
                  likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                };
              }
              return reply;
            }),
          };
        }

        return comment;
      })
    );
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: CommentType = {
      id: 123,
      user: {
        id: UserDetails.id,
        name: UserDetails.name,
        avatar: UserDetails.profile_picture,
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      liked: false,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] p-0 h-[80vh] max-h-[800px] flex overflow-hidden">
        {/* Left side - Image gallery */}
        <div className="relative w-full md:w-1/2 bg-black flex items-center justify-center">
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
        <div className="w-full md:w-1/2 flex flex-col bg-background">
          {/* Post header */}
          <div className="p-4 flex items-center justify-between border-b">
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

            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </div>

          {/* Post content */}
          <div className="p-4 border-b">
            <p className="whitespace-pre-line">{post.caption}</p>
          </div>

          {/* Post stats */}
          <div className="px-4 py-2 flex items-center justify-between text-sm text-muted-foreground border-b">
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
          <div className="px-2 py-1 flex justify-between border-b">
            <Button variant="ghost" size="sm" className={cn("gap-2 flex-1", liked ? "text-brand-red" : "")} onClick={toggleLike}>
              <Heart className={cn("h-5 w-5", liked ? "fill-current animate-pulse-once" : "")} />
              <span>Like</span>
            </Button>

            <Button variant="ghost" size="sm" className="gap-2 flex-1" onClick={() => commentInputRef.current?.focus()}>
              <MessageCircle className="h-5 w-5" />
              <span>Comment</span>
            </Button>

            <Button variant="ghost" size="sm" className="gap-2 flex-1">
              <Share className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>

          {/* Comments section */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm">{comment.user.name}</span>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <button className={cn("font-medium", comment.liked ? "text-brand-red" : "")} onClick={() => handleCommentLike(comment.id)}>
                          Like
                        </button>
                        <button className="font-medium">Reply</button>
                        <span>{comment.timestamp}</span>
                        {comment.likes > 0 && (
                          <span className="flex items-center gap-1">
                            <Heart className={cn("h-3 w-3", comment.liked ? "fill-brand-red text-brand-red" : "")} />
                            {comment.likes}
                          </span>
                        )}
                      </div>

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-6 mt-2 space-y-2">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                                <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-muted rounded-lg p-2">
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium text-xs">{reply.user.name}</span>
                                  </div>
                                  <p className="text-xs mt-1">{reply.content}</p>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                  <button
                                    className={cn("font-medium", reply.liked ? "text-brand-red" : "")}
                                    onClick={() => handleCommentLike(reply.id)}
                                  >
                                    Like
                                  </button>
                                  <span>{reply.timestamp}</span>
                                  {reply.likes > 0 && (
                                    <span className="flex items-center gap-1">
                                      <Heart className={cn("h-3 w-3", reply.liked ? "fill-brand-red text-brand-red" : "")} />
                                      {reply.likes}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Add comment */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={"/placeholder.svg?height=32&width=32"} alt={"User"} />
                <AvatarFallback>{"U"}</AvatarFallback>
              </Avatar>
              <div className="relative flex-1">
                <Textarea
                  ref={commentInputRef}
                  placeholder="Add a comment..."
                  className="min-h-[40px] py-2 pr-10 resize-none"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      addComment();
                    }
                  }}
                />
                <div className="absolute right-2 top-2 flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                    <Smile className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Add emoji</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full text-primary"
                    onClick={addComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="h-4 w-4" />
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
