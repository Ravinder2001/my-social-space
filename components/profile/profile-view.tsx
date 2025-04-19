"use client"

import { useState } from "react"
import { Camera, Settings, Edit, MapPin, Calendar, LinkIcon, Grid, BookOpen, Users, Bookmark } from "lucide-react"
import { useApp } from "@/components/providers/app-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog"
import { ProfilePosts } from "@/components/profile/profile-posts"
import { ProfilePhotos } from "@/components/profile/profile-photos"
import { ProfileFriends } from "@/components/profile/profile-friends"
import { ProfileSaved } from "@/components/profile/profile-saved"

// Mock data for posts
const posts = [
  { id: "1", image: "/placeholder.svg?height=300&width=300", likes: 245, comments: 32 },
  { id: "2", image: "/placeholder.svg?height=300&width=300", likes: 187, comments: 24 },
  { id: "3", image: "/placeholder.svg?height=300&width=300", likes: 312, comments: 41 },
  { id: "4", image: "/placeholder.svg?height=300&width=300", likes: 156, comments: 18 },
  { id: "5", image: "/placeholder.svg?height=300&width=300", likes: 278, comments: 36 },
  { id: "6", image: "/placeholder.svg?height=300&width=300", likes: 203, comments: 27 },
  { id: "7", image: "/placeholder.svg?height=300&width=300", likes: 189, comments: 22 },
  { id: "8", image: "/placeholder.svg?height=300&width=300", likes: 231, comments: 29 },
  { id: "9", image: "/placeholder.svg?height=300&width=300", likes: 267, comments: 34 },
]

// Mock data for friends
const friends = [
  { id: "1", name: "Emma Johnson", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 12 },
  { id: "2", name: "Noah Williams", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 8 },
  { id: "3", name: "Olivia Brown", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 5 },
  { id: "4", name: "Liam Davis", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 3 },
  { id: "5", name: "Ava Wilson", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 7 },
  { id: "6", name: "William Moore", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 4 },
  { id: "7", name: "Sophia Taylor", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 9 },
  { id: "8", name: "James Anderson", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 6 },
]

export function ProfileView() {
  const { user } = useApp()
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  // Mock profile data
  const profile = {
    name: user?.name || "Demo User",
    username: "@demouser",
    bio: "Digital creator | UI/UX Designer | Photographer\nSharing my journey and creative process",
    location: "San Francisco, CA",
    website: "https://example.com",
    joinDate: "Joined January 2023",
    followers: 1240,
    following: 365,
    posts: posts.length,
    verified: true,
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover photo */}
      <div className="relative h-48 md:h-64 rounded-xl bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue overflow-hidden">
        <Button variant="secondary" size="icon" className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm">
          <Camera className="h-4 w-4" />
          <span className="sr-only">Change cover photo</span>
        </Button>
      </div>

      {/* Profile info */}
      <div className="relative px-4 sm:px-6 -mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={user?.avatar || "/placeholder.svg?height=128&width=128"} alt={profile.name} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                {profile.verified && (
                  <Badge variant="outline" className="h-5 rounded-full bg-brand-blue text-white px-1.5">
                    ✓
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{profile.username}</p>
            </div>
          </div>

          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setEditDialogOpen(true)}>
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <p className="whitespace-pre-line">{profile.bio}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <a
                  href={profile.website}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            {profile.joinDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{profile.joinDate}</span>
              </div>
            )}
          </div>

          <div className="flex gap-6 pt-2">
            <div className="text-center">
              <p className="font-semibold">{profile.posts}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{profile.followers.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{profile.following.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Following</p>
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
              <TabsTrigger value="friends" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Friends</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">Saved</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <ProfilePosts posts={posts} />
            </TabsContent>

            <TabsContent value="photos">
              <ProfilePhotos photos={posts} />
            </TabsContent>

            <TabsContent value="friends">
              <ProfileFriends friends={friends} />
            </TabsContent>

            <TabsContent value="saved">
              <ProfileSaved posts={posts.slice(0, 5)} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <EditProfileDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} profile={profile} />
    </div>
  )
}
