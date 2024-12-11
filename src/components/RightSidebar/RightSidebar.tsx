import { TrendingUp, UserPlus } from "lucide-react";
import Image from "next/image";

const trendingTopics = [
  { hashtag: "#TechNews", posts: 1234 },
  { hashtag: "#SummerVibes", posts: 987 },
  { hashtag: "#HealthyLiving", posts: 765 },
  { hashtag: "#TravelDreams", posts: 543 },
];

const suggestedFriends = [
  { name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", mutualFriends: 5 },
  { name: "Bob Williams", avatar: "/placeholder.svg?height=40&width=40", mutualFriends: 3 },
  { name: "Carol Davis", avatar: "/placeholder.svg?height=40&width=40", mutualFriends: 7 },
];

const upcomingEvents = [
  { title: "Tech Meetup 2023", date: "Aug 15, 2023", attendees: 120 },
  { title: "Virtual Concert", date: "Aug 20, 2023", attendees: 500 },
];

export default function RightSidebar() {
  return (
    <aside className="w-full lg:w-1/4 space-y-6">
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Trending Topics
          </h3>
          <ul className="space-y-3">
            {trendingTopics.map((topic) => (
              <li key={topic.hashtag} className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">{topic.hashtag}</span>
                <span className="text-sm text-gray-500">{topic.posts} posts</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-4">Suggested Friends</h3>
          <ul className="space-y-4">
            {suggestedFriends.map((friend) => (
              <li key={friend.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" width={40} height={40} />
                  <div>
                    <p className="font-medium">{friend.name}</p>
                    <p className="text-sm text-gray-500">{friend.mutualFriends} mutual friends</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <UserPlus className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Advertisement</h3>
          <p className="text-sm text-gray-600">This is a placeholder for an advertisement.</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-4">Upcoming Events</h3>
          <ul className="space-y-4">
            {upcomingEvents.map((event) => (
              <li key={event.title} className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.date}</p>
                <p className="text-sm text-gray-500">{event.attendees} attending</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
