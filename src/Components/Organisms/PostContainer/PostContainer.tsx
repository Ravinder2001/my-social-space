import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PostHeader from "../../Molecules/PostHeader/PostHeader";
import PostCaption from "../../Molecules/PostCaption/PostCaption";
import PostImages from "../../Molecules/PostImages/PostImages";
import Data from "../../../data.json";
import PostImpression from "../../Molecules/PostImpression/PostImpression";
import PostCommentBox from "../../Molecules/PostCommentBox/PostCommentBox";

import { RootState } from "../../../store/store";

import styles from "./styles.module.scss";
import GetProfilePosts from "../../../APIs/GetProfilePosts";


type DataType={
  user_name:string,
  profile_picture:string,
  post_id:string,
  caption:string,
  created_at:string,
  im:string,

}
function PostContainer() {
  const User = useSelector((state: RootState) => state.UserReducer);
  const [data, setData] = useState([]);
  const FetchPost = async () => {
    const res = await GetProfilePosts(User.id);
  };
  useEffect(() => {
    FetchPost();
  }, []);
  return (
    <div className={styles.container}>
      {[1, 2].map((item) => (
        <div
          key={item}
          className={`${styles.post_box} ${
            User.theme == "dark" ? styles.dark_post_box : styles.light_post_box
          }`}
        >
          <PostHeader />
          <PostCaption />
          <PostImages Images={data} />
          <PostImpression />
          <PostCommentBox />
        </div>
      ))}
    </div>
  );
}

export default PostContainer;
