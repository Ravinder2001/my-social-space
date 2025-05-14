"use client";

import React, { Dispatch, SetStateAction } from "react";
import { ImageIcon, Video, Smile, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreatePostDialog } from "@/components/home/create-post-dialog";
import { EditPostType } from "../utils/CommanTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type Props = {
  selectedPost: null | EditPostType;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
};

export function CreatePostBox(props: Props) {
  const UserDetails = useSelector((state: RootState) => state.user);

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={UserDetails.profile_picture} alt={"User"} />
          <AvatarFallback>{UserDetails.name[0]}</AvatarFallback>
        </Avatar>
        <div
          onClick={() => props.setDialogOpen(true)}
          className="flex-1 bg-muted rounded-full px-4 py-2.5 text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors"
        >
          What&apos;s on your mind?
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-brand-pink hover:text-brand-pink hover:bg-brand-pink/10"
          onClick={() => props.setDialogOpen(true)}
        >
          <ImageIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Photo</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-brand-green hover:text-brand-green hover:bg-brand-green/10"
          onClick={() => props.setDialogOpen(true)}
        >
          <Video className="h-4 w-4" />
          <span className="hidden sm:inline">Video</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-brand-yellow hover:text-brand-yellow hover:bg-brand-yellow/10"
          onClick={() => props.setDialogOpen(true)}
        >
          <Smile className="h-4 w-4" />
          <span className="hidden sm:inline">Feeling</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-brand-purple hover:text-brand-purple hover:bg-brand-purple/10"
          onClick={() => props.setDialogOpen(true)}
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">AI Caption</span>
        </Button>
      </div>

      <CreatePostDialog
        open={props.dialogOpen}
        onOpenChange={props.setDialogOpen}
        editPost={props.selectedPost}
      />
    </div>
  );
}
