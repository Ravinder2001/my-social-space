import React, { ChangeEvent } from "react";
import styles from "./styles.module.scss";
type InputBoxType = {
  name: string;
  type: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

function InputBox1(props: InputBoxType) {
  return (
    <input
      name={props.name}
      className={styles.input}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default InputBox1;
