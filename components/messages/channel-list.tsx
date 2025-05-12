import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Users, MessageSquare, Search } from "lucide-react";
import React from "react";
import { ChannelType } from "../utils/CommanTypes";
import moment from "moment";

type Props = {
  channelList: ChannelType[];
  activeConversation: ChannelType | null;
  onSelectConversation: (c: ChannelType) => void;
  onNewConversation: () => void;
  onCreateGroup: () => void;
  isMobile: boolean;
  show: boolean;
};

function ChannelList({ channelList, activeConversation, onSelectConversation, onNewConversation, onCreateGroup, isMobile, show }: Props) {
  return (
    <div className={`w-full md:w-80 border-r bg-card flex flex-col ${isMobile && !show ? "hidden" : "flex"}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Messages</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Plus className="h-4 w-4" />
                <span className="sr-only">New conversation</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onNewConversation}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Start new conversation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onCreateGroup}>
                <Users className="h-4 w-4 mr-2" />
                Create group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search conversations..." className="pl-9 bg-muted/40" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {channelList.map((conversation) => (
          <div
            key={conversation.channel_id}
            className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
              activeConversation?.channel_id === conversation.channel_id ? "bg-muted" : ""
            }`}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={conversation.profile_picture} alt={conversation.channel_name} />
                  <AvatarFallback>{conversation.channel_name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{conversation.channel_name}</p>
                  <p className="text-xs text-muted-foreground">{moment(conversation.sent_at).format("HH:MM")}</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.last_message}</p>
              </div>
              {/* {conversation.unread > 0 && <Badge className="ml-auto bg-brand-blue">{conversation.unread}</Badge>} */}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default ChannelList;
