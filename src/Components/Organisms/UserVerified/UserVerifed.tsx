import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import SVGIcons from "../../../Assets/SVG/SvgIcon";
import { useNavigate } from "react-router-dom";
function UserVerifed() {
  const navigate = useNavigate();
  const User = useSelector((state: RootState) => state.UserReducer);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
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
