import React from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import MenuBox from "../MenuBox/MenuBox";
import moment from "moment";

type props = {
  user_name: string;
  profile_picture: string;
  created_at: string;
  post_id: string;
  editable: boolean;
  private?: boolean;
};
function PostHeader(props: props) {
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img src={props.profile_picture} alt="" className={styles.img} />
      </div>
      <div className={styles.middle_box}>
        <div className={styles.name}>{props.user_name}</div>
        <div className={styles.time}>{moment(props.created_at).format("DD-MMMM-YYYY HH:MM")}</div>
      </div>
      {props.private && <div className={styles.private}>Private Post</div>}

      {props.editable ? (
        <div className={styles.left_box}>
          <MenuBox post_id={props.post_id} />
        </div>
      ) : null}
    </div>
  );
}

export default PostHeader;
