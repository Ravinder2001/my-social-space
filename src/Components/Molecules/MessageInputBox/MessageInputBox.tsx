import React, { ChangeEvent, useEffect, useState } from "react";
import MessageInput from "../../Atoms/InputBox/MessageInput/MessageInput";
import styles from "./style.module.scss";
import ReactIcons from "../../../Utils/Icons/ReactIcons";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import axios from "axios";
import GifBox from "../GifBox/GifBox";
type props = {
  handleEmoji: (emojiData: EmojiClickData) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleComment: (gif?: string) => void;
  value: string;
};
function MessageInputBox(props: props) {
  const { handleEmoji, handleChange, value,handleComment } = props;
  const [Visible, setVisible] = useState<string>("");

  return (
    <div className={styles.container}>
      <MessageInput
        type="text"
        max_length={30}
        placeholder="Write your comment"
        value={value}
        onChange={handleChange}
      />
      <div className={styles.icons}>
        <div className={styles.emoji}>
          {Visible === "emoji" && (
            <EmojiPicker
              onEmojiClick={handleEmoji}
              height={400}
              searchDisabled={true}
            />
          )}
        </div>
        {Visible === "emoji" ? (
          <div onClick={() => setVisible("")}>
            <ReactIcons name="RxCross2" size={20} color="grey" />
          </div>
        ) : (
          <div onClick={() => setVisible("emoji")}>
            <ReactIcons name="BsEmojiSmile" size={20} color="grey" />
          </div>
        )}
      </div>

      <div className={styles.icons}>
        {Visible === "gif" && <GifBox handleComment={handleComment} setVisible={setVisible} />}
        {Visible === "gif" ? (
          <div onClick={() => setVisible("")}>
            <ReactIcons name="RxCross2" size={20} color="grey" />
          </div>
        ) : (
          <div onClick={() => setVisible("gif")}>
            <ReactIcons name="AiOutlineFileGif" size={20} color="grey" />
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageInputBox;
