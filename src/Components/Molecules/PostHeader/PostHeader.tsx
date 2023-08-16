import moment from "moment";
import MenuBox from "../MenuBox/MenuBox";

import styles from "./styles.module.scss";
type PostHeaderProps = {
  profile_picture: string;
  username: string;
  created_at: string;
};
function PostHeader(props: PostHeaderProps) {
  const time=moment(props.created_at).format("YYYY-MM-DD")
  return (
    <div className={styles.header}>
      <div className={styles.left_box}>
        <img
          src={props.profile_picture}
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.middle_box}>
        <div className={styles.post_details}>
          <span className={styles.name}>{props.username}</span>
        </div>
        <div className={styles.time}>{time}</div>
      </div>
      <div className={styles.right_box}>
        <MenuBox />
      </div>
    </div>
  );
}

export default PostHeader;
