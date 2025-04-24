export type PostType = {
  post_id: number;
  user_name: string;
  caption: string;
  profile_picture: string;
  visibility: string;
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
