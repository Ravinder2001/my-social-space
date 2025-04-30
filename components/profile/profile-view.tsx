"use client";

import { useEffect, useState } from "react";
import { Edit, MapPin, Calendar, LinkIcon, Grid, BookOpen, Users, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { ProfilePosts } from "@/components/profile/profile-posts";
import { ProfilePhotos } from "@/components/profile/profile-photos";
import { ProfileFriends } from "@/components/profile/profile-friends";
import { ProfileSaved } from "@/components/profile/profile-saved";
import { FriendsType, PostType, ProfileDetailsType, ProfilePhotosType, ProfileSavedPostType } from "../utils/CommanTypes";
import CONSTANTS from "../utils/constants";
import useApiFetch from "@/hooks/use-api-fetch";
import moment from "moment";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { showToast } from "../utils/toast";

export function ProfileView() {
  const searchParams = useSearchParams();
  const isAnotherUser = searchParams.get("user");

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [savedPosts, setSavedPosts] = useState<ProfileSavedPostType[]>([]);
  const [friendsList, setFriendsList] = useState<FriendsType[]>([]);
  const [photos, setPhotos] = useState<ProfilePhotosType[]>([]);
  const [profileDetails, setProfileDetails] = useState<ProfileDetailsType>({
    username: "",
    full_name: "",
    profile_picture: "",
    cover_picture: "",
    bio: "",
    city: "",
    website: "",
    created_at: "",
  });

  const { fetchData: fetchPosts } = useApiFetch(CONSTANTS.API_ROUTES.PROFILE_POSTS + `${isAnotherUser ? `?user_id=${isAnotherUser}` : ""}`);
  const { fetchData: fetchPhotos } = useApiFetch(CONSTANTS.API_ROUTES.PROFILE_PHOTOS + `${isAnotherUser ? `?user_id=${isAnotherUser}` : ""}`);
  const { fetchData: fetchSaved } = useApiFetch(CONSTANTS.API_ROUTES.PROFILE_SAVED);
  const { fetchData: fetchFriendsList } = useApiFetch(CONSTANTS.API_ROUTES.GET_FRIENDS_LIST);
  const { fetchData: fetchProfileDetails } = useApiFetch(
    CONSTANTS.API_ROUTES.GET_PROFILE_DETAILS + `${isAnotherUser ? `?user_id=${isAnotherUser}` : ""}`
  );
  const { fetchData: removeFriend } = useApiFetch("");

  const handleRemoveFriend = async (friendship_id: number) => {
    await removeFriend(CONSTANTS.API_ROUTES.REMOVE_FRIEND + `/${friendship_id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.success == 1) {
        showToast({ message: "Friend Removed Successfully", type: "success" });
        setFriendsList((prev) => prev.filter((req) => req.friendship_id !== friendship_id));
      }
    });
  };

  useEffect(() => {
    fetchProfileDetails().then((res: any) => {
      if (res.success == 1) {
        setProfileDetails(res?.data);
      }
    });
    fetchPosts().then((res: any) => {
      if (res.success == 1) {
        setPosts(res?.data);
      }
    });
    fetchPhotos().then((res: any) => {
      if (res.success == 1) {
        setPhotos(res?.data);
      }
    });
    !isAnotherUser &&
      fetchSaved().then((res: any) => {
        if (res.success == 1) {
          setSavedPosts(res?.data);
        }
      });
    !isAnotherUser &&
      fetchFriendsList().then((res: any) => {
        if (res.success == 1) {
          setFriendsList(res?.data);
        }
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover photo */}
      <div className="relative h-48 md:h-64 rounded-xl bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue overflow-hidden">
        <Image src={profileDetails.cover_picture} alt="" width={100} height={100} className="w-[100%] h-[100%]" />
        {/* <Button variant="secondary" size="icon" className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm">
          <Camera className="h-4 w-4" />
          <span className="sr-only">Change cover photo</span>
        </Button> */}
      </div>

      {/* Profile info */}
      <div className="relative px-4 sm:px-6 -mt-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={profileDetails.profile_picture} alt={profileDetails.full_name} />
              <AvatarFallback>{profileDetails.full_name[0]}</AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <h1 className="text-2xl font-bold">{profileDetails.full_name}</h1>
              </div>
              <p className="text-muted-foreground">@{profileDetails.username}</p>
            </div>
          </div>
          {!isAnotherUser && (
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => setEditDialogOpen(true)}>
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <p className="whitespace-pre-line">{profileDetails.bio}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {profileDetails.city && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{profileDetails.city}</span>
              </div>
            )}
            {profileDetails.website && (
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <a href={profileDetails.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  {profileDetails.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            {profileDetails.created_at && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {moment(profileDetails.created_at).format("MMMM YYYY")}</span>
              </div>
            )}
          </div>

          <div className="flex gap-6 pt-2">
            <div className="text-center">
              <p className="font-semibold">{profileDetails.post_count}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{profileDetails.friends_count}</p>
              <p className="text-xs text-muted-foreground">Friends</p>
            </div>
          </div>
        </div>

        {/* Profile tabs */}
        <div className="mt-8">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Posts</span>
              </TabsTrigger>
              <TabsTrigger value="photos" className="flex items-center gap-2">
                <Grid className="h-4 w-4" />
                <span className="hidden sm:inline">Photos</span>
              </TabsTrigger>
              {!isAnotherUser && (
                <TabsTrigger value="friends" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Friends</span>
                </TabsTrigger>
              )}

              {!isAnotherUser && (
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Saved</span>
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="posts">
              <ProfilePosts posts={posts} />
            </TabsContent>

            <TabsContent value="photos">
              <ProfilePhotos photos={photos} />
            </TabsContent>

            <TabsContent value="friends">
              <ProfileFriends friends={friendsList} onRemoveClick={handleRemoveFriend} />
            </TabsContent>

            <TabsContent value="saved">
              <ProfileSaved posts={savedPosts} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {editDialogOpen && (
        <EditProfileDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} profile={profileDetails} setProfileDetails={setProfileDetails} />
      )}
    </div>
  );
}
