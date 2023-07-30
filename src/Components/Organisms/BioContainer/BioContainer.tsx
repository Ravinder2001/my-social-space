import React from "react";
import styles from "./styles.module.scss";
import BioHeader from "../../Molecules/BioHeader/BioHeader";
import BioItems from "../../Molecules/BioItems/BioItems";
import BioAbout from "../../Molecules/BioAbout/BioAbout";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
function BioContainer() {
  const Theme = useSelector((state: RootState) => state.UserReducer.theme);
  return (
    <div
      className={`${styles.container} ${Theme === "dark" ? styles.dark_container : styles.light_container}`}
    >
      <BioHeader />
      <BioAbout />
    </div>
  );
}

export default BioContainer;
