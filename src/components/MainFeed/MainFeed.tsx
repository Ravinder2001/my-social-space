import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";

const stories = [
  { id: "create", type: "create", avatar: "", username: "" },
  { id: "1", username: "user1", avatar: "/placeholder.svg?height=64&width=64" },
  { id: "2", username: "user2", avatar: "/placeholder.svg?height=64&width=64" },
  { id: "3", username: "user3", avatar: "/placeholder.svg?height=64&width=64" },
  { id: "4", username: "user4", avatar: "/placeholder.svg?height=64&width=64" },
];

const posts = [
  {
    id: "1",
    user: { name: "Jane Doe", avatar: "/placeholder.svg?height=40&width=40", username: "@janedoe" },
    content: "Just had an amazing day at the beach! 🏖️ #summervibes",
    image: "/placeholder.svg?height=400&width=600",
    likes: 120,
    comments: 24,
    shares: 5,
    time: "2 hours ago",
  },
  {
    id: "2",
    user: { name: "John Smith", avatar: "/placeholder.svg?height=40&width=40", username: "@johnsmith" },
    content: "Check out this delicious meal I cooked! 🍝 #foodie",
    image: "/placeholder.svg?height=400&width=600",
    likes: 89,
    comments: 15,
    shares: 2,
    time: "4 hours ago",
  },
];

export default function MainFeed() {
  return (
    <main className="w-full lg:w-1/2 space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {stories.map((story) => (
            <div key={story.id} className="flex-shrink-0">
              {story.type === "create" ? (
                <button className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <PlusCircle className="w-8 h-8 text-gray-500" />
                </button>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5">
                  <Image
                    src={story.avatar}
                    alt={story.username}
                    className="w-full h-full object-cover rounded-full border-2 border-white"
                    height={100}
                    width={100}
                  />
                </div>
              )}
              <p className="text-xs text-center mt-1 truncate w-16">{story.type === "create" ? "Create Story" : story.username}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full" width={200} height={100} />
                  <div>
                    <p className="font-semibold">{post.user.name}</p>
                    <p className="text-sm text-gray-500">
                      {post.user.username} • {post.time}
                    </p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-3">{post.content}</p>
            </div>
            <Image src={post.image} alt="Post content" className="w-full" width={100} height={100} />
            <div className="p-4 flex items-center justify-between border-t">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
                  <Share2 className="w-5 h-5" />
                  <span>{post.shares}</span>
                </button>
              </div>
              <button className="text-gray-500 hover:text-blue-600">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2">Load More</button>
    </main>
  );
}
