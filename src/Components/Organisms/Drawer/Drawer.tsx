import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import DrawerItems from "../../Molecules/DrawerItems/DrawerItems";
import LogoBox from "../../Molecules/LogoBox/LogoBox";
import ThemeButton from "../../Molecules/ThemeButton/ThemeButton";
import ProfileBox from "../../Molecules/ProfileBox/ProfileBox";

import { Add_Route, Home_Route, LocalStorageKey, Messages_Route, Profile_Route, Request_Succesfull, Settings_Route } from "../../../Utils/Constant";
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
import UpdateUserOnlineStatus from "../../../APIs/UpdateUserOnlineStatus";
import useSelection from "antd/es/table/hooks/useSelection";
type props = {
  isSearchUser: boolean;
  setIsSearchUser: Dispatch<SetStateAction<boolean>>;
};
function Drawer(props: props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const flag = useSelector((state: RootState) => state.DrawerReducer.flag);

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
  const handleNavigate = (id: string) => {
    dispatch(setIndex(5));
    props.setIsSearchUser(false);
    navigate(id);
  };

  useEffect(() => {
    FetchProfilePicture();
  }, [flag]);

  useEffect(() => {
    const StatusOffline = async () => {
      await UpdateUserOnlineStatus(false);
    };
    window.addEventListener("beforeunload", StatusOffline);
    return () => {
      window.removeEventListener("beforeunload", StatusOffline);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      dispatch(setIndex(0));
    });

    return () => {
      document.removeEventListener("visibilitychange", () => {
        dispatch(setIndex(0));
      });
    };
  }, []);

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
              navigate(Home_Route);
              props.setIsSearchUser(false);
            }}
            isSelected={location.pathname == "/"}
          />
          <DrawerItems
            label="Add Post"
            IconColor="#36f202"
            IconName="PlusSquare"
            IconSize={20}
            index={1}
            handleClick={() => {
              navigate(Add_Route);
              props.setIsSearchUser(false);
            }}
            isSelected={location.pathname.includes(Add_Route)}
          />
          <DrawerItems
            label="Search"
            IconColor="#024af2"
            IconName="Search"
            IconSize={20}
            index={2}
            handleClick={() => {
              props.setIsSearchUser(true);
            }}
            isSelected={false}
          />
          <DrawerItems
            label="Messages"
            IconColor="#f2ca02"
            IconName="Message"
            IconSize={20}
            index={3}
            handleClick={() => {
              navigate(Messages_Route);
              props.setIsSearchUser(false);
            }}
            isSelected={location.pathname.includes(Messages_Route)}
          />
          <DrawerItems
            label="Profile"
            IconColor="#33d7b6"
            IconName="User"
            IconSize={20}
            index={4}
            handleClick={() => {
              navigate(Profile_Route);
              props.setIsSearchUser(false);
            }}
            isSelected={location.pathname.includes(Profile_Route)}
          />
          {/* <ThemeButton />
          <DrawerItems
            label="Settings"
            IconColor="#ad15e5"
            IconName="Settings"
            IconSize={20}
            index={5}
            handleClick={() => {
              navigate(Settings_Route);
              props.setIsSearchUser(false);
            }}
            isSelected={location.pathname.includes(Settings_Route)}
          /> */}
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
            isSelected={false}
          />
        </div>
        <AddProfilePictureModal open={open} setOpen={setOpen} closeable={closeable} />
      </div>
      {props.isSearchUser && <SubDrawer handleNavigate={handleNavigate} />}
    </div>
  );
}

export default Drawer;
