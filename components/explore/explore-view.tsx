"use client";

import { useEffect, useState } from "react";
import { Search, UserCheck, UserX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/explore/user-card";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { SearchUserType } from "../utils/CommanTypes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const posts = [
  { id: "1", user: "Emma Johnson", image: "/placeholder.svg?height=400&width=400", likes: 245, comments: 32 },
  { id: "2", user: "Noah Williams", image: "/placeholder.svg?height=400&width=400", likes: 187, comments: 24 },
  { id: "3", user: "Olivia Brown", image: "/placeholder.svg?height=400&width=400", likes: 312, comments: 41 },
  { id: "4", user: "Liam Davis", image: "/placeholder.svg?height=400&width=400", likes: 156, comments: 18 },
  { id: "5", user: "Ava Wilson", image: "/placeholder.svg?height=400&width=400", likes: 278, comments: 36 },
  { id: "6", user: "William Moore", image: "/placeholder.svg?height=400&width=400", likes: 203, comments: 27 },
];

const initialFriendRequests = [
  {
    id: "101",
    name: "Sophia Martinez",
    avatar: "/placeholder.svg?height=64&width=64",
    mutualFriends: 4,
    timeAgo: "2 days ago",
    verified: false,
  },
  {
    id: "102",
    name: "Jackson Lee",
    avatar: "/placeholder.svg?height=64&width=64",
    mutualFriends: 2,
    timeAgo: "1 week ago",
    verified: true,
  },
  {
    id: "103",
    name: "Isabella Garcia",
    avatar: "/placeholder.svg?height=64&width=64",
    mutualFriends: 6,
    timeAgo: "3 hours ago",
    verified: false,
  },
];

export function ExploreView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<SearchUserType[]>([]);

  const { fetchData: fetchUsers } = useApiFetch("");

  useEffect(() => {
    fetchUsers(CONSTANTS.API_ROUTES.SEARCH_USERS)
      .then((res: any) => {
        if (res?.success == 1) {
          setUsers(res.data); // Assuming API returns { success: true, data: [...] }
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length >= 3) {
        // Fetch searched users
        fetchUsers(`${CONSTANTS.API_ROUTES.SEARCH_USERS}?name=${searchQuery}`)
          .then((res: any) => {
            if (res?.success) {
              setUsers(res.data);
            }
          })
          .catch((error) => {
            console.error("Error searching users:", error);
          });
      } else if (searchQuery.trim().length === 0) {
        // If search cleared, again fetch latest 6 users
        fetchUsers(CONSTANTS.API_ROUTES.SEARCH_USERS)
          .then((res: any) => {
            if (res?.success) {
              setUsers(res.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching latest users:", error);
          });
      }
    }, 400); // Debounce 400ms

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const filteredPosts = posts.filter((post) => post.user.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>

        {initialFriendRequests.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Friend Requests</h2>
              {initialFriendRequests.length > 3 && (
                <Button variant="link" className="text-sm">
                  See all ({initialFriendRequests.length})
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {initialFriendRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                        <AvatarFallback>{request.name[0]}</AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{request.name}</span>
                          {request.verified && (
                            <Badge variant="outline" className="h-5 rounded-full bg-brand-blue text-white px-1.5">
                              ✓
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-muted-foreground">
                          {request.mutualFriends > 0 && (
                            <span>
                              {request.mutualFriends} mutual {request.mutualFriends === 1 ? "friend" : "friends"}
                            </span>
                          )}
                          <span className="hidden sm:inline">•</span>
                          <span>Requested {request.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="default" size="sm" className="gap-1">
                        <UserCheck className="h-4 w-4" />
                        <span className="hidden sm:inline">Accept</span>
                      </Button>

                      <Button variant="outline" size="sm" className="gap-1">
                        <UserX className="h-4 w-4" />
                        <span className="hidden sm:inline">Reject</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">People you may know</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length > 0 ? (
              users.map((user) => <UserCard key={user.user_id} user={user} />)
            ) : (
              <p className="text-muted-foreground">No users found.</p>
            )}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Public Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="overflow-hidden rounded-lg border bg-background shadow-sm">
                <div className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">{post.user[0]}</div>
                  <span className="font-medium">{post.user}</span>
                </div>
                <img src={post.image || "/placeholder.svg"} alt={`Post by ${post.user}`} className="w-full aspect-square object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span>❤️</span>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
