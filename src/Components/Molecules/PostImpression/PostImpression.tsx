import React from "react";
import styles from "./styles.module.scss";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
function PostImpression() {
  return (
    <div className={styles.container}>
      <div className={styles.like}>
        <LucideIcons name="Heart" color="#e60f0f" size={22} />
        <div className={styles.text}>Likes (10)</div>
      </div>
      <div className={styles.comments}>
        <LucideIcons name="MessageCircleIcon" color="#a59393" size={22} />
        <div className={styles.text}>Comments (10)</div>
      </div>
    </div>
  );
}

export default PostImpression;
