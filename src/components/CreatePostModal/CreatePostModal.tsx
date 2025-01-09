"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import LucideIcon from "@/utils/comman/LucideIcons";

export function DialogDemo() {
  const [caption, setCaption] = useState("Exploring the beautiful beaches of Hawaii! 🌴🌊");
  const [images] = useState([
    "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=600",
  ]);
  const [allowComments, setAllowComments] = useState(true);
  const [allowLikes, setAllowLikes] = useState(true);
  const [visibility, setVisibility] = useState("public");
  const [scheduled, setScheduled] = useState(true);

  const ImageGrid = ({ images }) => {
    if (images.length === 0) return null;

    if (images.length === 1) {
      return (
        <div className="relative group">
          <img src={images[0]} alt="Upload 1" className="w-full rounded-lg border border-gray-200" />
          <button className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <LucideIcon name="X" className="h-4 w-4 text-white" />
          </button>
        </div>
      );
    }

    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {images.map((img, index) => (
            <div key={index} className="relative group">
              <img src={img} alt={`Upload ${index + 1}`} className="w-full rounded-lg border border-gray-200" />
              <button className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <LucideIcon name="X" className="h-4 w-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2">
        <div className="relative group">
          <img src={images[0]} alt="Upload 1" className="w-full h-full rounded-lg border border-gray-200 object-cover" />
          <button className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <LucideIcon name="X" className="h-4 w-4 text-white" />
          </button>
        </div>

        <div className="relative group">
          <img src={images[1]} alt="Upload 2" className="w-full h-full rounded-lg border border-gray-200 object-cover" />
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-semibold">+{images.length - 2}</span>
          </div>
          <button className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <LucideIcon name="X" className="h-4 w-4 text-white" />
          </button>
        </div>
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
        <ImageGrid images={images} />
      </div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
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
              <Textarea id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="min-h-[100px] resize-none" />
              <Button className="w-full" variant="secondary">
                <LucideIcon name="Sparkles" className="mr-2 h-4 w-4" />
                Generate Caption
              </Button>
            </div>

            {/* Image Layout */}
            <div className="space-y-4">
              <Label>Photos</Label>
              <ImageGrid images={images} />
              <Button className="w-full" variant="outline">
                <LucideIcon name="Plus" className="mr-2 h-4 w-4" />
                Add More Photos
              </Button>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Allow Comments</Label>
                <Switch checked={allowComments} onCheckedChange={setAllowComments} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Allow Likes</Label>
                <Switch checked={allowLikes} onCheckedChange={setAllowLikes} />
              </div>
              <div className="space-y-2">
                <Label>Post Visibility</Label>
                <Select value={visibility} onValueChange={setVisibility}>
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
                <Checkbox checked={scheduled} onCheckedChange={setScheduled} id="schedule" />
                <Label htmlFor="schedule">Schedule Post</Label>
              </div>
              {scheduled && <Input type="datetime-local" defaultValue="2025-01-08T14:09" />}
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Share Post
              </Button>
            </DialogFooter>
          </div>

          {/* Preview Section */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-4">
              <PreviewSection />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
