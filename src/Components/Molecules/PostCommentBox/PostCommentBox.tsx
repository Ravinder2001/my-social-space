import InputBox1 from "../../Atoms/InputBox/InputBox1/InputBox1";

import styles from "./styles.module.scss";

function PostCommentBox() {
  let image =
    "https://scontent.fpgh1-1.fna.fbcdn.net/v/t39.30808-6/328131189_1123663518301123_8970126291371955891_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=b5Ivp35TckwAX_7F0cm&_nc_ht=scontent.fpgh1-1.fna&oh=00_AfAz0GY8BGrxWJxs2tyCy3AB-p_AQB0WeH0JsQiRz2T3Bg&oe=64C4B810";
  return (
    <div className={styles.container}>
      <div className={styles.add_comment}>
        <div className={styles.img_box}>
          <img src={image} alt="" className={styles.img} />
        </div>
        <div className={styles.input_box}>
          <InputBox1 type="text" placeholder="Add a comment" max_length={50} />
        </div>

        <button className={styles.button}>Send</button>
      </div>
    </div>
  );
}

export default PostCommentBox;
