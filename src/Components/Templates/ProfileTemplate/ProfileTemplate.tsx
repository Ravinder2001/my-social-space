import React from "react";
import styles from "./styles.module.scss";
import ProfileHeader from "../../Organisms/ProfileHeader/ProfileHeader";
import BioContainer from "../../Organisms/BioContainer/BioContainer";

function ProfileTemplate() {
  return (
    <div className={styles.container}>
      <ProfileHeader />
      <div className={styles.sub_container}>
        <div className={styles.bio_container}>
          <BioContainer />
        </div>
        <div className={styles.post_container}></div>
      </div>
    </div>
  );
}

export default ProfileTemplate;
