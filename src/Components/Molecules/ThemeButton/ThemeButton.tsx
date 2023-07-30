import LucideIcons from "../../../Utils/Icons/LucideIcons";
import ThemeToogleButton from "../../Atoms/ThemeToogleButton/ThemeToogleButton";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ToogleTheme } from "../../../store/Slices/UserSlice";

import styles from "./styles.module.scss";

function ThemeButton() {
  const dispatch = useDispatch();
  const Theme = useSelector((state: RootState) => state.UserReducer.theme);
  const handleChange = () => {
    dispatch(ToogleTheme());
  };
  return (
    <div className={styles.box}>
      <div className={styles.icon}>
        <LucideIcons name="Palette" color="#f08c19" size={20} />
      </div>
      <div className={styles.text}>Theme</div>
      <div className={styles.btn}>
        <ThemeToogleButton Theme={Theme} handleChange={handleChange} />
      </div>
    </div>
  );
}

export default ThemeButton;
