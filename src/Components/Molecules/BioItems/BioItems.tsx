import React from "react";
import styles from "./styles.module.scss";
import LucideIcons from "../../../Utils/Icons/LucideIcons";

type BioType = {
  icon: string;
  color: string;
  text: string;
};
function BioItems(props: BioType) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <LucideIcons name={props.icon} color={props.color} size={20} />
      </div>
      <div className={styles.text}>{props.text}</div>
    </div>
  );
}

export default BioItems;
