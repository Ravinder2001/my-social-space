import { useSelector } from "react-redux";

import styles from "./styles.module.scss";
import AddPostBox from "../../Organisms/AddPostBox/AddPostBox";

function AddTemplate() {
  return (
    <div className={styles.container}>
      
      <div className={styles.left_box}>
        <AddPostBox />
      </div>
      <div className={styles.right_box}>
        <AddPostBox />
      </div>
    </div>
  );
}

export default AddTemplate;
