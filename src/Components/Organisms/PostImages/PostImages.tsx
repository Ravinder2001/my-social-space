import React from "react";
import styles from "./style.module.scss";
import { Carousel } from "react-responsive-carousel";
type PostProps = {
  images: { image_url: string }[];
};

function PostImages({ images }: PostProps) {
  return (
    <div className={styles.container}>
      <Carousel showThumbs={false}>
        {images.map((image) => (
          <img
            src={image.image_url}
            alt="carosuel_image"
            className={styles.image}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default PostImages;
