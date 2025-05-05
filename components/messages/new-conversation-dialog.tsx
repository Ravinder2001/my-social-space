"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";

type FriendType = {
  user_id: number;
  name: string;
  profile_picture: string;
};

type NewConversationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NewConversationDialog({ open, onOpenChange }: NewConversationDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<FriendType[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const { fetchData: FetchFriends } = useApiFetch("");

  const fetchUsers = (query: string) => {
    FetchFriends(CONSTANTS.API_ROUTES.SEARCH_FRIENDS + `?searchQuery=${query}`).then((res: any) => {
      if (res.success == 1) {
        setFilteredUsers(res.data);
      }
    });
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchUsers("");
  }, []);

  // Debounced fetch when query changes
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (searchQuery.length === 0 || searchQuery.length >= 3) {
        fetchUsers(searchQuery);
      }
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchQuery]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Conversation</DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search friends..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[300px] pr-4">
          {filteredUsers.length > 0 ? (
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <div key={user.user_id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer transition-colors">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={user.profile_picture} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <p className="text-muted-foreground mb-2">No users found</p>
              <p className="text-sm text-muted-foreground">Try a different search term</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
