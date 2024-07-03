import React from "react";
import styles from "./style.module.css";
import LucideIcon from "../../assets/Icons/LucideIcons";

type props = {
  type?: string;
  placeholder: string;
  isIcon?: boolean;
};
function InputBox(props: props) {
  return (
    <div className={styles.container}>
      {props.isIcon ? <LucideIcon name="Search" size={18} /> : null}

      <input className={styles.input} type={props.type ?? "text"} placeholder={props.placeholder} />
    </div>
  );
}

export default InputBox;
