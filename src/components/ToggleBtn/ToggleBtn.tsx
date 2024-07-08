import React, { ChangeEvent } from "react";
import styles from "./style.module.css";

type Props = {
  isChecked: boolean;
  onChange: (e:ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

function ToggleBtn(props: Props) {
  return (
    <label className={styles.switch}>
      <input className={styles.input} type="checkbox" checked={props.isChecked} onChange={props.onChange} name={props.name} />
      <div className={styles.slider}></div>
      <div className={styles.slider_card}>
        <div className={`${styles.slider_card_face} ${styles.slider_card_front}`}></div>
        <div className={`${styles.slider_card_face} ${styles.slider_card_back}`}></div>
      </div>
    </label>
  );
}

export default ToggleBtn;
