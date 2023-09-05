import React from "react";
import styles from "./style.module.scss";
import { Carousel } from "react-responsive-carousel";
type PostProps = {
  images: { image_url: string }[];
};

function PostImages({ images }: PostProps) {
  return (
    <Carousel showThumbs={false} className={styles.container}>
      {images.map((image) => (
        <img
          src={image.image_url}
          alt="carosuel_image"
          className={styles.image}
        />
      ))}
    </Carousel>
  );
}

export default PostImages;
