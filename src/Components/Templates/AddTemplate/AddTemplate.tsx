import { useSelector } from "react-redux";

import styles from "./styles.module.scss";
import AddPostBox from "../../Organisms/AddPostBox/AddPostBox";
import SVGIcons from "../../../Assets/SVG/SvgIcon";
type props = {
  isEdit: {
    edit: boolean;
    post_id: string;
  };
};
function AddTemplate(props: props) {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <SVGIcons name="Home_Background" />
      </div>
      <div className={styles.main_box}>
        <AddPostBox isEdit={props.isEdit} />
      </div>
    </div>
  );
}

export default AddTemplate;
