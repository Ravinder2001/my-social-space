import { useSelector } from "react-redux";

import styles from "./styles.module.scss";
import AddPostBox from "../../Organisms/AddPostBox/AddPostBox";
import SVGIcons from "../../../Assets/SVG/SvgIcon";

function AddTemplate() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <SVGIcons name="Home_Background" />
      </div>
      <div className={styles.main_box}>
   
        <AddPostBox />
      </div>
    </div>
  );
}

export default AddTemplate;
