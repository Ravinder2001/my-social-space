import React, { ChangeEvent } from "react";
import styles from "./style.module.scss";
type props = {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
function SearchInput(props: props) {
  return (
    <input
      className={styles.input}
      value={props.value}
      onChange={props.handleChange}
      type="text"
      placeholder="Search My Social Space"
    />
  );
}

export default SearchInput;
