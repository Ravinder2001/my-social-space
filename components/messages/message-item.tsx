import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import moment from "moment";
import { type MessageType } from "../utils/CommanTypes";

interface MessageItemProps {
  message: MessageType;
  canEditOrDelete: (message: MessageType) => boolean;
  onOpenEdit: (message: MessageType) => void;
  onOpenDelete: (message: MessageType) => void;
}

export function MessageItem({
  message,
  canEditOrDelete,
  onOpenEdit,
  onOpenDelete,
}: MessageItemProps) {
  return (
    <div className={`flex ${message.ownMessage ? "justify-end" : "justify-start"}`}>
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
                    <DropdownMenuItem onClick={() => onOpenEdit(message)}>
                      Edit message
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => onOpenDelete(message)}
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
                message.ownMessage ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}
            >
              {moment(message.sent_at).format("HH:MM")}
            </p>
            {message.is_edited && !message.is_deleted && <i className="text-xs">Edited</i>}
          </div>
        </div>
      </div>
    </div>
  );
}
