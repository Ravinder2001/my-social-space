"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/explore/user-card";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { SearchUserType } from "../utils/CommanTypes";

const posts = [
  { id: "1", user: "Emma Johnson", image: "/placeholder.svg?height=400&width=400", likes: 245, comments: 32 },
  { id: "2", user: "Noah Williams", image: "/placeholder.svg?height=400&width=400", likes: 187, comments: 24 },
  { id: "3", user: "Olivia Brown", image: "/placeholder.svg?height=400&width=400", likes: 312, comments: 41 },
  { id: "4", user: "Liam Davis", image: "/placeholder.svg?height=400&width=400", likes: 156, comments: 18 },
  { id: "5", user: "Ava Wilson", image: "/placeholder.svg?height=400&width=400", likes: 278, comments: 36 },
  { id: "6", user: "William Moore", image: "/placeholder.svg?height=400&width=400", likes: 203, comments: 27 },
];

export function ExploreView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<SearchUserType[]>([]);

  const { fetchData: fetchUsers } = useApiFetch("");

  useEffect(() => {
    fetchUsers(CONSTANTS.API_ROUTES.SEARCH_USERS)
      .then((res:any) => {
        if (res?.success==1) {
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
          .then((res:any) => {
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
          .then((res:any) => {
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
