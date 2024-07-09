import React from "react";
import styles from "./style.module.css";
import MessageRoom from "../../components/MessageRoom/MessageRoom";
import ConversationArea from "../../components/ConversationArea/ConversationArea";
// import Image from "../../components/Image/Image";
// import MessageRoom from "../../components/MessageRoom/MessageRoom";

function Messages() {
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <ConversationArea />
        <MessageRoom />
      </div>
    </div>
  );
}

export default Messages;
