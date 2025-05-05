"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, X, Users, ChevronLeft } from "lucide-react";
import CONSTANTS from "../utils/constants";
import useApiFetch from "@/hooks/use-api-fetch";

type FriendType = {
  user_id: number;
  name: string;
  profile_picture: string;
};
  
type CreateGroupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGroup: (userIds: number[], groupName: string) => void;
};

export function CreateGroupDialog({ open, onOpenChange, onCreateGroup }: CreateGroupDialogProps) {
  const [step, setStep] = useState<"select-users" | "name-group">("select-users");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<FriendType[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<FriendType[]>([]);
  const [groupName, setGroupName] = useState("");

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

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setStep("select-users");
      setSearchQuery("");
      setSelectedUsers([]);
      setGroupName("");
    }
  }, [open]);

  const toggleUserSelection = (user: FriendType[][0]) => {
    if (selectedUsers.some((selected) => selected.user_id === user.user_id)) {
      setSelectedUsers(selectedUsers.filter((selected) => selected.user_id !== user.user_id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeSelectedUser = (userId: number) => {
    setSelectedUsers(selectedUsers.filter((user) => user.user_id !== userId));
  };

  const handleNext = () => {
    if (selectedUsers.length >= 2) {
      setStep("name-group");
    }
  };

  const handleBack = () => {
    setStep("select-users");
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedUsers.length >= 2) {
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {step === "name-group" && (
              <Button variant="ghost" size="icon" className="mr-2 -ml-2" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            {step === "select-users" ? "Create Group" : "Name Your Group"}
          </DialogTitle>
        </DialogHeader>

        {step === "select-users" ? (
          <>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search friends..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>

            {selectedUsers.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Selected ({selectedUsers.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map((user) => (
                    <Badge key={user.user_id} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                      <span className="text-xs">{user.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full hover:bg-muted-foreground/20"
                        onClick={() => removeSelectedUser(user.user_id)}
                      >
                        <X className="h-2 w-2" />
                        <span className="sr-only">Remove {user.name}</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <ScrollArea className="h-[250px] pr-4">
              {filteredUsers.length > 0 ? (
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.user_id}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => toggleUserSelection(user)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.profile_picture} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <p className="text-muted-foreground mb-2">No users found</p>
                  <p className="text-sm text-muted-foreground">Try a different search term</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <p className="text-muted-foreground">All users have been selected</p>
                </div>
              )}
            </ScrollArea>

            <DialogFooter className="mt-4">
              <Button onClick={handleNext} disabled={selectedUsers.length < 2} className="w-full">
                Next
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="space-y-4 py-2">
              <div className="flex justify-center mb-4">
                <div className="relative h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Group Name</p>
                <Input placeholder="Enter group name..." value={groupName} onChange={(e) => setGroupName(e.target.value)} />
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Group Members ({selectedUsers.length})</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map((user) => (
                    <Badge key={user.user_id} variant="secondary" className="pl-2 py-1">
                      {user.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button onClick={handleCreateGroup} disabled={!groupName.trim()} className="w-full">
                Create Group
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
