"use client";

import ChatSection from "@/components/ChatSection/ChatSection";
import UserList from "@/components/UserList/UserList";
import { useState } from "react";

export default function ChatPage() {
  const [selectedUserId, setSelectedUserId] = useState("1");

  return (
    <div className="flex h-screen">
      <UserList onSelectUser={setSelectedUserId} selectedUserId={selectedUserId} />
      <div className="flex-1">
        <ChatSection selectedUserId={selectedUserId} />
      </div>
    </div>
  );
}
