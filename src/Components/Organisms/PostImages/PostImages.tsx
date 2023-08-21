import React from "react";
import styles from "./style.module.scss";
import { Carousel } from "react-responsive-carousel";
type PostProps = {
  images: string[];
};

function PostImages({ images }: PostProps) {
  return (
    <div className={styles.container}>
      <Carousel showThumbs={false}>
        {images.map((image) => (
          <img src={image} alt="carosuel_image" className={styles.image} />
        ))}
      </Carousel>
    </div>
  );
}

export default PostImages;
