"use client"

import { PostCard } from "@/components/home/post-card"

type ProfilePostsProps = {
  posts: {
    id: string
    image: string
    likes: number
    comments: number
  }[]
}

// Mock data for posts with more content
const enhancedPosts = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Demo User",
      avatar: "/placeholder.svg?height=64&width=64",
      verified: true,
    },
    content:
      "Just launched my new portfolio website! Check it out and let me know what you think. #webdesign #portfolio #frontend",
    media: ["/placeholder.svg?height=600&width=800"],
    timestamp: "2 hours ago",
    likes: 124,
    comments: 18,
    shares: 5,
    liked: true,
    saved: false,
  },
  {
    id: "2",
    user: {
      id: "1",
      name: "Demo User",
      avatar: "/placeholder.svg?height=64&width=64",
      verified: true,
    },
    content:
      "Beautiful sunset at the beach today! 🌅\n\nNothing beats the feeling of sand between your toes and the sound of waves crashing on the shore.",
    media: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    timestamp: "5 hours ago",
    likes: 287,
    comments: 42,
    shares: 12,
    liked: false,
    saved: true,
  },
  {
    id: "3",
    user: {
      id: "1",
      name: "Demo User",
      avatar: "/placeholder.svg?height=64&width=64",
      verified: true,
    },
    content:
      "Just finished reading this amazing book! Highly recommend it to anyone interested in AI and its future implications.",
    media: [],
    timestamp: "1 day ago",
    likes: 76,
    comments: 31,
    shares: 8,
    liked: false,
    saved: false,
  },
  {
    id: "4",
    user: {
      id: "1",
      name: "Demo User",
      avatar: "/placeholder.svg?height=64&width=64",
      verified: true,
    },
    content: "My new home office setup is finally complete! 💻✨\n\nProductivity level: 100%",
    media: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    timestamp: "2 days ago",
    likes: 342,
    comments: 56,
    shares: 24,
    liked: true,
    saved: true,
  },
]

export function ProfilePosts({ posts }: ProfilePostsProps) {
  return (
    <div className="space-y-6">
      {enhancedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
