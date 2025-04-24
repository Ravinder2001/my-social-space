export type VisibilityType = "PUBLIC" | "FRIENDS" | "PRIVATE";
export type PostType = {
  post_id: number;
  user_name: string;
  caption: string;
  profile_picture: string;
  visibility: VisibilityType;
  created_at: string;
  images: string[];
  comment_count: number;
  like_count: number;
  is_liked: boolean;
  ownPost: boolean;
  latest_comment: null | {
    content: string;
    user_name: string;
    profile_picture: string;
  };
};


export type EditPostType = {
  id: number;
  caption: string;
  visibility: VisibilityType;
  images: { key: string; url: string }[];
};
