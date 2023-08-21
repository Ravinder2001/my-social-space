import React from "react";
import styles from "./style.module.scss";
import LucideIcons from "../../../Utils/Icons/LucideIcons";

type props = {
  handleModal?: () => void;
};
function PostImpression(props: props) {
  const { handleModal } = props;
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.icon}>
          <LucideIcons name="Heart" color="#494849" size={22} />
        </div>
        <div className={styles.text}>Like</div>
      </div>
      <div className={styles.box}>
        <div className={styles.icon}>
          <LucideIcons name="MessageCircleIcon" color="#494849" size={22} />
        </div>
        <div className={styles.text}>Comments</div>
      </div>
      <div className={styles.box} onClick={handleModal}>
        <div className={styles.icon}>
          <LucideIcons name="Hash" color="#494849" size={22} />
        </div>
        <div className={styles.text}>See Post</div>
      </div>
    </div>
  );
}

export default PostImpression;
