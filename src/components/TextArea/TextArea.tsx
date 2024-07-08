import React, { ChangeEvent } from "react";
import styles from "./style.module.css";

type Props = {
  value: string;
  placeholder: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
};
function TextArea(props: Props) {
  return (
    <textarea
      className={styles.textarea}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      rows={props.rows ?? 5}
      id=""
      placeholder={props.placeholder}
    ></textarea>
  );
}

export default TextArea;
