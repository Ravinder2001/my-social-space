import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Paperclip, ImageIcon, Mic, Smile, Send, MoreVertical, ArrowLeft } from "lucide-react";
import React, { ChangeEvent, useEffect, useState, useRef, lazy, Suspense } from "react";
import { ChannelType, MessageType } from "../utils/CommanTypes";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { formatTime } from "../utils/functions";

// Lazy load EmojiPicker to improve performance
const EmojiPicker = lazy(() =>
  import("emoji-picker-react").then((module) => {
    return { default: module.default };
  })
);
import type { EmojiClickData, Theme } from "emoji-picker-react";
import { useSocket } from "../providers/socket-provider";

interface MessageRoomProps {
  activeConversation: ChannelType;
  isMobile: boolean;
  showConversationList: boolean;
  onBackToList: () => void;
}

function MessageRoom({ activeConversation, isMobile, showConversationList, onBackToList }: MessageRoomProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const { fetchData: FetchChannelMsg } = useApiFetch(CONSTANTS.API_ROUTES.GET_CHANNEL_MESSAGES + `/${activeConversation.channel_id}`);
  const { fetchData: SendMessage } = useApiFetch("");

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
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
          ...prev,
          {
            message_id: res.data.message_id,
            message: messageInput,
            sent_at: res.data.sent_at,
            content_type: "TEXT",
            ownMessage: true,
          },
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

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTyping(!isTyping);
    }, 5000);
    return () => clearInterval(timer);
  }, [isTyping]);

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
    FetchChannelMsg().then((res: any) => {
      if (res.success == 1) {
        setMessages(res.data);
        setIsInitialLoad(true);
      }
    });
  }, [activeConversation.channel_id]);

  // Scroll to bottom on initial load and when sending new messages
  useEffect(() => {
    if (messages.length > 0) {
      if (isInitialLoad) {
        scrollToBottom();
        setIsInitialLoad(false);
      } else {
        // Check if the user is already at the bottom before auto-scrolling
        const container = messagesContainerRef.current;
        if (container) {
          const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
          if (isAtBottom) {
            scrollToBottom();
          }
        }
      }
    }
  }, [messages, isInitialLoad]);

  // Format dates for message grouping
  const formatMessageDate = (timestamp: string) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset hours to compare just the dates
    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

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

  const { socket } = useSocket();

  return (
    <div className={`flex-1 flex flex-col ${isMobile && showConversationList ? "hidden" : "flex"}`}>
      {/* Chat header */}
      <div className="h-16 border-b flex items-center justify-between px-4">
        {isMobile && (
          <Button variant="ghost" size="icon" className="mr-2" onClick={onBackToList}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to conversations</span>
          </Button>
        )}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={activeConversation?.profile_picture} alt={activeConversation?.channel_name || "User"} />
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
      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
        {groupMessagesByDate(messages).map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            {/* Date separator */}
            <div className="flex justify-center my-4">
              <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">{group.date}</div>
            </div>

            {/* Messages for this date */}
            {group.messages.map((message) => (
              <div key={message.message_id} className={`flex ${message.ownMessage ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-lg p-3 ${message.ownMessage ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <p>{message.message}</p>
                  <p className={`text-xs mt-1 ${message.ownMessage ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {formatTime(message.sent_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
        {isTyping && (
          <div className="px-4 pb-1 mt-2">
            <div className="flex items-center text-sm text-gray-500">
              <div className="flex space-x-1 mr-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "600ms" }}></div>
              </div>
              <span>John is typing...</span>
            </div>
          </div>
        )}
      </div>
      {/* Message input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Attach file</span>
          </Button> */}
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Attach image</span>
          </Button>
          {/* <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Voice message</span>
          </Button> */}
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
                      // theme={Theme.AUTO}
                      previewConfig={{
                        showPreview: true,
                      }}
                      lazyLoadEmojis={true}
                    />
                  </Suspense>
                </div>
              )}
              <Button variant="ghost" size="icon" className="h-full" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <Smile className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Add emoji</span>
              </Button>
            </div>
          </div>
          <Button size="icon" className="rounded-full" onClick={handleSendMsg} disabled={!messageInput.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MessageRoom;
