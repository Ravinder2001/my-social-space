"use client";

import React, { type ChangeEvent, useEffect, useState, useCallback, useRef } from "react";
import type { ChannelType, MessageType } from "../utils/CommanTypes";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { MessageHeader } from "./message-header";
import { MessageInput } from "./message-input";
import { MessageList } from "./message-list";
import { MessageEditDialog } from "./message-edit-dialog";
import { MessageDeleteDialog } from "./message-delete-dialog";
import type { EmojiClickData } from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChannel, setNewMessage } from "@/lib/Slices/MessageSlice";
import type { RootState } from "@/lib/store";
import { useSocket } from "../providers/socket-provider";

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
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { fetchData: FetchChannelMsg } = useApiFetch(
    CONSTANTS.API_ROUTES.GET_CHANNEL_MESSAGES + `/${activeConversation.channel_id}`
  );
  const { fetchData: SendMessage } = useApiFetch("");
  const { fetchData: EditMessage } = useApiFetch("");
  const { fetchData: DeleteMessage } = useApiFetch("");

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
    }, 2000);
  };

  const handleSendMsg = async () => {
    if (!messageInput.trim()) return;

    await SendMessage(CONSTANTS.API_ROUTES.SEND_MESSAGE + `/${activeConversation.channel_id}`, {
      method: "POST",
      data: {
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
        setTimeout(scrollToBottom, 100);
      }
    });
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessageInput((prev) => prev + emojiData.emoji);
  };

  const formatMessageDate = (timestamp: string) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

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
      return `${messageDate.getDate().toString().padStart(2, "0")}/${(messageDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${messageDate.getFullYear()}`;
    }
  };

  const canEditOrDelete = useCallback((message: MessageType) => {
    if (!message.ownMessage) return false;
    const sentAt = new Date(message.sent_at);
    const now = new Date();
    const diffMs = now.getTime() - sentAt.getTime();
    const diffMins = diffMs / (1000 * 60);
    return diffMins <= 15;
  }, []);

  const handleOpenEdit = (message: MessageType) => {
    setSelectedMessage(message);
    setEditMessageInput(message.message);
    setEditDialogOpen(true);
  };

  const handleOpenDelete = (message: MessageType) => {
    setSelectedMessage(message);
    setDeleteDialogOpen(true);
  };

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

  useEffect(() => {
    setIsLoading(true);
    FetchChannelMsg().then((res: any) => {
      if (res.success == 1) {
        setMessages(res.data);
        setIsLoading(false);
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

  useEffect(() => {
    if (currentChannel.channel_id == activeConversation.channel_id && currentChannel.newMsg) {
      if (isTyping) {
        setIsTyping(false);
      }
      setMessages((prev) => [currentChannel.newMsg, ...prev]);
      dispatch(setNewMessage(null));
    }
  }, [currentChannel]);

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

    socket.emit(CONSTANTS.SOCKET_EVENTS.CHAT_OPENED, {
      channel_id: activeConversation.channel_id,
    });

    socket.on(CONSTANTS.SOCKET_EVENTS.USER_TYPING, handleTyping);
    socket.on(CONSTANTS.SOCKET_EVENTS.USER_NOT_TYPING, handleStopTyping);
    socket.on(CONSTANTS.SOCKET_EVENTS.MSG_DELETED, handleMsgDeleted);
    socket.on(CONSTANTS.SOCKET_EVENTS.MSG_EDITED, handleMsgEdited);

    return () => {
      socket.off(CONSTANTS.SOCKET_EVENTS.USER_TYPING, handleTyping);
      socket.off(CONSTANTS.SOCKET_EVENTS.USER_NOT_TYPING, handleStopTyping);
      socket.off(CONSTANTS.SOCKET_EVENTS.MSG_DELETED, handleMsgDeleted);
      socket.off(CONSTANTS.SOCKET_EVENTS.MSG_EDITED, handleMsgEdited);
      socket.emit(CONSTANTS.SOCKET_EVENTS.CHAT_CLOSED, {
        channel_id: activeConversation.channel_id,
      });
    };
  }, [socket, activeConversation.channel_id]);

  return (
    <div
      className={`fixed inset-0 sm:relative sm:flex-1 flex flex-col bg-background z-0 ${
        isMobile && showConversationList ? "hidden" : "flex"
      }`}
    >
      <MessageHeader
        activeConversation={activeConversation}
        isMobile={isMobile}
        onBackToList={onBackToList}
      />

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-2 sm:p-4 flex flex-col-reverse scroll-smooth"
      >
        <MessageList
          messages={messages}
          isLoading={isLoading}
          isTyping={isTyping}
          canEditOrDelete={canEditOrDelete}
          onOpenEdit={handleOpenEdit}
          onOpenDelete={handleOpenDelete}
          formatMessageDate={formatMessageDate}
        />
      </div>

      <MessageInput
        messageInput={messageInput}
        showEmojiPicker={showEmojiPicker}
        isMobile={isMobile}
        onMessageChange={handleChange}
        onSendMessage={handleSendMsg}
        onEmojiClick={handleEmojiClick}
        onToggleEmojiPicker={() => setShowEmojiPicker(!showEmojiPicker)}
      />

      <MessageEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        editMessageInput={editMessageInput}
        onEditMessageChange={(value) => setEditMessageInput(value)}
        onConfirmEdit={handleConfirmEdit}
      />

      <MessageDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}

export default MessageRoom;
