import React from "react";
import styles from "./style.module.scss";
import moment from "moment";
import { formatTime } from "../../../Utils/Function";
type PropsType = {
  data: {
    user_name: string;
    image_url: string;
    content: string;
    created_at: string;
  }[];
};
function CommentsListBox(props: PropsType) {
  return (
    <div className={styles.container}>
      {props.data.map((comment) => (
        <div className={styles.comment_box}>
          <div className={styles.img_box}>
            <img src={comment.image_url} className={styles.img} alt="" />
          </div>
          <div className={styles.right_box}>
            <div className={styles.name}>{comment.user_name}</div>
            <div className={styles.content}>{comment.content}</div>
            <div className={styles.time}>{formatTime(comment.created_at)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsListBox;
