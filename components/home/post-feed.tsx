"use client"
import { PostCard } from "@/components/home/post-card"

// Mock data for posts
const posts = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Emma Johnson",
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
      id: "2",
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=64&width=64",
      verified: false,
    },
    content:
      "Beautiful sunset at the beach today! 🌅\n\nNothing beats the feeling of sand between your toes and the sound of waves crashing on the shore.",
    media: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
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
      id: "3",
      name: "Sophia Williams",
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
      id: "4",
      name: "Marcus Taylor",
      avatar: "/placeholder.svg?height=64&width=64",
      verified: false,
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

export function PostFeed() {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
