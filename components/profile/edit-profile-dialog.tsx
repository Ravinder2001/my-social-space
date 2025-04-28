"use client";

import type React from "react";

import { Dispatch, SetStateAction, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileDetailsType, UploadedFileType } from "../utils/CommanTypes";
import { UploadFile } from "../utils/functions";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { showToast } from "../utils/toast";
import { useDispatch } from "react-redux";
import { setUserProfilePicture } from "@/lib/Slices/UserSlice";

export function EditProfileDialog({
  open,
  onOpenChange,
  profile,
  setProfileDetails,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: ProfileDetailsType;
  setProfileDetails: Dispatch<SetStateAction<ProfileDetailsType>>;
}) {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.full_name,
    username: profile.username,
    bio: profile.bio,
    location: profile.city,
    website: profile.website,
  });
  const [avatarPreview, setAvatarPreview] = useState<UploadedFileType>({
    url: profile.profile_picture,
    key: profile.profile_picture,
  });
  const [coverPreview, setCoverPreview] = useState<UploadedFileType>({
    url: profile.cover_picture,
    key: profile.cover_picture,
  });

  const { fetchData: updateProfileDetails } = useApiFetch("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadResponse = await UploadFile([file]);
      const uploadedFiles = uploadResponse; // Array of {key, URL}

      // Update state
      setAvatarPreview({
        url: uploadedFiles[0].url,
        key: uploadedFiles[0].key,
      });
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadResponse = await UploadFile([file]);
      const uploadedFiles = uploadResponse; // Array of {key, URL}

      // Update state
      setCoverPreview({
        url: uploadedFiles[0].url,
        key: uploadedFiles[0].key,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedFields: Record<string, any> = {};

    if (formData.name !== profile.full_name) {
      updatedFields.full_name = formData.name;
    }
    if (formData.username !== profile.username) {
      updatedFields.username = formData.username;
    }
    if (formData.bio !== profile.bio) {
      updatedFields.bio = formData.bio;
    }
    if (formData.location !== profile.city) {
      updatedFields.city = formData.location;
    }
    if (formData.website !== profile.website) {
      updatedFields.website = formData.website;
    }
    if (avatarPreview.key !== profile.profile_picture) {
      updatedFields.profile_picture = avatarPreview.key;
    }
    if (coverPreview.key !== profile.cover_picture) {
      updatedFields.cover_picture = coverPreview.key;
    }

    if (Object.keys(updatedFields).length > 0) {
      try {
        const res: any = await updateProfileDetails(CONSTANTS.API_ROUTES.EDIT_PROFILE_DETAILS, {
          method: "PUT",
          data: updatedFields,
        });

        showToast({
          message: res.message,
          type: "success",
        });

        // ✅ Now update profileDetails properly
        setProfileDetails((prev) => ({
          ...prev,
          ...(updatedFields.full_name && { full_name: updatedFields.full_name }),
          ...(updatedFields.username && { username: updatedFields.username }),
          ...(updatedFields.bio && { bio: updatedFields.bio }),
          ...(updatedFields.city && { city: updatedFields.city }),
          ...(updatedFields.website && { website: updatedFields.website }),
          ...(updatedFields.profile_picture && { profile_picture: avatarPreview.url }), // URL not key
          ...(updatedFields.cover_picture && { cover_picture: coverPreview.url }), // URL not key
        }));

        if (updatedFields.profile_picture) {
          dispatch(setUserProfilePicture(avatarPreview.url));
        }

        onOpenChange(false);
      } catch (error) {
        console.error("Failed to update profile", error);
        showToast({
          message: "Something went wrong while updating profile",
          type: "error",
        });
      }
    } else {
      showToast({
        message: "No value changed",
        type: "info",
      });
      onOpenChange(false);
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover photo */}
          <div className="relative h-32 rounded-lg bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue overflow-hidden">
            {coverPreview && <img src={coverPreview.url || "/placeholder.svg"} alt="Cover preview" className="w-full h-full object-cover" />}
            <div className="absolute inset-0 flex items-center justify-center">
              <label
                htmlFor="cover-upload"
                className="flex items-center justify-center gap-2 bg-black/50 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-black/60 transition-colors"
              >
                <Camera className="h-4 w-4" />
                <span>Change Cover</span>
              </label>
              <input id="cover-upload" type="file" accept="image/*" className="sr-only" onChange={handleCoverChange} disabled={isSubmitting} />
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center -mt-10">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarImage src={avatarPreview.url || "/placeholder.svg?height=80&width=80"} alt="Avatar preview" />
                <AvatarFallback>{formData.name[0]}</AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
              >
                <Camera className="h-6 w-6" />
                <span className="sr-only">Change avatar</span>
              </label>
              <input id="avatar-upload" type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} disabled={isSubmitting} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" value={formData.username} onChange={handleChange} disabled={isSubmitting} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={3} disabled={isSubmitting} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" value={formData.website} onChange={handleChange} disabled={isSubmitting} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
