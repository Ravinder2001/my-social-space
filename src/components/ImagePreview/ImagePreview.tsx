import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import styles from "./style.module.css"

type Props = {
  images: string[];
};

function ImagePreview(props: Props) {
  return (
    <PhotoProvider>
      <div className={styles.container}>
        {props.images.map((item, index) => (
          <PhotoView key={index} src={item}>
            <img src={item} alt="" className={styles.image} />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}

export default ImagePreview;
