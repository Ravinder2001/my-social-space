import React, { ChangeEvent, FocusEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
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
  placeholder: string;
  max_length?: number;
  handleKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  handleKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  handleBlur?: FocusEventHandler<HTMLInputElement>;
};
function MessageInputBox(props: props) {
  const { handleEmoji, handleChange, value,handleComment,placeholder,max_length } = props;
  const [Visible, setVisible] = useState<string>("");

  return (
    <div className={styles.container}>
      <MessageInput
        type="text"
        max_length={max_length??30 }
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        handleBlur={props.handleBlur}
        handleKeyDown={props.handleKeyDown}
        handleKeyUp={props.handleKeyUp}
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
