"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewConversationDialog } from "./new-conversation-dialog";
import { CreateGroupDialog } from "./create-group-dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import ChannelList from "./channel-list";
import MessageRoom from "./message-room";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { ChannelType } from "../utils/CommanTypes";

export function MessagingView() {
  const [channelList, setChannelList] = useState<ChannelType[]>([]);
  const [activeConversation, setActiveConversation] = useState<ChannelType | null>(null);
  const [newConversationOpen, setNewConversationOpen] = useState(false);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const { fetchData: FetchChannels } = useApiFetch(CONSTANTS.API_ROUTES.GET_CHANNELS_LIST);

  // Handle mobile view conversation selection
  useEffect(() => {
    if (isMobile && activeConversation) {
      setShowConversationList(false);
    } else {
      setShowConversationList(true);
    }
  }, [activeConversation, isMobile]);

  const handleSelectConversation = (conversation: ChannelType) => {
    setActiveConversation(conversation);
    if (isMobile) {
      setShowConversationList(false);
    }
  };

  const handleBackToList = () => {
    setShowConversationList(true);
  };

  // const handleNewConversation = (userId: string, userName: string) => {
  //   console.log(`Starting new conversation with ${userName} (${userId})`);
  //   // In a real app, you would create a new conversation and navigate to it
  //   setNewConversationOpen(false);
  // };

  const handleCreateGroup = (userIds: number[], groupName: string) => {
    console.log(`Creating group "${groupName}" with ${userIds.length} members`);
    // In a real app, you would create a new group conversation and navigate to it
    setCreateGroupOpen(false);
  };

  // Render empty state when no conversation is selected
  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
        <MessageSquare className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
      <p className="text-muted-foreground max-w-sm">
        Select a conversation from the list to start messaging or create a new conversation.
      </p>
      <Button className="mt-6" onClick={() => setNewConversationOpen(true)}>
        <MessageSquare className="mr-2 h-4 w-4" />
        Start a new conversation
      </Button>
    </div>
  );

  useEffect(() => {
    FetchChannels().then((res: any) => {
      if (res.success == 1) {
        setChannelList(res?.data);
      }
    });
  }, []);

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Conversations sidebar */}
        <ChannelList
          channelList={channelList}
          activeConversation={activeConversation}
          onSelectConversation={handleSelectConversation}
          onNewConversation={() => setNewConversationOpen(true)}
          onCreateGroup={() => setCreateGroupOpen(true)}
          isMobile={isMobile}
          show={showConversationList}
        />

        {/* Chat area or empty state */}
        {activeConversation ? (
          <MessageRoom
            activeConversation={activeConversation}
            isMobile={isMobile}
            showConversationList={showConversationList}
            onBackToList={handleBackToList}
          />
        ) : (
          renderEmptyState()
        )}
      </div>

      {/* New conversation dialog */}
      {newConversationOpen && (
        <NewConversationDialog
          open={newConversationOpen}
          onOpenChange={setNewConversationOpen}
          // onSelect={handleNewConversation}
        />
      )}

      {/* Create group dialog */}
      {createGroupOpen && (
        <CreateGroupDialog
          open={createGroupOpen}
          onOpenChange={setCreateGroupOpen}
          onCreateGroup={handleCreateGroup}
        />
      )}
    </>
  );
}
