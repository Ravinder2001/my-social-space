import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { RootState } from "../../../store/store";

function ProfileBox() {
  const image = useSelector((state: RootState) => state.UserReducer.image);
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img
          src={image}
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.name}>Ravinder Singh Negi</div>
      <div className={styles.id}>@ravinder</div>
      <div className={styles.bottom_box}>
        <div className={styles.post_box}>
          <div className={styles.number}>40</div>
          <div className={styles.text}>Posts</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.friend_box}>
          <div className={styles.number}>30</div>
          <div className={styles.text}>Friends</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBox;
