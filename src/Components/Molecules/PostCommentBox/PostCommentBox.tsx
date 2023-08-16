import { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import InputBox1 from "../../Atoms/InputBox/InputBox1/InputBox1";

import styles from "./styles.module.scss";
import { RootState } from "../../../store/store";
import AddComment from "../../../APIs/AddComment";
import { message } from "antd";
type PostCommentBoxProps = {
  post_id: string;
};

function PostCommentBox(props: PostCommentBoxProps) {
  let User = useSelector((state: RootState) => state.UserReducer);
  const [content, setContent] = useState("");
  const handleContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handleComment = async () => {
    const res = await AddComment({
      post_id: props.post_id,
      content: content,
      user_id: User.id,
    });
    if (res.status == 200) {
      message.success("comment added");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.add_comment}>
        <div className={styles.img_box}>
          <img src={User.image} alt="" className={styles.img} />
        </div>
        <div className={styles.input_box}>
          <InputBox1
            type="text"
            placeholder="Add a comment"
            max_length={50}
            onChange={handleContent}
            value={content}
          />
        </div>

        <button onClick={handleComment} className={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

export default PostCommentBox;
