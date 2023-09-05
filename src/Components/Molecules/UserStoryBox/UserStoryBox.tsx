import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ReactIcons from "../../../Utils/Icons/ReactIcons";
import axios from "axios";
function UserStoryBox() {
  let user =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img
          src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.user_img_box}>
        <img src={user} alt="" className={styles.user_img} />
      </div>
      {/* <div className={styles.name}>Ravinder Singh Negi</div> */}
    </div>
  );
}

export default UserStoryBox;
