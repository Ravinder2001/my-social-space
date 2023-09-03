import React from "react";
import styles from "./style.module.scss";
import { formatTime } from "../../../Utils/Function";
type props = {
  id: number;
  name: string;
  status: string;
  created_at: string;
  image_url: string;
};
function FriendRequestBox(props: props) {
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img src={props.image_url} alt="" className={styles.img} />
      </div>
      <div className={styles.right_box}>
        <div className={styles.name_group}>
          <div className={styles.name}>{props.name}</div>
          <div>{formatTime(props.created_at)}</div>
        </div>
        <div className={styles.btn_group}>
          <div className={styles.accept}>Accept</div>
          <div className={styles.reject}>Reject</div>
        </div>
      </div>
    </div>
  );
}

export default FriendRequestBox;
