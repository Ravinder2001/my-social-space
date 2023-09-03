import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./style.module.scss";
import SearchInput from "../../Atoms/InputBox/SearchInput/SearchInput";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import GetAllUsers from "../../../APIs/GetAllUsers";
import { Request_Succesfull } from "../../../Utils/Constant";
import UserImage from "../../Atoms/UserImage/UserImage";


function NavBar() {


  return (
    <div className={styles.container}>
      
      <div className={styles.right_box}>
        <LucideIcons name="Bell" />
        <LucideIcons name="Users" />
      </div>
    </div>
  );
}

export default NavBar;
