"use client";
import { useEffect, useState } from "react";
import { StoriesSection } from "@/components/home/stories-section";
import { CreatePostBox } from "@/components/home/create-post-box";
import { TrendingTopics } from "@/components/home/trending-topics";
import { SuggestedUsers } from "@/components/home/suggested-users";
import { EditPostType, PostType } from "../utils/CommanTypes";
import useApiFetch from "@/hooks/use-api-fetch";
import { PostCard } from "./post-card";
import CONSTANTS from "../utils/constants";

export function HomeFeed() {
  const [selectedPost, setSelectedPost] = useState<null | EditPostType>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [postList, setPostList] = useState<PostType[]>([]);

  const { fetchData } = useApiFetch(CONSTANTS.API_ROUTES.GET_ALL_POST);

  useEffect(() => {
    fetchData().then((res) => {
      setPostList(res.data);
    });
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StoriesSection />
          <CreatePostBox selectedPost={selectedPost} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
          <div className="space-y-6">
            {postList.map((post) => (
              <PostCard
                key={post.post_id}
                post={post}
                onEditClick={(item: EditPostType) => {
                  setSelectedPost(item);
                  setDialogOpen(true);
                }}
              />
            ))}
          </div>
        </div>
        <div className="hidden lg:block space-y-6">
          <TrendingTopics />
          <SuggestedUsers />
        </div>
      </div>
    </div>
  );
}
