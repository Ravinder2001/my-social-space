import { useSelector } from "react-redux";

import LoginPageLogo from "../../Molecules/LoginPageLogo/LoginPageLogo";
import LoginNavBar from "../../Organisms/NavBar/LoginNavBar";
import LoginBox from "../../Organisms/LoginBox/LoginBox";
import SignUpBox from "../../Organisms/SignUpBox/SignUpBox";
import About from "../../Organisms/About/About";
import Logo from "../../../Assets/Images/Logo_3.png";

import { RootState } from "../../../store/store";

import styles from "./styles.module.scss";

function LoginTemplate() {
  const SelectedIndex = useSelector(
    (state: RootState) => state.LoginPageReducer.index
  );
  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <LoginPageLogo />
      </div>
      <div className={styles.right_container}>
        <LoginNavBar />
        <div className={styles.content_box}>
          {SelectedIndex === "0" && <LoginBox />}
          {SelectedIndex === "1" && <SignUpBox />}
          {SelectedIndex === "2" && <About />}
          {SelectedIndex === "3" && <div>Contact Us Page</div>}
        </div>

        <div className={styles.bottom_box}>
          <div>
            <img src={Logo} alt="" width="70px" height="30px" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginTemplate;
