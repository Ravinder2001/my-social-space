import React from "react";
import styles from "./style.module.css";

type ButtonProps = {
  isLoading: boolean;
  buttonText: string;
  type?: "submit" | "reset" | "button";
  onClick: () => void;
};

function ButtonComponent(props: ButtonProps) {
  return (
    <button onClick={props.onClick} type={props.type} className={styles.submitButton} disabled={props.isLoading}>
      {props.isLoading ? <span className={styles.loader}></span> : props.buttonText}
    </button>
  );
}

export default ButtonComponent;
