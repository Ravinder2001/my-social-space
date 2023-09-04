import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { RootState } from "../../../store/store";
import UserImage from "../../Atoms/UserImage/UserImage";
import GetUserInfo from "../../../APIs/GetUserInfo";
import { Request_Succesfull } from "../../../Utils/Constant";
type infoType = {
  name: string;
  posts_count: string;
  friends_count: string;
  username: string;
};
function ProfileBox() {
  const [info, setInfo] = useState<infoType>({
    name: "",
    posts_count: "",
    friends_count: "",
    username: "",
  });
  const fetchInfo = async () => {
    const res = await GetUserInfo();
    if (res?.status == Request_Succesfull) {
      setInfo(res?.data);
    }
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <UserImage />
      </div>
      <div className={styles.name}>{info.name}</div>
      <div className={styles.id}>@{info.username}</div>
      <div className={styles.bottom_box}>
        <div className={styles.post_box}>
          <div className={styles.number}>{info.posts_count}</div>
          <div className={styles.text}>Posts</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.friend_box}>
          <div className={styles.number}>{info.friends_count}</div>
          <div className={styles.text}>Friends</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBox;
