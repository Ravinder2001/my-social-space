"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, MessageCircle } from "lucide-react"

type ProfileSavedProps = {
  posts: {
    id: string
    image: string
    likes: number
    comments: number
  }[]
}

export function ProfileSaved({ posts }: ProfileSavedProps) {
  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={post.image || "/placeholder.svg"}
                alt="Saved post"
                className="w-full object-cover max-h-[300px]"
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
              <span className="text-sm text-muted-foreground">Saved 2 days ago</span>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 mx-auto mb-4 opacity-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          <h3 className="text-lg font-medium">No saved posts</h3>
          <p>You haven't saved any posts yet</p>
        </div>
      )}
    </div>
  )
}
