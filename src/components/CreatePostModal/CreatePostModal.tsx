"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import LucideIcon from "@/utils/comman/LucideIcons";
import ImageComponent from "../Atoms/Image/Image";
import UploadFileAPI from "@/utils/comman/uploadFile";
import useApiFetch from "@/hooks/useAPIFetch";
import APIRoutes from "@/utils/constants/APIRoutes";
import ButtonComponent from "../Atoms/Button/Button";

type PostStateType = {
  caption: string;
  images: string[];
  allowComments: boolean;
  allowLikes: boolean;
  visibility: string;
  scheduled: boolean;
  scheduledDateTime: string;
};

export function DialogDemo() {
  const { fetchData: CREATE_POST, response: POST_RES, isLoading: POST_RES_LOADING } = useApiFetch("");

  const inputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [postState, setPostState] = useState<PostStateType>({
    caption: "Exploring the beautiful beaches of Hawaii! 🌴🌊",
    images: [
      "https://my-social-space.s3.ap-south-1.amazonaws.com/USER-1/1737096035648_155_media.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNURQL2QDZ%2F20250117%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250117T064035Z&X-Amz-Expires=36000&X-Amz-Signature=8a73d4d5323cf9242f89e3a8143972033c669822cbcf4e8438f7c48df78befcb&X-Amz-SignedHeaders=host&x-id=GetObject",
      "https://my-social-space.s3.ap-south-1.amazonaws.com/USER-1/1737095628698_967_IMG_5300.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNURQL2QDZ%2F20250117%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250117T063349Z&X-Amz-Expires=36000&X-Amz-Signature=0ca6b593d388db68eb599f3f9c288779bb3e6d922b3ec4b501bbb14d3ee6f040&X-Amz-SignedHeaders=host&x-id=GetObject",
      "https://my-social-space.s3.ap-south-1.amazonaws.com/USER-1/1737095628698_967_IMG_5300.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNURQL2QDZ%2F20250117%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250117T063349Z&X-Amz-Expires=36000&X-Amz-Signature=0ca6b593d388db68eb599f3f9c288779bb3e6d922b3ec4b501bbb14d3ee6f040&X-Amz-SignedHeaders=host&x-id=GetObject",
      "https://my-social-space.s3.ap-south-1.amazonaws.com/USER-1/1737095628698_967_IMG_5300.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNURQL2QDZ%2F20250117%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250117T063349Z&X-Amz-Expires=36000&X-Amz-Signature=0ca6b593d388db68eb599f3f9c288779bb3e6d922b3ec4b501bbb14d3ee6f040&X-Amz-SignedHeaders=host&x-id=GetObject",
      "https://my-social-space.s3.ap-south-1.amazonaws.com/USER-1/1737095628698_967_IMG_5300.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNURQL2QDZ%2F20250117%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250117T063349Z&X-Amz-Expires=36000&X-Amz-Signature=0ca6b593d388db68eb599f3f9c288779bb3e6d922b3ec4b501bbb14d3ee6f040&X-Amz-SignedHeaders=host&x-id=GetObject",
      "https://my-social-space.s3.ap-south-1.amazonaws.com/USER-1/1737095628698_967_IMG_5300.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNURQL2QDZ%2F20250117%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250117T063349Z&X-Amz-Expires=36000&X-Amz-Signature=0ca6b593d388db68eb599f3f9c288779bb3e6d922b3ec4b501bbb14d3ee6f040&X-Amz-SignedHeaders=host&x-id=GetObject",
    ],
    allowComments: true,
    allowLikes: true,
    visibility: "public",
    scheduled: true,
    scheduledDateTime: Date.now().toString(),
  });

  const { caption, images, allowComments, allowLikes, visibility, scheduled } = postState;

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // setImages([...images, ...Array.from(files).map((file) => URL.createObjectURL(file))]);

    // Upload the selected files
    const response = await UploadFileAPI(Array.from(files));

    if (response.data) {
      setPostState((prev) => ({ ...prev, images: [...prev.images, ...Array.from(response.data).map((file: any) => file.url)] }));
    }
  };

  const handleCaptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostState((prev) => ({ ...prev, caption: e.target.value }));
  };

  const handleToggleBtn = (key: string, value: boolean | string) => {
    setPostState((prev) => ({ ...prev, [key]: value }));
  };

  const handleRemoveImage = (index: number) => {
    setPostState((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async () => {
    await CREATE_POST(APIRoutes.CREATE_POST, {
      method: "POST",
      data: postState,
    });
  };

  const ImageGrid = ({ images, mode = "preview" }: { images: string[]; mode?: "preview" | "normal" }) => {
    if (images.length === 0) return null;

    if (images.length === 1) {
      return (
        <div className="relative group">
          <ImageComponent src={images[0]} alt="Upload 1" className="w-full rounded-lg border border-gray-200" />
          <button
            onClick={() => handleRemoveImage(0)}
            className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <LucideIcon name="X" className="h-4 w-4 text-white" />
          </button>
        </div>
      );
    }

    if (images.length === 2) {
      return (
        <div className={`grid ${mode === "preview" ? "grid-cols-2 gap-2" : "grid-cols-2"}`}>
          {images.map((img: string, index: number) => (
            <div key={index} className="relative group">
              <ImageComponent src={img} alt={`Upload ${index + 1}`} className="w-full rounded-lg border border-gray-200" />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <LucideIcon name="X" className="h-4 w-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      );
    }

    if (mode === "preview") {
      return (
        <div className="grid grid-cols-2 gap-2">
          <div className="relative group">
            <ImageComponent src={images[0]} alt="Upload 1" className="w-full h-full rounded-lg border border-gray-200 object-cover" />
          </div>

          <div className="relative group">
            <ImageComponent src={images[1]} alt="Upload 2" className="w-full h-full rounded-lg border border-gray-200 object-cover" />
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-semibold">+{images.length - 2}</span>
            </div>
          </div>
        </div>
      );
    }

    // Normal mode: Show images next to each other, wrap to the next line if needed
    return (
      <div className="flex flex-wrap gap-2">
        {images.map((img: string, index: number) => (
          <div key={index} className="relative group w-1/2 md:w-1/4 p-0">
            <ImageComponent src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover rounded-lg border border-gray-200" />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <LucideIcon name="X" className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const PreviewSection = () => (
    <div className="space-y-4">
      <Label>Preview</Label>
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div>
            <div className="font-medium text-sm">Username</div>
            <div className="text-xs text-gray-500">Public Post</div>
          </div>
        </div>
        <p className="text-sm mb-4">{caption}</p>
        <ImageGrid images={images} mode="preview" />
      </div>
    </div>
  );

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostState((prev) => ({ ...prev, scheduledDateTime: e.target.value }));
  };

  useEffect(() => {
    console.log(POST_RES);
  }, [POST_RES]);

  return (
    <Dialog open={isModalOpen}>
      <DialogTrigger asChild onClick={handleModal}>
        <Button variant="default">Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>Share your moments with your followers</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-6 py-4">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Caption Section */}
            <div className="space-y-4">
              <Label htmlFor="caption">Caption</Label>
              <Textarea id="caption" value={caption} onChange={handleCaptionChange} className="min-h-[100px] resize-none" />
              <Button className="w-full" variant="secondary">
                <LucideIcon name="Sparkles" className="mr-2 h-4 w-4" />
                Generate Caption
              </Button>
            </div>

            {/* Image Layout */}
            <div className="space-y-4">
              <Label>Photos</Label>
              <ImageGrid images={images} mode="normal" />
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  if (inputRef.current) inputRef.current.click();
                }}
              >
                <LucideIcon name="Plus" className="mr-2 h-4 w-4" />
                Add More Photos
              </Button>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Allow Comments</Label>
                <Switch checked={allowComments} onCheckedChange={(value: boolean) => handleToggleBtn("allowComments", value)} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Allow Likes</Label>
                <Switch checked={allowLikes} onCheckedChange={(value: boolean) => handleToggleBtn("allowLikes", value)} />
              </div>
              <div className="space-y-2">
                <Label>Post Visibility</Label>
                <Select value={visibility} onValueChange={(value: string) => handleToggleBtn("visibility", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="friends">Friends Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Scheduling */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox checked={scheduled} onCheckedChange={(value: boolean) => handleToggleBtn("scheduled", value)} id="schedule" />
                <Label htmlFor="schedule">Schedule Post</Label>
              </div>
              {scheduled && <Input type="datetime-local" onChange={handleTimeChange} value={postState.scheduledDateTime} />}
            </div>
            <DialogFooter>
              <ButtonComponent onClick={handleSubmit} isLoading={POST_RES_LOADING} buttonText="Share Post" type="submit" />
            </DialogFooter>
          </div>

          {/* Preview Section */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-4">
              <PreviewSection />
            </div>
          </div>
        </div>
        <input ref={inputRef} type="file" multiple hidden onChange={handleImageUpload} />
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
