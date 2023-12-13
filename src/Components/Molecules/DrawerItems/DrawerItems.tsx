import { useDispatch, useSelector } from "react-redux";

import LucideIcons from "../../../Utils/Icons/LucideIcons";

import { RootState } from "../../../store/store";
import { setIndex } from "../../../store/Slices/DrawerSlice";

import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";

type DrawerPropsTypes = {
  IconName: string;
  IconColor: string;
  IconSize: number;
  label: string;
  index: number;
  handleClick: () => void;
  isSelected: Boolean;
};

function DrawerItems(props: DrawerPropsTypes) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setIndex(props.index));

    props.handleClick();
  };
  return (
    <div className={props.isSelected ? styles.selected_box : styles.box} onClick={handleClick}>
      <div className={styles.icon}>
        <LucideIcons name={props.IconName} color={props.IconColor} size={props.IconSize} />
      </div>
      <div className={styles.text}>{props.label}</div>
    </div>
  );
}

export default DrawerItems;
