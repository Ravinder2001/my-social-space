import { useSelector } from "react-redux";
import Logo from "../../../Assets/Images/Logo_2.png";
import SVGIcons from "../../../Assets/SVG/SvgIcon";

import styles from "./styles.module.scss";
import { RootState } from "../../../store/store";

function LoginPageLogo() {
  const Username = useSelector((state: RootState) => state.UserReducer.name);
  const Name = Username.split(" ")[0];
  return (
    <div className={styles.container}>
      <div className={styles.svg_logo}>
        <SVGIcons name="Login_Background" />
      </div>
      <div className={styles.logo}>
        <div className={styles.welcome}>
          <div>Welcome back,</div>
          <div className={styles.name}>{Name}</div>
        </div>
        <div className={styles.img}>
          <img src={Logo} alt="" width="100%" height="100%" />
        </div>
        <div className={styles.heading}>My Social Space</div>
        <div className={styles.sub_heading}>Connect, Share and Explore</div>
      </div>
    </div>
  );
}

export default LoginPageLogo;
