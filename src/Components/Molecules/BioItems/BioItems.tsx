import LucideIcons from "../../../Utils/Icons/LucideIcons";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import styles from "./styles.module.scss";

type BioType = {
  icon: string;
  color: string;
  text: string;
};
function BioItems(props: BioType) {
  const Theme = useSelector((state: RootState) => state.UserReducer.theme);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <LucideIcons name={props.icon} color={props.color} size={20} />
      </div>
      <div
        className={styles.text}
        style={{ color: Theme === "dark" ? "white" : "black" }}
      >
        {props.text}
      </div>
    </div>
  );
}

export default BioItems;
