"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, ImageIcon, Smile, Globe, Users, Lock, Sparkles, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UploadFile } from "../utils/functions";
import axiosInstance from "../utils/axiosInstance";
import { showToast } from "../utils/toast";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { EditPostType, VisibilityType } from "../utils/CommanTypes";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const visibilityOptions = {
  PUBLIC: { label: "Public", icon: Globe },
  FRIENDS: { label: "Friends", icon: Users },
  PRIVATE: { label: "Only me", icon: Lock },
};

export function CreatePostDialog({
  open,
  onOpenChange,
  editPost,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editPost?: EditPostType | null;
}) {
  const UserDetails = useSelector((state: RootState) => state.user);

  const [caption, setCaption] = useState(editPost?.caption || "");
  const [visibility, setVisibility] = useState<VisibilityType>(editPost?.visibility || "PUBLIC");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<{ key: string; url: string }[]>(editPost?.images || []);
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { fetchData: UploadPost, isLoading: UploadPostLoading } = useApiFetch("");

  useEffect(() => {
    if (editPost) {
      setCaption(editPost.caption);
      setVisibility(editPost.visibility);
      setUploadedMedia(editPost.images);
    } else {
      setCaption("");
      setVisibility("PUBLIC");
      setMediaFiles([]);
      setUploadedMedia([]);
    }
  }, [editPost]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      // Limit to 5 files
      const totalFiles = mediaFiles.length + files.length;
      if (totalFiles > 5) {
        showToast({
          message: "Only 5 images are allowed.",
          type: "error",
        });
        return;
      }

      const filesToProcess = Array.from(files).slice(0, 5 - mediaFiles.length);

      // Upload files to server
      const uploadResponse = await UploadFile(filesToProcess);
      const uploadedFiles = uploadResponse; // Array of {key, URL}

      // Update state
      setMediaFiles((prev) => [...prev, ...filesToProcess]);
      setUploadedMedia((prev) => [...prev, ...uploadedFiles]);

      return uploadedFiles; // Returns array of {key, URL} objects
    } catch (error) {
      console.error("Error handling file upload:", error);
      throw error;
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...mediaFiles];
    const newUploadedMedia = [...uploadedMedia];
    newFiles.splice(index, 1);
    newUploadedMedia.splice(index, 1);
    setMediaFiles(newFiles);
    setUploadedMedia(newUploadedMedia);
  };

  const handleCreatePost = async () => {
    if (!caption.trim() && uploadedMedia.length === 0) {
      return;
    }
    const keys = uploadedMedia.map((media) => media.key);

    await UploadPost(CONSTANTS.API_ROUTES.CREATE_POST, {
      method: "POST",
      data: {
        caption: caption,
        visibility: visibility,
        images: keys,
      },
    }).finally(() => {
      showToast({
        message: "Post uploaded successfully!",
        type: "success",
      });
      onOpenChange(false);
    });
  };

  const handleEditPost = async () => {
    if (!editPost || (!caption.trim() && uploadedMedia.length === 0)) {
      return;
    }

    await UploadPost(CONSTANTS.API_ROUTES.EDIT_POST + `/${editPost.id}`, {
      method: "PUT",
      data: {
        caption: caption,
        visibility: visibility,
      },
    }).finally(() => {
      showToast({
        message: "Post updated successfully!",
        type: "success",
      });
      onOpenChange(false);
    });
  };

  const handleSubmit = () => {
    if (editPost) {
      handleEditPost();
    } else {
      handleCreatePost();
    }
  };

  const generateAICaption = async () => {
    if (!aiPrompt.trim()) {
      return;
    }

    setIsGeneratingCaption(true);

    try {
      const response = await axiosInstance.post(CONSTANTS.API_ROUTES.GENERATE_CAPTION, {
        prompt: aiPrompt,
      });

      let generatedCaption = response.data.data;
      if (typeof generatedCaption === "string") {
        generatedCaption = generatedCaption.replace(/^"|"$/g, "");
      }
      const words = generatedCaption.split(" ");
      let currentCaption = "";
      let wordIndex = 0;

      setCaption("");

      const typeWord = () => {
        if (wordIndex < words.length) {
          currentCaption += (wordIndex > 0 ? " " : "") + words[wordIndex];
          setCaption(currentCaption);
          wordIndex++;
          setTimeout(typeWord, 100);
        } else {
          setAiPrompt("");
          setShowAiPrompt(false);
          setIsGeneratingCaption(false);
        }
      };

      typeWord();
    } catch (error) {
      console.error("Error generating AI caption:", error);
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">{editPost ? "Edit Post" : "Create Post"}</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3 mt-2">
          <Avatar>
            <AvatarImage src={UserDetails.profile_picture} alt={"User"} />
            <AvatarFallback>{UserDetails.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{UserDetails.name}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 gap-1 px-2">
                  {React.createElement(visibilityOptions[visibility].icon, { className: "h-3.5 w-3.5" })}
                  <span>{visibilityOptions[visibility].label}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {(Object.entries(visibilityOptions) as [VisibilityType, { label: string; icon: any }][]).map(([key, { label, icon }]) => (
                  <DropdownMenuItem key={key} onClick={() => setVisibility(key as VisibilityType)} className="gap-2">
                    {React.createElement(icon, { className: "h-4 w-4" })}
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">What's on your mind?</p>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowAiPrompt(!showAiPrompt)}>
              <Sparkles className="h-4 w-4 text-brand-purple" />
              Ask AI
            </Button>
          </div>

          {showAiPrompt && (
            <div className="space-y-2 p-3 bg-muted/30 rounded-md">
              <p className="text-sm text-muted-foreground">Let AI help you craft the perfect caption</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a prompt for the AI..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  disabled={isGeneratingCaption}
                />
                <Button onClick={generateAICaption} disabled={isGeneratingCaption || !aiPrompt.trim()}>
                  {isGeneratingCaption ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <Textarea
            placeholder="What's on your mind?"
            className="min-h-[120px] resize-none"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {uploadedMedia.length > 0 && (
            <div className={`grid gap-2 ${uploadedMedia.length === 1 ? "grid-cols-1" : uploadedMedia.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
              {uploadedMedia.map((media, index) => (
                <div key={index} className="relative group aspect-square rounded-md overflow-hidden">
                  <img src={media.url || "/placeholder.svg"} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                  {!editPost && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {!editPost && (
            <>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => fileInputRef.current?.click()}>
                <ImageIcon className="h-4 w-4 text-brand-pink" />
                <span>Add Photos</span>
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />

              <Button variant="outline" size="sm" className="gap-2">
                <Smile className="h-4 w-4 text-brand-yellow" />
                <span>Feeling/Activity</span>
              </Button>
            </>
          )}
        </div>  

        <DialogFooter>
          <Button className="w-full" onClick={handleSubmit} disabled={UploadPostLoading || (caption.trim() === "" && uploadedMedia.length === 0)}>
            {UploadPostLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {editPost ? "Updating..." : "Posting..."}
              </>
            ) : editPost ? (
              "Update"
            ) : (
              "Post"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
