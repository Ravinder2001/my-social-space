"use client"
import { StoriesSection } from "@/components/home/stories-section"
import { CreatePostBox } from "@/components/home/create-post-box"
import { PostFeed } from "@/components/home/post-feed"
import { TrendingTopics } from "@/components/home/trending-topics"
import { SuggestedUsers } from "@/components/home/suggested-users"
import { useSession } from "next-auth/react"

export function HomeFeed() {
  const { data: session } = useSession();
  console.log("🚀 session:", session)
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StoriesSection />
          <CreatePostBox />
          <PostFeed />
        </div>
        <div className="hidden lg:block space-y-6">
          <TrendingTopics />
          <SuggestedUsers />
        </div>
      </div>
    </div>
  )
}
