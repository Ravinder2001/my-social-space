import React, { ChangeEvent } from "react";
import styles from "./styles.module.scss";
type InputBoxType = {
  name: string;
  type: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  max_length?: number;
};

function InputBox1(props: InputBoxType) {
  return (
    <input
      name={props.name}
      className={styles.input}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      maxLength={props.max_length}
    />
  );
}

export default InputBox1;
