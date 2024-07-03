import React, { useState } from "react";
import styles from "./style.module.css";
import LucideIcon from "../../assets/Icons/LucideIcons";
function Sidebar() {
  let menu = [
    {
      icon: "Home",
      label: "Home",
      index: 0,
      color: "#2888d2",
    },
    {
      icon: "Users",
      label: "Friends",
      index: 1,
      color: "#6c28d2",
    },
    {
      icon: "Bookmark",
      label: "Saved",
      index: 2,
      color: "#28d2b0",
    },
    {
      icon: "User",
      label: "Profile",
      index: 3,
      color: "#c21e65",
    },
    {
      icon: "Settings",
      label: "Settings",
      index: 4,
      color: "#c2861e",
    },
  ];

  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  return (
    <div className={styles.container}>
      {menu.map((menuItem) => (
        <div
          style={{ backgroundColor: selectedMenu === menuItem.index ? "#e9eaec" : "transparent" }}
          className={styles.box}
          key={menuItem.index}
          onClick={() => setSelectedMenu(menuItem.index)}
        >
          <LucideIcon name={menuItem.icon} color={menuItem.color} />
          <div className={styles.label}>{menuItem.label}</div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
