import React, { useState } from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import MessageInputBox from "../../Molecules/MessageInputBox/MessageInputBox";
import { EmojiClickData } from "emoji-picker-react";
function PostAddComments() {
  const User = useSelector((state: RootState) => state.UserReducer);
  const [comment, setComment] = useState<string>("");

  const handleEmoji = (emojiData: EmojiClickData) => {
    setComment(comment + emojiData.emoji);
  };
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img src={User.image} alt="" className={styles.img} />
      </div>
      <div className={styles.input_box}>
        <MessageInputBox handleEmoji={handleEmoji} />
      </div>
      <div className={styles.button}>Send</div>
    </div>
  );
}

export default PostAddComments;
