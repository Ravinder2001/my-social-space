import React from "react";
import styles from "./style.module.scss";
import Gallery from "react-photo-gallery";
import PostContainer from "../PostContainer/PostContainer";
function ProfileBody() {

  return (
    <div className={styles.container}>
      <div className={styles.left_box}></div>
      <div className={styles.right_box}>
       <PostContainer/>
      </div>
      <div className={styles.suggest}></div>
    </div>
  );
}

export default ProfileBody;
