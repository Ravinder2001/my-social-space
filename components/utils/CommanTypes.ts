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
  is_saved: boolean;
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

export type ProfilePhotosType = {
  id: number;
  image: string;
  likes: string;
  comments: string;
};

export type ProfileSavedPostType = {
  id: number;
  image: string | null;
  likes: string;
  comments: string;
  caption: string | null;
  created_at: string;
};

export type ProfileDetailsType = {
  username: string;
  full_name: string;
  profile_picture: string;
  cover_picture: string;
  bio: string;
  city: string;
  website: string;
  created_at: string;
  post_count?: string;
  friends_count?: string;
};

export type UploadedFileType = {
  key: string;
  url: string;
};

export type SearchUserType = {
  user_id: number;
  user_name: string;
  profile_picture: string;
  bio: string;
  isFriend: boolean;
  isRequested: boolean;
};

export type NotificationType = {
  notification_id: number;
  created_at: string;
  profile_picture: string | null;
  content: string;
  is_read: boolean;
  post_image_url: string | null;
};

export type FriendRequestType = {
  request_id: number;
  created_at: string;
  sender_name: string;
  sender_picture: string;
};

export type FriendsType = {
  friendship_id: number;
  friend_name: string;
  friend_picture: string;
  created_at: string;
};

export type StoryType = {
  name: string;
  profile_picture: string;
  ownStory: boolean;
  stories: {
    story_id: number;
    media_url: string;
    media_type: "IMAGE" | "VIDEO";
    caption?: string;
    song_name?: string;
    song_start_time?: string;
    song_end_time?: string;
    created_at: string;
  }[];
};

export type ChannelType = {
  channel_id: number;
  channel_name: string;
  profile_picture: string;
  last_message: string | null;
  content_type: string | null;
  sent_at: string;
};

export type MessageType = {
  message_id: number;
  message: string;
  sent_at: string;
  content_type: string;
  ownMessage: boolean;
  is_edited: boolean;
  is_deleted: boolean;
};
