"use client";

import React, { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Camera, X, Check, Users } from "lucide-react";
import { ChannelMembers, ChannelType } from "../utils/CommanTypes";
import { UploadFile } from "../utils/functions";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { showToast } from "../utils/toast";

type GroupInfoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeConversation: ChannelType;
  members: ChannelMembers[];
};

function GroupInfoDialog({
  open,
  onOpenChange,
  activeConversation,
  members,
}: GroupInfoDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>(activeConversation.channel_name);
  const [groupLogo, setGroupLogo] = useState<{ url: string; key: string }>({
    url: activeConversation.profile_picture,
    key: "",
  });

  const { fetchData: EditChannelDetails } = useApiFetch("");

  const handleSaveChanges = async () => {
    if (!groupName) {
      showToast({ message: "Please enter the group name", type: "error" });
      return;
    }
    await EditChannelDetails(
      CONSTANTS.API_ROUTES.EDIT_CHANNEL_DETAILS + `/${activeConversation.channel_id}`,
      {
        method: "PUT",
        data: {
          name: groupName,
          group_logo: groupLogo.key,
        },
      }
    ).then((res) => {
      if (res.success == 1) {
        setIsEditing(false);
        showToast({ message: "Channel Details Edited", type: "success" });
      }
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const filesToProcess = Array.from(files);
      const uploadResponse = await UploadFile(filesToProcess);
      const uploadedFiles = uploadResponse;

      setGroupLogo(uploadedFiles[0]);
    } catch (error) {
      console.error("Error handling file upload:", error);
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <div className="flex h-[500px] max-h-[80vh]">
          {/* Left side - Group info */}
          <div className="w-1/2 border-r p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Group Info</h2>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      setGroupLogo({ url: activeConversation.profile_picture, key: "" });
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveChanges}>
                    <Check className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <Avatar className="h-[150px] w-[150px]">
                  <AvatarImage src={groupLogo.url} alt={groupName} />
                  <AvatarFallback className="text-2xl">{groupName[0]}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-8 w-8 text-white" />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="group-name">Group Name</Label>
                    <Input
                      id="group-name"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="Enter group name"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-medium">{groupName}</h3>
                </>
              )}
            </div>

            <div className="space-y-4">
              <Button variant="destructive" className="w-full">
                Leave group
              </Button>
            </div>
          </div>

          {/* Right side - Members list */}
          <div className="w-1/2 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Members ({members.length})
              </h2>
            </div>

            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-2">
                {members.map((member) => (
                  <div
                    key={member.user_id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.profile_picture} alt={member.full_name} />
                          <AvatarFallback>{member.full_name[0]}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                            member.is_online
                              ? "bg-green-500"
                              : !member.is_online
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{member.full_name}</p>
                      </div>
                    </div>
                    {member.is_admin && (
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Admin
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GroupInfoDialog;
