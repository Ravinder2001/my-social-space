import { Carousel } from "react-responsive-carousel";

import styles from "./styles.module.scss";

type CarouselType = {
  images: { post_id: number; width: number; height: number; src: string }[];
};

function CarouselBox(props: CarouselType) {
  console.log(props);
  return (
    <Carousel
      className={styles.container}
      showThumbs={false}
      infiniteLoop
      stopOnHover
      dynamicHeight
      showStatus={false}
      showIndicators={false}
      swipeable
    >
      {props.images.map((item) => (
        <img src={item.src} className={styles.img} alt="" />
      ))}
    </Carousel>
  );
}

export default CarouselBox;
