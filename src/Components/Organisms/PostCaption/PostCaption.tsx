import React from "react";
import styles from "./style.module.scss";

type props = {
  Caption: string;
};
function PostCaption(props: props) {
  return <pre className={styles.container}>{props.Caption}</pre>;
}

export default PostCaption;
