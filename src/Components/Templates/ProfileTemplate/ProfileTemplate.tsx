import React from "react";
import SVGIcons from "../../../Assets/SVG/SvgIcon";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ProfileHeader from "../../Organisms/ProfileHeader/ProfileHeader";
import ProfileBody from "../../Organisms/ProfileBody/ProfileBody";
import { useLocation } from "react-router-dom";

function ProfileTemplate() {

  const User = useSelector((state: RootState) => state.UserReducer);
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <SVGIcons name="Profile_Background" />
      </div>

      <div className={styles.main_container}>
        <ProfileHeader User={User}/>
        <ProfileBody/>
      </div>  
    </div>
  );
}

export default ProfileTemplate;
