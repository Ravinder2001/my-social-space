import React from "react";
import styles from "./styles.module.scss";
import DrawerItems from "../../Molecules/DrawerItems/DrawerItems";
import LogoBox from "../../Molecules/LogoBox/LogoBox";
import { useNavigate } from "react-router-dom";
import { LocalStorageKey } from "../../../Utils/Constant";
import { useDispatch } from "react-redux";
import { Logout } from "../../../store/Slices/UserSlice";
import { setIndex } from "../../../store/Slices/DrawerSlice";
import ProfileBox from "../../Molecules/ProfileBox/ProfileBox";
import ThemeButton from "../../Molecules/ThemeButton/ThemeButton";
function Drawer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.header_items}>
        <LogoBox />
        <ProfileBox />
        <DrawerItems
          label="Home"
          IconColor="#df3096"
          IconName="Home"
          IconSize={20}
          index={0}
          handleClick={() => navigate("/")}
        />
        <DrawerItems
          label="Add Post / Status"
          IconColor="#36f202"
          IconName="PlusSquare"
          IconSize={20}
          index={2}
          handleClick={() => navigate("/add")}
        />
        <DrawerItems
          label="Discover"
          IconColor="#024af2"
          IconName="Compass"
          IconSize={20}
          index={3}
          handleClick={() => navigate("/discover")}
        />
        <DrawerItems
          label="Messages"
          IconColor="#f2ca02"
          IconName="Message"
          IconSize={20}
          index={4}
          handleClick={() => navigate("/messages")}
        />
        <DrawerItems
          label="Profile"
          IconColor="#33d7b6"
          IconName="User"
          IconSize={20}
          index={5}
          handleClick={() => navigate("/profile")}
        />
        <ThemeButton />
      </div>
      <div className={styles.footer_items}>
        <DrawerItems
          label="Logout"
          IconColor="#ee301b"
          IconName="LogOut"
          IconSize={20}
          handleClick={() => {
            localStorage.removeItem(LocalStorageKey);
            dispatch(Logout());
            dispatch(setIndex(0));
            navigate("/login");
          }}
          index={-1}
        />
      </div>
    </div>
  );
}

export default Drawer;
