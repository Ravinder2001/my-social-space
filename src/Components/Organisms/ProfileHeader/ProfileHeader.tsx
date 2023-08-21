import React from "react";
import styles from "./style.module.scss";
import posts from "../../../Assets/Images/posts.png";
import friends from "../../../Assets/Images/friends.png";
import work from "../../../Assets/Images/work.png";
import location from "../../../Assets/Images/location.png";
import time from "../../../Assets/Images/time.png";
import edit from "../../../Assets/Images/edit.png";
type headerProps = {
  User: {
    id: string;
    name: string;
    image: string;
    user: boolean;
    theme: string;
  };
};

function ProfileHeader(props: headerProps) {
  const { image } = props.User;
  return (
    <div className={styles.container}>
      <div className={styles.user_image}>
        <img src={image} alt="user_profile_pic" className={styles.img} />
      </div>
      <div className={styles.menu}>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={posts} alt="profile_icon" />
          </div>
          <div className={styles.text}>90</div>
        </div>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={friends} alt="profile_icon" />
          </div>
          <div className={styles.text}>1000</div>
        </div>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={work} alt="profile_icon" />
          </div>
          <div className={styles.text}>Software Engineer</div>
        </div>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={location} alt="profile_icon" />
          </div>
          <div className={styles.text}>Kolkata</div>
        </div>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={time} alt="profile_icon" />
          </div>
          <div className={styles.text}>Joined from March</div>
        </div>
        <div className={`${styles.box} ${styles.edit}`}>
          <div className={styles.icon}>
            <img src={edit} alt="profile_icon" />
          </div>
          <div className={styles.text}>Edit</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
