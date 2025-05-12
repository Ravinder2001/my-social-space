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
import React, {
  type ChangeEvent,
  useEffect,
  useState,
  useRef,
  lazy,
  Suspense,
  useCallback,
} from "react";
import type { ChannelType, MessageType } from "../utils/CommanTypes";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
  const [editMessageInput, setEditMessageInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { fetchData: FetchChannelMsg } = useApiFetch(
    CONSTANTS.API_ROUTES.GET_CHANNEL_MESSAGES + `/${activeConversation.channel_id}`
  );
  const { fetchData: SendMessage } = useApiFetch("");
  const { fetchData: EditMessage } = useApiFetch("");
  const { fetchData: DeleteMessage } = useApiFetch("");

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
            is_edited: false,
            is_deleted: false,
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

  // Helper: check if message is editable/deletable
  const canEditOrDelete = useCallback((message: MessageType) => {
    if (!message.ownMessage) return false;
    const sentAt = new Date(message.sent_at);
    const now = new Date();
    const diffMs = now.getTime() - sentAt.getTime();
    const diffMins = diffMs / (1000 * 60);
    return diffMins <= 15;
  }, []);

  // Handler: open edit dialog
  const handleOpenEdit = (message: MessageType) => {
    setSelectedMessage(message);
    setEditMessageInput(message.message);
    setEditDialogOpen(true);
  };

  // Handler: open delete dialog
  const handleOpenDelete = (message: MessageType) => {
    setSelectedMessage(message);
    setDeleteDialogOpen(true);
  };

  // Handler: confirm edit
  const handleConfirmEdit = async () => {
    if (!selectedMessage || !editMessageInput.trim()) return;
    await EditMessage(CONSTANTS.API_ROUTES.EDIT_MESSAGE + `/${selectedMessage.message_id}`, {
      method: "PUT",
      data: {
        message: editMessageInput,
      },
    }).then((res) => {
      if (res.success == 1) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.message_id === selectedMessage.message_id
              ? { ...msg, message: editMessageInput, is_edited: true }
              : msg
          )
        );
        setEditDialogOpen(false);
        setSelectedMessage(null);
      }
    });
  };

  // Handler: confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedMessage) return;
    await DeleteMessage(CONSTANTS.API_ROUTES.DELETE_MESSAGE + `/${selectedMessage.message_id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.success == 1) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.message_id === selectedMessage.message_id
              ? { ...msg, message: "This message has been deleted", is_deleted: true }
              : msg
          )
        );
        setDeleteDialogOpen(false);
        setSelectedMessage(null);
      }
    });
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

    const handleMsgDeleted = (data: { channel_id: number; message_id: number }) => {
      if (data.channel_id === activeConversation.channel_id) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.message_id === data.message_id
              ? { ...msg, message: "This message has been deleted", is_deleted: true }
              : msg
          )
        );
      }
    };

    const handleMsgEdited = (data: { channel_id: number; message_id: number; message: string }) => {
      if (data.channel_id === activeConversation.channel_id) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.message_id === data.message_id
              ? { ...msg, message: data.message, is_edited: true }
              : msg
          )
        );
      }
    };

    socket.on(CONSTANTS.SOCKET_EVENTS.USER_TYPING, handleTyping);
    socket.on(CONSTANTS.SOCKET_EVENTS.USER_NOT_TYPING, handleStopTyping);
    socket.on(CONSTANTS.SOCKET_EVENTS.MSG_DELETED, handleMsgDeleted);
    socket.on(CONSTANTS.SOCKET_EVENTS.MSG_EDITED, handleMsgEdited);

    return () => {
      socket.off(CONSTANTS.SOCKET_EVENTS.USER_TYPING, handleTyping);
      socket.off(CONSTANTS.SOCKET_EVENTS.USER_NOT_TYPING, handleStopTyping);
      socket.off(CONSTANTS.SOCKET_EVENTS.MSG_DELETED, handleMsgDeleted);
      socket.off(CONSTANTS.SOCKET_EVENTS.MSG_EDITED, handleMsgEdited);
    };
  }, [socket, activeConversation.channel_id]);

  return (
    <div
      className={`fixed inset-0 sm:relative sm:flex-1 flex flex-col bg-background z-0 ${
        isMobile && showConversationList ? "hidden" : "flex"
      }`}
    >
      {/* Chat header */}
      <div
        className={`sticky top-0 z-50 h-14 sm:h-16 border-b flex items-center justify-between px-3 sm:px-4 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/95 ${isMobile && "mt-[70px]"}`}
      >
        {isMobile && (
          <Button variant="ghost" size="icon" className="mr-1 h-8 w-8" onClick={onBackToList}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to conversations</span>
          </Button>
        )}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
            <AvatarImage
              src={activeConversation?.profile_picture || "/placeholder.svg"}
              alt={activeConversation?.channel_name || "User"}
            />
            <AvatarFallback>{activeConversation?.channel_name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate text-sm sm:text-base">
              {activeConversation?.channel_name}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="bottom" className="w-48">
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>Search in conversation</DropdownMenuItem>
            <DropdownMenuItem>Mute notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Block user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-2 sm:p-4 flex flex-col-reverse scroll-smooth"
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
                    <div className="relative max-w-[70%]">
                      <div
                        className={`rounded-lg p-3 w-full group
                          ${message.ownMessage ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted shadow-sm"}
                        `}
                      >
                        {message.ownMessage && !message.is_deleted && canEditOrDelete(message) && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">More options</span>
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end" className="w-[160px]">
                                {message.content_type === "TEXT" && (
                                  <DropdownMenuItem onClick={() => handleOpenEdit(message)}>
                                    Edit message
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() => handleOpenDelete(message)}
                                  className="text-destructive"
                                >
                                  Delete message
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                        <p className="break-words pr-8">{message.message}</p>
                        <div className="flex items-center gap-2">
                          <p
                            className={`text-xs ${
                              message.ownMessage
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {moment(message.sent_at).format("HH:MM")}
                          </p>
                          {message.is_edited && !message.is_deleted && (
                            <i className="text-xs">Edited</i>
                          )}
                        </div>
                      </div>
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
      <div className="border-t p-2 sm:p-4 bg-background">
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
            <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
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
              className="pr-8 sm:pr-10 h-8 sm:h-10 text-sm"
            />
            <div className="absolute right-0 top-0 h-full">
              {/* Emoji picker */}
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute bottom-full right-0 z-50 mb-2"
                  style={{
                    width: isMobile ? "calc(100vw - 2rem)" : "320px",
                    maxHeight: isMobile ? "40vh" : "400px",
                  }}
                >
                  <Suspense
                    fallback={
                      <div className="bg-background border rounded-lg shadow-lg p-4 w-full h-[40vh] sm:h-[400px] flex items-center justify-center">
                        <div className="text-sm text-muted-foreground">Loading emojis...</div>
                      </div>
                    }
                  >
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      searchDisabled={false}
                      skinTonesDisabled={false}
                      width="100%"
                      height={isMobile ? "40vh" : "400px"}
                      previewConfig={{
                        showPreview: !isMobile,
                      }}
                      lazyLoadEmojis={true}
                    />
                  </Suspense>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 sm:h-10 w-8 sm:w-10"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <span className="sr-only">Add emoji</span>
              </Button>
            </div>
          </div>
          <Button
            size="icon"
            className="rounded-full h-8 w-8 sm:h-10 sm:w-10 shrink-0"
            onClick={handleSendMsg}
            disabled={!messageInput.trim()}
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>

      {/* Edit Message Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="w-[90vw] max-h-[200px] sm:w-[400px] p-4 sm:p-6 gap-4">
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              value={editMessageInput}
              onChange={(e) => setEditMessageInput(e.target.value)}
              autoFocus
              className="min-h-0"
            />
          </div>
          <DialogFooter className="sm:justify-end">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
                className="flex-1 sm:flex-initial"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmEdit}
                disabled={!editMessageInput.trim()}
                className="flex-1 sm:flex-initial"
              >
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Message Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="w-[90vw] max-h-[200px] sm:w-[400px] p-4 sm:p-6 gap-4">
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this message?
          </p>
          <DialogFooter className="sm:justify-end">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="flex-1 sm:flex-initial"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                className="flex-1 sm:flex-initial"
              >
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MessageRoom;
