import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "../Image/Image";
import styles from "./style.module.css"

type Props = {
  images: string[];
};

function ImageCarousel(props: Props) {
  return (
    <Carousel className={styles.container} showThumbs={false}>
      {props.images.map((item, index) => (
        <Image src={item} key={index} />
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
