import React from "react";
import styles from "./style.module.scss";
type ImageProps = {
  handlePost: () => Promise<void>,
};
function ImageSettings(props: ImageProps) {
  return (
    <div>
      <button className={styles.post} onClick={props.handlePost}>
        Post
      </button>
    </div>
  );
}

export default ImageSettings;
