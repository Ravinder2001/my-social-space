import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Gallery from "react-photo-gallery";
import PostContainer from "../PostContainer/PostContainer";
import { Request_Succesfull } from "../../../Utils/Constant";
import GetSelfPosts from "../../../APIs/GetSelfPosts";
import GetAllPost from "../../../APIs/GetAllPost";
import FriendRequestList from "../FriendRequestList/FriendRequestList";
type postData = {
  user_name: string;
  profile_picture: string;
  post_id: string;
  caption: string;
  created_at: string;
  images: { image_url: string }[];
  editable: boolean;
  like_allowed: boolean;
  comment_allowed: boolean;
  share_allowed: boolean;
};
function HomeBody() {
  const [data, setData] = useState<postData[]>([]);
  const FetchPost = async () => {
    const res = await GetAllPost();

    if (res.status == Request_Succesfull) {
      setData(res.data);
    }
  };
  useEffect(() => {
    FetchPost();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.left_box}>
        <FriendRequestList />
      </div>
      <div className={styles.right_box}>
        {data.map((post) => (
          <PostContainer key={post.post_id} Data={post} />
        ))}
      </div>
      <div className={styles.suggest}></div>
    </div>
  );
}

export default HomeBody;
