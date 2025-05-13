import React from "react";
import { ChannelMembers, ChannelType } from "../utils/CommanTypes";
import { formatTimeAgo } from "../utils/functions";

interface OnlineStatusProps {
  members: ChannelMembers[];
  activeConversation: ChannelType;
}

export function OnlineStatus({ members, activeConversation }: OnlineStatusProps) {
  if (!members.length) return null;

  return (
    <p
      key={
        !activeConversation.is_group
          ? `${members[0].is_online}-${members[0].last_seen}`
          : members.filter((member) => member.is_online).length
      }
      className="truncate text-xs text-muted-foreground animate-slide-up"
    >
      {!activeConversation.is_group
        ? members[0].is_online
          ? "Online"
          : `last seen at ${formatTimeAgo(members[0].last_seen)}`
        : `${members.filter((member) => member.is_online).length} Online`}
    </p>
  );
}
