import Logo_1 from "../../../Assets/Images/Logo_2.png";
import LogoText from "../../Atoms/LogoText/LogoText";

import styles from "./styles.module.scss";

function LogoBox() {
  return (
    <div className={styles.logo_box}>
      <img src={Logo_1} alt="" className={styles.logo_img} />
      <div className={styles.logo_text}>
        <LogoText />
      </div>
    </div>
  );
}

export default LogoBox;
