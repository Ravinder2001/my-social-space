import React, { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.scss";

type RememberType = {
  setRememberMeState: Dispatch<SetStateAction<boolean>>;
  RememberMeState: boolean;
};
function RememberMe(props: RememberType) {
  const handleClick = () => {
    props.setRememberMeState(!props.RememberMeState);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <input type="checkbox" name="" id="" className={styles.input} readOnly checked={props.RememberMeState} />
      <div className={styles.text}>Remember Me</div>
    </div>
  );
}

export default RememberMe;
