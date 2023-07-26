import React from "react";
import styles from "./styles.module.scss";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setIndex } from "../../../store/Slices/DrawerSlice";

type DrawerPropsTypes = {
  IconName: string;
  IconColor: string;
  IconSize: number;
  label: string;
  index: number;
  handleClick: () => void;
};

function DrawerItems(props: DrawerPropsTypes) {
  const dispatch = useDispatch();
  const Index = useSelector((state: RootState) => state.DrawerRedcuer.index);
  const handleClick = () => {

      dispatch(setIndex(props.index));
    
    props.handleClick();
  };
  return (
    <div
      className={Index === props.index ? styles.selected_box : styles.box}
      onClick={handleClick}
    >
      <div className={styles.icon}>
        <LucideIcons
          name={props.IconName}
          color={props.IconColor}
          size={props.IconSize}
        />
      </div>
      <div className={styles.text}>{props.label}</div>
    </div>
  );
}

export default DrawerItems;
