import React from 'react'
import styles from "./style.module.css"
function ConversationArea() {
  return (
    <div className={styles.conversation_area}>
          <div className={`${styles.msg} ${styles.online}`}>
            <img className={styles.msg_profile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
            <div className={styles.msg_detail}>
              <div className={styles.msg_username}>Madison Jones</div>
              <div className={styles.msg_content}>
                <span className={styles.msg_message}>What time was our meet</span>
                <span className={styles.msg_date}>20m</span>
              </div>
            </div>
          </div>
          <div className={styles.msg}>
            <img className={styles.msg_profile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />
            <div className={styles.msg_detail}>
              <div className={styles.msg_username}>Miguel Cohen</div>
              <div className={styles.msg_content}>
                <span className={styles.msg_message}>Adaptogen taiyaki austin jean shorts brunch</span>
                <span className={styles.msg_date}>20m</span>
              </div>
            </div>
          </div>
          <div className={`${styles.msg} ${styles.active}`}>
            <div className={`${styles.msg_profile} ${styles.group}`}>
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5" />
                <path d="M22 8.5l-10 7-10-7" />
                <path d="M2 15.5l10-7 10 7M12 2v6.5" />
              </svg>
            </div>
            <div className={styles.msg_detail}>
              <div className={styles.msg_username}>CodePen Group</div>
              <div className={styles.msg_content}>
                <span className={styles.msg_message}>Aysenur: I love CSS</span>
                <span className={styles.msg_date}>28m</span>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ConversationArea