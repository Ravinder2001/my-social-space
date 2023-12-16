import React, { ChangeEvent, useState } from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import MessageInputBox from "../../Molecules/MessageInputBox/MessageInputBox";
import { EmojiClickData } from "emoji-picker-react";
import AddComment from "../../../APIs/AddComment";
import { Request_Succesfull } from "../../../Utils/Constant";
import { message } from "antd";
import UserImage from "../../Atoms/UserImage/UserImage";
import { socket } from "../../../socket";

type props = {
  post_id: string;
  open: boolean;
  FetchComments?: () => void;
};
function PostAddComments(props: props) {
  const User = useSelector((state: RootState) => state.UserReducer);
  const [comment, setComment] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const handleEmoji = (emojiData: EmojiClickData) => {
    setComment(comment + emojiData.emoji);
  };

  const handleComment = async (gif?: string) => {
    const res = await AddComment({
      post_id: props.post_id,
      content: gif ?? comment,
    });
    if (res?.status == Request_Succesfull) {
      socket.emit("Comment-Notifications", { post_id: props.post_id, UserName: User.name, UserId: User.id, image: User.image });
      setComment("");
      if (props.open && props.FetchComments) {
        props.FetchComments();
      } else {
        message.success("Comment added successfully");
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <UserImage />
      </div>
      <div className={styles.input_box}>
        <MessageInputBox
          placeholder="Add you Comment"
          handleEmoji={handleEmoji}
          handleChange={handleChange}
          value={comment}
          handleComment={handleComment}
        />
      </div>
      <div className={styles.button} onClick={() => handleComment()}>
        Send
      </div>
    </div>
  );
}

export default PostAddComments;
