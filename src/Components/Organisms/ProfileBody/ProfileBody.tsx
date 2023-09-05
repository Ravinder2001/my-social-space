import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Gallery from "react-photo-gallery";
import PostContainer from "../PostContainer/PostContainer";
import { Request_Succesfull } from "../../../Utils/Constant";
import GetSelfPosts from "../../../APIs/GetSelfPosts";
import GetAllPost from "../../../APIs/GetAllPost";
import { useLocation } from "react-router-dom";
import GetAllPostOfAnotherUser from "../../../APIs/GetAllPostOfAnotherUser";
import Loader2 from "../../Atoms/Loader/Loader2/Loader2";
type postData = {
  user_name: string;
  profile_picture: string;
  post_id: string;
  likes_count: string;
  user_like: string;
  caption: string;
  created_at: string;
  images: { image_url: string }[];
  editable: boolean;
  private: boolean;
};
type AnotherUserPostData = {
  user_name: string;
  profile_picture: string;
  post_id: string;
  caption: string;
  created_at: string;
  likes_count: string;
  user_like: string;
  images: { image_url: string }[];
  editable: boolean;
  like_allowed: boolean;
  comment_allowed: boolean;
  share_allowed: boolean;
};
function ProfileBody() {
  const location = useLocation();
  const [data, setData] = useState<postData[] | AnotherUserPostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const FetchPost = async () => {
    const res = await GetSelfPosts();
    if (res.status == Request_Succesfull) {
      setData(res.data);
    }
    setLoading(false)
  };
  const FetchPostOfAnotherUser = async (user_id: string) => {
    const res = await GetAllPostOfAnotherUser(user_id);
    if (res.status == Request_Succesfull) {
      setData(res.data);
    }
    setLoading(false)
  };
  useEffect(() => {
    if (location.search.includes("user")) {
      let user_id = location.search.split("=")[1];
      FetchPostOfAnotherUser(user_id);
    } else {
      FetchPost();
    }
  }, [location]);
  return (
    <div className={styles.container}>
      <div className={styles.left_box}></div>
      <div className={styles.right_box}>
        {loading ? (
          <Loader2 />
        ) : (
          <>
            {data.map((post) => (
              <PostContainer key={post.post_id} Data={post} />
            ))}
          </>
        )}
      </div>
      <div className={styles.suggest}></div>
    </div>
  );
}

export default ProfileBody;
