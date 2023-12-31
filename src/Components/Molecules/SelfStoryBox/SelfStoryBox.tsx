import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { RootState } from "../../../store/store";
import ReactIcons from "../../../Utils/Icons/ReactIcons";
import axios from "axios";
import UserImage from "../../Atoms/UserImage/UserImage";
type props = {
  handleModal: () => void;
};
function SelfStoryBox(props: props) {
  return (
    <div className={styles.container} onClick={props.handleModal}>
      <div className={styles.img_box}>
        <UserImage />
      </div>
      <div className={styles.add_con}>
        <div className={styles.icon}>
          <ReactIcons name="AiOutlinePlus" color="white" size={20} />
        </div>
        <div className={styles.text}>Add Story</div>
      </div>
    </div>
  );
}

export default SelfStoryBox;
