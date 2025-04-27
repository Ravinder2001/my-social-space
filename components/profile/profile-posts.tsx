"use client";

import { PostCard } from "@/components/home/post-card";
import { useEffect, useState } from "react";
import { EditPostType, PostType } from "../utils/CommanTypes";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { CreatePostBox } from "../home/create-post-box";

type Props = {
  posts: PostType[];
};

export function ProfilePosts(props: Props) {
  const [selectedPost, setSelectedPost] = useState<null | EditPostType>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      {props.posts.map((post) => (
        <PostCard
          key={post.post_id}
          post={post}
          onEditClick={(item: EditPostType) => {
            setSelectedPost(item);
            setDialogOpen(true);
          }}
        />
      ))}
      <CreatePostBox selectedPost={selectedPost} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
}
