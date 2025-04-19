"use client"

import { useState } from "react"
import { Search, Filter, Grid3X3, LayoutList } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCard } from "@/components/explore/user-card"
import { PostGrid } from "@/components/explore/post-grid"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for users
const users = [
  {
    id: "1",
    name: "Emma Johnson",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "UI/UX Designer | Creating beautiful interfaces",
    followers: 1240,
    verified: true,
  },
  {
    id: "2",
    name: "Noah Williams",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Frontend Developer | React & Next.js enthusiast",
    followers: 890,
    verified: false,
  },
  {
    id: "3",
    name: "Olivia Brown",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Digital Artist | Bringing imagination to life",
    followers: 2350,
    verified: true,
  },
  {
    id: "4",
    name: "Liam Davis",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Product Manager | Building the future",
    followers: 1560,
    verified: false,
  },
  {
    id: "5",
    name: "Ava Wilson",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Content Creator | Sharing my journey",
    followers: 3200,
    verified: true,
  },
  {
    id: "6",
    name: "William Moore",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Photographer | Capturing moments",
    followers: 1870,
    verified: false,
  },
]

// Mock data for posts
const posts = [
  { id: "1", user: "Emma Johnson", image: "/placeholder.svg?height=400&width=400", likes: 245, comments: 32 },
  { id: "2", user: "Noah Williams", image: "/placeholder.svg?height=400&width=400", likes: 187, comments: 24 },
  { id: "3", user: "Olivia Brown", image: "/placeholder.svg?height=400&width=400", likes: 312, comments: 41 },
  { id: "4", user: "Liam Davis", image: "/placeholder.svg?height=400&width=400", likes: 156, comments: 18 },
  { id: "5", user: "Ava Wilson", image: "/placeholder.svg?height=400&width=400", likes: 278, comments: 36 },
  { id: "6", user: "William Moore", image: "/placeholder.svg?height=400&width=400", likes: 203, comments: 27 },
  { id: "7", user: "Sophia Taylor", image: "/placeholder.svg?height=400&width=400", likes: 189, comments: 22 },
  { id: "8", user: "James Anderson", image: "/placeholder.svg?height=400&width=400", likes: 231, comments: 29 },
  { id: "9", user: "Isabella Thomas", image: "/placeholder.svg?height=400&width=400", likes: 267, comments: 34 },
]

export function ExploreView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users, posts, and hashtags..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="recent">Most Recent</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="popular">Most Popular</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="trending">Trending</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="discover" className="space-y-6">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.slice(0, 3).map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Popular Posts</h2>
          <PostGrid posts={posts} viewMode={viewMode} />
        </TabsContent>

        <TabsContent value="people" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Trending Posts</h2>
          <PostGrid posts={posts.sort((a, b) => b.likes - a.likes)} viewMode={viewMode} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
