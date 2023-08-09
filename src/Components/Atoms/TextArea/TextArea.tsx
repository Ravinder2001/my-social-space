import React, { ChangeEvent } from "react";
import styles from "./style.module.scss";
type TextAreaprops = {
  handleCaption: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
function TextArea(props: TextAreaprops) {
  return (
    <textarea
      className={styles.input}
      onChange={props.handleCaption}
      maxLength={255}
    />
  );
}

export default TextArea;
