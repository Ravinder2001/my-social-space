import styles from "./styles.module.scss";
type PostCaptionProps = {
  caption: string;
};
function PostCaption(props: PostCaptionProps) {
  return (
    <pre style={{ whiteSpace: "pre-line" }} className={styles.container}>
      {props.caption}
    </pre>
  );
}

export default PostCaption;
