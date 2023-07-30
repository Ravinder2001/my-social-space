import React from "react";
import styles from "./styles.module.scss";
import PostHeader from "../../Molecules/PostHeader/PostHeader";
import PostCaption from "../../Molecules/PostCaption/PostCaption";
import PostImages from "../../Molecules/PostImages/PostImages";
import Data from "../../../data.json";
import PostImpression from "../../Molecules/PostImpression/PostImpression";
import PostCommentBox from "../../Molecules/PostCommentBox/PostCommentBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
function PostContainer() {
  const Theme = useSelector((state: RootState) => state.UserReducer.theme);
  const data = Data.images;
  return (
    <div className={styles.container}>
      {[1, 2].map((item) => (
        <div
          key={item}
          className={`${styles.post_box} ${
            Theme == "dark" ? styles.dark_post_box : styles.light_post_box
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
