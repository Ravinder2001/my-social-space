"use client";

import { PostCard } from "@/components/home/post-card";
import { useState } from "react";
import { EditPostType, PostType } from "../utils/CommanTypes";
import { CreatePostDialog } from "../home/create-post-dialog";

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
      {dialogOpen && <CreatePostDialog open={dialogOpen} onOpenChange={setDialogOpen} editPost={selectedPost} />}
    </div>
  );
}
