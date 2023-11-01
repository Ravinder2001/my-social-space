import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import SVGIcons from "../../../Assets/SVG/SvgIcon";
import { useNavigate } from "react-router-dom";
import { Add_Route, Home_Route, Messages_Route, Profile_Route, Settings_Route } from "../../../Utils/Constant";
function UserVerifed() {
  const navigate = useNavigate();
  const User = useSelector((state: RootState) => state.UserReducer);
  const DrawerIndex = useSelector((state: RootState) => state.DrawerReducer.index);

  useEffect(() => {
    setTimeout(() => {
      switch (DrawerIndex) {
        case 0:
          navigate(Home_Route);
          break;
        case 1:
          navigate(Add_Route);
          break;
        case 2:
          navigate(Home_Route);
          break;
        case 3:
          navigate(Messages_Route);
          break;
        case 4:
          navigate(Profile_Route);
          break;
        case 5:
          navigate(Settings_Route);
          break;
        default:
          navigate(Home_Route);
          break;
      }
    }, 2000);
  }, []);
  return (
    <div className={styles.main_container}>
      <div className={styles.background}>
        <SVGIcons name="Verify_Background" />
      </div>
      <div className={styles.container}>
        <div className={styles.loading_bar}>
          <img src={User.image} className={styles.image} alt="" />
        </div>
        <div className={styles.name}>{User.name}</div>
      </div>
    </div>
  );
}

export default UserVerifed;
