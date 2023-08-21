import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Gallery from "react-photo-gallery";
import PostContainer from "../PostContainer/PostContainer";
import GetProfilePosts from "../../../APIs/GetProfilePosts";
import { Request_Succesfull } from "../../../Utils/Constant";
type postData = {
  user_name: string;
  profile_picture: string;
  post_id: string;
  caption: string;
  created_at: string;
  images: { image_url: string }[];
  editable: boolean;
};
function ProfileBody() {
  const [data, setData] = useState<postData[]>([]);
  const FetchPost = async () => {
    const res = await GetProfilePosts();
    if (res.status == Request_Succesfull) {
      setData(res.data);
    }
  };
  useEffect(() => {
    FetchPost();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.left_box}></div>
      <div className={styles.right_box}>
        {data.map((post) => (
          <PostContainer key={post.post_id} Data={post} />
        ))}
      </div>
      <div className={styles.suggest}></div>
    </div>
  );
}

export default ProfileBody;
