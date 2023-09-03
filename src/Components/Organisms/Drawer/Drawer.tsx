import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DrawerItems from "../../Molecules/DrawerItems/DrawerItems";
import LogoBox from "../../Molecules/LogoBox/LogoBox";
import ThemeButton from "../../Molecules/ThemeButton/ThemeButton";
import ProfileBox from "../../Molecules/ProfileBox/ProfileBox";

import { LocalStorageKey, Request_Succesfull } from "../../../Utils/Constant";
import { AddPicture, Logout } from "../../../store/Slices/UserSlice";
import { setIndex } from "../../../store/Slices/DrawerSlice";

import styles from "./styles.module.scss";
import AddProfilePictureModal from "../AddProfilePictureModal/AddProfilePictureModal";
import GetProfilePicture from "../../../APIs/GetProfilePicture";
import { RootState } from "../../../store/store";
import SVGIcons from "../../../Assets/SVG/SvgIcon";
import invalid_user from "../../../Assets/Images/invalid_user.png";
import { boolean } from "yup";
import SubDrawer from "../SubDrawer/SubDrawer";
type props = {
  isSearchUser: boolean;
  setIsSearchUser: Dispatch<SetStateAction<boolean>>;
};
function Drawer(props: props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User_id = useSelector((state: RootState) => state.UserReducer.id);

  const [open, setOpen] = useState(false);
  const [closeable, setCloseable] = useState(true);
  const FetchProfilePicture = async () => {
    const image = await GetProfilePicture();

    if (image?.status === Request_Succesfull) {
      if (image?.data?.length) {
        dispatch(AddPicture(image.data));
      } else {
        dispatch(AddPicture(invalid_user));
        setOpen(true);
        setCloseable(image.closeable);
      }
    }
  };
  useEffect(() => {
    FetchProfilePicture();
  }, [User_id]);
  return (
    <div className={styles.container}>
      <div className={styles.drawer}>
        <div className={styles.background}>
          <SVGIcons name="Drawer_Background" />
        </div>
        <div className={styles.header_items}>
          <LogoBox />
          <ProfileBox />
          <DrawerItems
            label="Home"
            IconColor="#df3096"
            IconName="Home"
            IconSize={20}
            index={0}
            handleClick={() => {
              navigate("/");
              props.setIsSearchUser(false);
            }}
          />
          <DrawerItems
            label="Add Post"
            IconColor="#36f202"
            IconName="PlusSquare"
            IconSize={20}
            index={2}
            handleClick={() => {
              navigate("/add");
              props.setIsSearchUser(false);
            }}
          />
          <DrawerItems
            label="Search"
            IconColor="#024af2"
            IconName="Compass"
            IconSize={20}
            index={3}
            handleClick={() => {
              props.setIsSearchUser(true);
            }}
          />
          <DrawerItems
            label="Messages"
            IconColor="#f2ca02"
            IconName="Message"
            IconSize={20}
            index={4}
            handleClick={() => {
              navigate("/messages");
              props.setIsSearchUser(false);
            }}
          />
          <DrawerItems
            label="Profile"
            IconColor="#33d7b6"
            IconName="User"
            IconSize={20}
            index={5}
            handleClick={() => {
              navigate("/profile");
              props.setIsSearchUser(false);
            }}
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
        <AddProfilePictureModal
          open={open}
          setOpen={setOpen}
          closeable={closeable}
        />
      </div>
      {props.isSearchUser && <SubDrawer  />}
    </div>
  );
}

export default Drawer;
