import React from "react";
import styles from "./style.module.css";

type Props = {
  onClick?: () => void;
  label: string;
  type: string;
};

function DefaultBtn(props: Props) {
  return (
    <button onClick={props.onClick} className={props.type === "reset" ? styles.resetBtn : styles.submitBtn}>
      {props.label}
    </button>
  );
}

export default DefaultBtn;
