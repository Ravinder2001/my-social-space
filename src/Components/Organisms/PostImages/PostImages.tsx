import React from "react";
import styles from "./style.module.scss";
import { Carousel } from "react-responsive-carousel";
type PostProps = {
  images?: { image_url: string }[];
  files?: File[];
};

function PostImages({ images, files }: PostProps) {
  return (
    <div className={styles.container}>
      {images && (
        <Carousel showThumbs={false}>
          {images.map((image) => (
            <img
              src={image.image_url}
              alt="carosuel_image"
              className={styles.image}
            />
          ))}
        </Carousel>
      )}
      {files && (
        <Carousel showThumbs={false}>
          {files.map((image) => (
            <img
              src={URL.createObjectURL(image)}
              alt="carosuel_image"
              className={styles.image}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default PostImages;
