import React from "react";
import styles from "./style.module.css";
import LucideIcon from "../../assets/Icons/LucideIcons";
import Image from "../Image/Image";
import InputBox from "../InputBox/InputBox";
function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logoBox}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png" />
        <div className={styles.title}>My Social Space</div>
      </div>
      <div className={styles.center}>
        <InputBox placeholder="Search for people, friend, pages" isIcon={true} />
      </div>
      <div className={styles.right}>
        <LucideIcon name="MessageCircleMore" size={22} />
        <LucideIcon name="Bell" size={22} />
        <Image src="https://cdn-icons-png.flaticon.com/256/5556/5556468.png" />
      </div>
    </div>
  );
}

export default Navbar;
