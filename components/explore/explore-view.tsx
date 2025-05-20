"use client";

import React, { useEffect, useState } from "react";
import { Search, UserCheck, UserX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/explore/user-card";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { FriendRequestType, SearchUserType } from "../utils/CommanTypes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { formatTimeAgo } from "../utils/functions";
import { showToast } from "../utils/toast";

type PublicPostType = {
  post_id: number;
  caption: string;
  created_at: string;
  full_name: string;
  profile_picture: string;
  image_url: string;
  likes_count: string;
  comments_count: string;
};

export function ExploreView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<SearchUserType[]>([]);
  const [friendReqList, setFriendReqList] = useState<FriendRequestType[]>([]);
  const [publicPost, setPublicPost] = useState<PublicPostType[]>([]);

  const { fetchData: fetchUsers } = useApiFetch("");
  const { fetchData: fetchReqList } = useApiFetch("");
  const { fetchData: handleReqRes } = useApiFetch("");
  const { fetchData: fetchPublicPosts } = useApiFetch("");

  const handleReq = async (req_id: number, status: "ACCEPTED" | "REJECTED") => {
    await handleReqRes(CONSTANTS.API_ROUTES.RESPOND_TO_REQ + `/${req_id}`, {
      method: "PUT",
      data: {
        status,
      },
    }).then((res) => {
      if (res.success == 1) {
        setFriendReqList((prev) => prev.filter((req) => req.request_id !== req_id));
        showToast({
          message: `You ${status == "ACCEPTED" ? "accepted" : "rejected"} the friend request.`,
          type: "success",
        });
      }
    });
  };

  useEffect(() => {
    fetchUsers(CONSTANTS.API_ROUTES.SEARCH_USERS).then((res: any) => {
      if (res?.success == 1) {
        setUsers(res.data); // Assuming API returns { success: true, data: [...] }
      }
    });
    fetchReqList(CONSTANTS.API_ROUTES.GET_REQUEST_LIST).then((res: any) => {
      if (res?.success == 1) {
        setFriendReqList(res.data); // Assuming API returns { success: true, data: [...] }
      }
    });
    fetchPublicPosts(CONSTANTS.API_ROUTES.GET_ALL_PUBLIC_POST).then((res: any) => {
      if (res?.success == 1) {
        setPublicPost(res.data); // Assuming API returns { success: true, data: [...] }
      }
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

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>

        {friendReqList.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Friend Requests</h2>
              {friendReqList.length > 3 && (
                <Button variant="link" className="text-sm">
                  See all ({friendReqList.length})
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {friendReqList.map((request) => (
                <Card key={request.request_id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={request.sender_picture} alt={request.sender_name} />
                        <AvatarFallback>{request.sender_name[0]}</AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{request.sender_name}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-muted-foreground">
                          <span>Requested {formatTimeAgo(request.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleReq(request.request_id, "ACCEPTED")}
                      >
                        <UserCheck className="h-4 w-4" />
                        <span className="hidden sm:inline">Accept</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleReq(request.request_id, "REJECTED")}
                      >
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
          <Input
            placeholder="Search users..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
            {publicPost.map((post) => (
              <div
                key={post.post_id}
                className="overflow-hidden rounded-lg border bg-background shadow-sm"
              >
                <div className="p-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.profile_picture} alt={post.full_name} />
                    <AvatarFallback>{post.full_name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{post.full_name}</span>
                </div>
                <img
                  src={post.image_url}
                  alt={`Post by ${post.full_name}`}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span>❤️</span>
                      <span>{post.likes_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💬</span>
                      <span>{post.comments_count}</span>
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
