import { useSelector } from "react-redux";

import BioHeader from "../../Molecules/BioHeader/BioHeader";
import BioAbout from "../../Molecules/BioAbout/BioAbout";

import { RootState } from "../../../store/store";

import styles from "./styles.module.scss";

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
