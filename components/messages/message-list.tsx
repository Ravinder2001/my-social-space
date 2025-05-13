import React from "react";
import { type MessageType } from "../utils/CommanTypes";
import { MessageItem } from "./message-item";

interface MessageListProps {
  messages: MessageType[];
  isLoading: boolean;
  isTyping: boolean;
  canEditOrDelete: (message: MessageType) => boolean;
  onOpenEdit: (message: MessageType) => void;
  onOpenDelete: (message: MessageType) => void;
  formatMessageDate: (timestamp: string) => string;
}

export function MessageList({
  messages,
  isLoading,
  isTyping,
  canEditOrDelete,
  onOpenEdit,
  onOpenDelete,
  formatMessageDate,
}: MessageListProps) {
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

  if (isLoading) {
    return (
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
    );
  }

  return (
    <div className="flex flex-col-reverse space-y-reverse space-y-4">
      {/* Typing indicator */}
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
          </div>
        </div>
      )}

      {/* Messages grouped by date */}
      {groupMessagesByDate(messages).map((group, groupIndex) => (
        <div key={groupIndex} className="flex flex-col-reverse gap-2">
          {/* Messages for this date */}
          {group.messages.map((message) => (
            <MessageItem
              key={message.message_id}
              message={message}
              canEditOrDelete={canEditOrDelete}
              onOpenEdit={onOpenEdit}
              onOpenDelete={onOpenDelete}
            />
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
  );
}
