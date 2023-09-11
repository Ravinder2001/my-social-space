import React from "react";
import styles from "./style.module.scss";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
function RoomMessages() {
  return (
    <div className={styles.container}>
      <div className={true ? styles.msg_container : styles.user_msg_container}>
        <div className={styles.img_box}>
          <img
            src="https://my-social-space.s3.ap-south-1.amazonaws.com/ProfilePictures/A5pfyAEAclcwPTyoKDXpTrKoj6n2/A5pfyAEAclcwPTyoKDXpTrKoj6n2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230907%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230907T095324Z&X-Amz-Expires=86400&X-Amz-Signature=d23f9996dfa629d866656a70dcc92824eec1055a41f1d0f56055d3fd17ec7256&X-Amz-SignedHeaders=host&x-id=GetObject"
            alt=""
            className={styles.img}
          />
        </div>

        <div className={true ? styles.msg_box : styles.user_msg_box}>
          <div className={styles.tick}>
            <LucideIcons name="Check" color="white" size={20} />
          </div>
          <div className={styles.message}>Hey</div>
          <div className={styles.time}>12:20</div>
        </div>
      </div>
      <div className={styles.user_msg_container}>
        <div className={styles.img_box}>
          <img
            src="https://my-social-space.s3.ap-south-1.amazonaws.com/ProfilePictures/A5pfyAEAclcwPTyoKDXpTrKoj6n2/A5pfyAEAclcwPTyoKDXpTrKoj6n2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230907%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230907T095324Z&X-Amz-Expires=86400&X-Amz-Signature=d23f9996dfa629d866656a70dcc92824eec1055a41f1d0f56055d3fd17ec7256&X-Amz-SignedHeaders=host&x-id=GetObject"
            alt=""
            className={styles.img}
          />
        </div>

        <div className={styles.user_msg_box}>
          <div className={styles.message}>Hey</div>
          <div className={styles.time}>12:20</div>
        </div>
      </div>
    </div>
  );
}

export default RoomMessages;
