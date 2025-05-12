"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageIcon, Smile, Send, MoreVertical, ArrowLeft } from "lucide-react";
import React, { type ChangeEvent, useEffect, useState, useRef, lazy, Suspense } from "react";
import type { ChannelType, MessageType } from "../utils/CommanTypes";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";

// Lazy load EmojiPicker to improve performance
const EmojiPicker = lazy(() =>
  import("emoji-picker-react").then((module) => {
    return { default: module.default };
  })
);
import type { EmojiClickData } from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChannel, setNewMessage } from "@/lib/Slices/MessageSlice";
import type { RootState } from "@/lib/store";
import { useSocket } from "../providers/socket-provider";
import moment from "moment";

interface MessageRoomProps {
  activeConversation: ChannelType;
  isMobile: boolean;
  showConversationList: boolean;
  onBackToList: () => void;
}

function MessageRoom({
  activeConversation,
  isMobile,
  showConversationList,
  onBackToList,
}: MessageRoomProps) {
  const dispatch = useDispatch();
  const currentChannel: any = useSelector((state: RootState) => state.message);
  const { socket } = useSocket();

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { fetchData: FetchChannelMsg } = useApiFetch(
    CONSTANTS.API_ROUTES.GET_CHANNEL_MESSAGES + `/${activeConversation.channel_id}`
  );
  const { fetchData: SendMessage } = useApiFetch("");

  // Function to scroll to bottom (which shows the latest messages)
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
    if (socket && activeConversation.channel_id) {
      socket.emit(CONSTANTS.SOCKET_EVENTS.USER_TYPING, {
        channel_id: activeConversation.channel_id,
      });
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (socket && activeConversation.channel_id) {
        socket.emit(CONSTANTS.SOCKET_EVENTS.USER_NOT_TYPING, {
          channel_id: activeConversation.channel_id,
        });
      }
    }, 1000);
  };

  const handleSendMsg = async () => {
    if (!messageInput.trim()) return;

    await SendMessage(CONSTANTS.API_ROUTES.SEND_MESSAGE, {
      method: "POST",
      data: {
        channel_id: activeConversation.channel_id,
        message: messageInput,
        content_type: "TEXT",
      },
    }).then((res: any) => {
      if (res.success == 1) {
        setMessageInput("");
        setMessages((prev) => [
          {
            message_id: res.data.message_id,
            message: messageInput,
            sent_at: res.data.sent_at,
            content_type: "TEXT",
            ownMessage: true,
          },
          ...prev,
        ]);
        // Scroll to bottom after sending a message
        setTimeout(scrollToBottom, 100); // Small timeout to ensure DOM update
      }
    });
  };

  // Handle emoji selection from emoji-picker-react
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessageInput((prev) => prev + emojiData.emoji);
    // setShowEmojiPicker(false);
  };

  // Format dates for message grouping
  const formatMessageDate = (timestamp: string) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset hours to compare just the dates
    const messageDay = new Date(
      messageDate.getFullYear(),
      messageDate.getMonth(),
      messageDate.getDate()
    );
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayDay = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate()
    );

    if (messageDay.getTime() === todayDay.getTime()) {
      return "Today";
    } else if (messageDay.getTime() === yesterdayDay.getTime()) {
      return "Yesterday";
    } else {
      // Format as "DD/MM/YYYY"
      return `${messageDate.getDate().toString().padStart(2, "0")}/${(messageDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${messageDate.getFullYear()}`;
    }
  };

  // Group messages by date
  const groupMessagesByDate = (messages: MessageType[]) => {
    const groups: { [key: string]: MessageType[] } = {};

    messages.forEach((message) => {
      const dateGroup = formatMessageDate(message.sent_at);
      if (!groups[dateGroup]) {
        groups[dateGroup] = [];
      }
      groups[dateGroup].push(message);
    });

    // Convert to array of date groups
    return Object.entries(groups).map(([date, messages]) => ({
      date,
      messages,
    }));
  };

  // Handle clicks outside the emoji picker to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    FetchChannelMsg().then((res: any) => {
      if (res.success == 1) {
        setMessages(res.data);
        setIsLoading(false);

        // Set a small timeout to ensure the DOM is updated before scrolling
        setTimeout(scrollToBottom, 100);
      }
    });

    if (activeConversation.channel_id) {
      dispatch(setActiveChannel(activeConversation.channel_id));
    }

    return () => {
      dispatch(setActiveChannel(null));
    };
  }, [activeConversation.channel_id]);

  // Handle new messages from socket
  useEffect(() => {
    if (currentChannel.channel_id == activeConversation.channel_id && currentChannel.newMsg) {
      if (isTyping) {
        setIsTyping(false);
      }
      setMessages((prev) => [currentChannel.newMsg, ...prev]);
      dispatch(setNewMessage(null));
    }
  }, [currentChannel]);

  // Don't force scroll when typing indicator changes
  useEffect(() => {
    if (isTyping) {
      const container = messagesContainerRef.current;
      if (container) {
        const isAtBottom =
          container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        if (isAtBottom) {
          setTimeout(scrollToBottom, 100);
        }
      }
    }
  }, [isTyping]);

  useEffect(() => {
    if (!socket || !activeConversation.channel_id) return;
    const handleTyping = (data: { channel_id: number }) => {
      if (data.channel_id === activeConversation.channel_id) {
        setIsTyping(true);
      }
    };
    const handleStopTyping = (data: { channel_id: number }) => {
      if (data.channel_id === activeConversation.channel_id) {
        setIsTyping(false);
      }
    };
    socket.on(CONSTANTS.SOCKET_EVENTS.USER_TYPING, handleTyping);
    socket.on(CONSTANTS.SOCKET_EVENTS.USER_NOT_TYPING, handleStopTyping);
    return () => {
      socket.off(CONSTANTS.SOCKET_EVENTS.USER_TYPING, handleTyping);
      socket.off(CONSTANTS.SOCKET_EVENTS.USER_NOT_TYPING, handleStopTyping);
    };
  }, [socket, activeConversation.channel_id]);

  return (
    <div className={`flex-1 flex flex-col ${isMobile && showConversationList ? "hidden" : "flex"}`}>
      {/* Chat header */}
      <div className="h-16 border-b flex items-center justify-between px-4 bg-card/50 shadow-sm">
        {isMobile && (
          <Button variant="ghost" size="icon" className="mr-2" onClick={onBackToList}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to conversations</span>
          </Button>
        )}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={activeConversation?.profile_picture || "/placeholder.svg"}
              alt={activeConversation?.channel_name || "User"}
            />
            <AvatarFallback>{activeConversation?.channel_name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{activeConversation?.channel_name}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>Search in conversation</DropdownMenuItem>
            <DropdownMenuItem>Mute notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Block user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages container with flex-col-reverse to invert the scroll direction */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col-reverse scroll-smooth"
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-2">
              <div className="flex space-x-1">
                <div
                  className="w-3 h-3 rounded-full bg-primary/70 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-3 h-3 rounded-full bg-primary/70 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className="w-3 h-3 rounded-full bg-primary/70 animate-bounce"
                  style={{ animationDelay: "600ms" }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">Loading messages...</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col-reverse space-y-reverse space-y-4">
            {/* Typing indicator at the top (visually at the bottom due to flex-col-reverse) */}
            {isTyping && (
              <div className="px-4 pb-1 mt-2 order-first">
                <div className="inline-flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full text-sm text-muted-foreground">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-primary/70 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-primary/70 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-primary/70 animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                  <span>typing...</span>
                </div>
              </div>
            )}

            {/* Messages grouped by date, in reverse order */}
            {groupMessagesByDate(messages).map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-col-reverse gap-2">
                {/* Messages for this date in reverse order */}
                {group.messages.map((message) => (
                  <div
                    key={message.message_id}
                    className={`flex ${message.ownMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.ownMessage
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted shadow-sm"
                      }`}
                    >
                      <p className="break-words">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.ownMessage
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {moment(message.sent_at).format("HH:MM")}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Date separator */}
                <div className="flex justify-center my-4">
                  <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                    {group.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Attach image</span>
          </Button>
          <div className="relative flex-1">
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMsg();
                }
              }}
              className="pr-10"
            />
            <div className="absolute right-0 top-0 h-full">
              {/* Emoji picker */}
              {showEmojiPicker && (
                <div ref={emojiPickerRef} className="absolute bottom-12 right-0 z-50">
                  <Suspense
                    fallback={
                      <div className="bg-background border rounded-lg shadow-lg p-4 w-64 h-64 flex items-center justify-center">
                        <div className="text-sm text-muted-foreground">Loading emojis...</div>
                      </div>
                    }
                  >
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      searchDisabled={false}
                      skinTonesDisabled={false}
                      width={320}
                      height={400}
                      previewConfig={{
                        showPreview: true,
                      }}
                      lazyLoadEmojis={true}
                    />
                  </Suspense>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-full"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Add emoji</span>
              </Button>
            </div>
          </div>
          <Button
            size="icon"
            className="rounded-full"
            onClick={handleSendMsg}
            disabled={!messageInput.trim()}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MessageRoom;
