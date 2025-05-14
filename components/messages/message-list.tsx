import React from "react";
import { ChannelMembers, type MessageType } from "../utils/CommanTypes";
import { MessageItem } from "./message-item";

interface MessageListProps {
  messages: MessageType[];
  isLoading: boolean;
  isTyping: boolean;
  canEditOrDelete: (message: MessageType) => boolean;
  onOpenEdit: (message: MessageType) => void;
  onOpenDelete: (message: MessageType) => void;
  formatMessageDate: (timestamp: string) => string;
  members: ChannelMembers[];
  isGroup: boolean;
}

export function MessageList({
  messages,
  isLoading,
  isTyping,
  canEditOrDelete,
  onOpenEdit,
  onOpenDelete,
  formatMessageDate,
  isGroup,
  members,
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
          {group.messages.map((message) => {
            let UserName;
            if (isGroup && !message.ownMessage) {
              UserName = members.find((item) => item.user_id == message.sender_id);
            }

            // Get members who have this message_id as their last seen
            const seenByMembers = members.filter(
              (member) => member.last_seen_message_id === message.message_id
            );
            return (
              <React.Fragment key={message.message_id}>
                {/* Seen by text */}
                {seenByMembers.length > 0 && (
                  <div className="text-xs text-muted-foreground flex justify-end -mt-1">
                    {isGroup
                      ? `Seen by ${seenByMembers.map((m) => m.full_name.split(" ")[0]).join(", ")}`
                      : "Seen"}
                  </div>
                )}
                <MessageItem
                  message={message}
                  canEditOrDelete={canEditOrDelete}
                  onOpenEdit={onOpenEdit}
                  onOpenDelete={onOpenDelete}
                  name={isGroup && UserName ? UserName?.full_name.split(" ")[0] : null}
                />
              </React.Fragment>
            );
          })}

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
