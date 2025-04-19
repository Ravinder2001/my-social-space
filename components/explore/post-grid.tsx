"use client"
import { Heart, MessageCircle } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type PostGridProps = {
  posts: {
    id: string
    user: string
    image: string
    likes: number
    comments: number
  }[]
  viewMode: "grid" | "list"
}

export function PostGrid({ posts, viewMode }: PostGridProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="aspect-square relative group overflow-hidden rounded-md">
            <img
              src={post.image || "/placeholder.svg"}
              alt={`Post by ${post.user}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Heart className="h-5 w-5" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{post.user[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{post.user}</span>
            </div>
            <img
              src={post.image || "/placeholder.svg"}
              alt={`Post by ${post.user}`}
              className="w-full object-cover max-h-[400px]"
            />
          </CardContent>
          <CardFooter className="flex justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart className="h-5 w-5 text-brand-red" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-5 w-5 text-brand-blue" />
                <span>{post.comments}</span>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">2 hours ago</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
