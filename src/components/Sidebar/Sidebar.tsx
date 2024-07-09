import React, { useState } from "react";
import styles from "./style.module.css";
import LucideIcon from "../../assets/Icons/LucideIcons";
import { Friends_Route, Home_Route, Messages_Route } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  let menu = [
    {
      icon: "Home",
      label: "Home",
      index: 0,
      color: "#2888d2",
      route: Home_Route,
    },
    {
      icon: "Users",
      label: "Friends",
      index: 1,
      color: "#6c28d2",
      route: Friends_Route,
    },
    {
      icon: "MessageCircleMore",
      label: "Messages",
      index: 2,
      color: "orange",
      route: Messages_Route,
    },
    {
      icon: "Bookmark",
      label: "Saved",
      index: 3,
      color: "#28d2b0",
    },
    {
      icon: "User",
      label: "Profile",
      index: 4,
      color: "#c21e65",
    },
    {
      icon: "Settings",
      label: "Settings",
      index: 5,
      color: "#c2861e",
    },
  ];

  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {menu.map((menuItem) => (
        <div
          style={{ backgroundColor: selectedMenu === menuItem.index ? "#e9eaec" : "transparent" }}
          className={styles.box}
          key={menuItem.index}
          onClick={() => {
            setSelectedMenu(menuItem.index);
            navigate(menuItem.route ?? "/");
          }}
        >
          <LucideIcon name={menuItem.icon} color={menuItem.color} />
          <div className={styles.label}>{menuItem.label}</div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
