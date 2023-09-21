import { ChangeEvent, FocusEventHandler, KeyboardEventHandler } from "react";

import styles from "./style.module.scss";

type InputBoxType = {
  name?: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  max_length?: number;
  placeholder?: string;
  handleKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  handleKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  handleBlur?: FocusEventHandler<HTMLInputElement>;
};

function MessageInput(props: InputBoxType) {
  return (
    <input
      name={props.name}
      className={styles.input}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      maxLength={props.max_length}
      onKeyDown={props.handleKeyDown}
      onKeyUp={props.handleKeyUp}
      onBlur={props.handleBlur}
      
    />
  );
}

export default MessageInput;
