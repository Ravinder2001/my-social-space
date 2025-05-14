import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { ChannelMembers, type ChannelType } from "../utils/CommanTypes";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { useSocket } from "../providers/socket-provider";
import { OnlineStatus } from "./online-status";

interface MessageHeaderProps {
  activeConversation: ChannelType;
  isMobile: boolean;
  onBackToList: () => void;
  setMembers: Dispatch<SetStateAction<ChannelMembers[]>>;
  setShowGroupInfo: Dispatch<SetStateAction<boolean>>;
  members: ChannelMembers[];
}

export function MessageHeader({
  activeConversation,
  isMobile,
  onBackToList,
  setMembers,
  members,
  setShowGroupInfo,
}: MessageHeaderProps) {
  const { socket } = useSocket();

  const { fetchData: GetChannelDetails } = useApiFetch("");

  useEffect(() => {
    GetChannelDetails(
      CONSTANTS.API_ROUTES.CHANNEL_DETAILS + `/${activeConversation.channel_id}`
    ).then((res: any) => {
      if (res.success == 1) {
        setMembers(res.data.members);
      }
    });
  }, [activeConversation]);

  useEffect(() => {
    if (!socket || !activeConversation.channel_id) return;

    const handleUserPresence = (data: {
      user_id: number;
      isOnline: boolean;
      channel_id: number;
      last_seen: string;
    }) => {
      if (data.channel_id === activeConversation.channel_id) {
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.user_id === data.user_id
              ? { ...member, is_online: data.isOnline, last_seen: data.last_seen }
              : member
          )
        );
      }
    };

    socket.on(CONSTANTS.SOCKET_EVENTS.USER_PRESENCE_CHANGE, handleUserPresence);

    return () => {
      socket.off(CONSTANTS.SOCKET_EVENTS.USER_PRESENCE_CHANGE, handleUserPresence);
    };
  }, [socket, activeConversation]);

  return (
    <div
      className={`sticky top-0 z-50 h-14 sm:h-16 border-b flex items-center justify-between px-3 sm:px-4 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/95 ${isMobile && "mt-[70px]"}`}
    >
      {isMobile && (
        <Button variant="ghost" size="icon" className="mr-1 h-8 w-8" onClick={onBackToList}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to conversations</span>
        </Button>
      )}
      <div
        className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1"
        onClick={() => {
          if (activeConversation.is_group) {
            setShowGroupInfo(true);
          }
        }}
      >
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
          <OnlineStatus members={members} activeConversation={activeConversation} />
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
  );
}
