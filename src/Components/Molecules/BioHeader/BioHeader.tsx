import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
function BioHeader() {
  const Theme = useSelector((state: RootState) => state.UserReducer.theme);
  return (
    <div className={styles.container}>
      <div
        className={styles.heading}
        style={{ color: Theme === "dark" ? "white" : "black" }}
      >
        Intro
      </div>
      <div
        className={styles.bio}
        style={{ color: Theme === "dark" ? "white" : "black" }}
      >
        Life runs on code Software Engineer
      </div>
      <div className={styles.bio_button}>Edit Bio</div>
    </div>
  );
}

export default BioHeader;
