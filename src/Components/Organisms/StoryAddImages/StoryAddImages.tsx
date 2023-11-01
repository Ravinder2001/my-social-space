import React, { Dispatch, SetStateAction, useRef, ChangeEvent } from "react";
import styles from "./style.module.scss";

type props = {
  setImages: Dispatch<SetStateAction<FileList | undefined>>;
};
function StoryAddImages(props: props) {
  const imgRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      props.setImages(event.target.files);
    }
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <input type="file" multiple ref={imgRef} style={{ display: "none" }} onChange={handleChange} />
      <div className={styles.btn}>Select Images for Your Story</div>
    </div>
  );
}

export default StoryAddImages;
