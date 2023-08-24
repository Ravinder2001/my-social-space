import React from "react";
import styles from "./style.module.scss";
import SelfStoryBox from "../../Molecules/SelfStoryBox/SelfStoryBox";
import UserStoryBox from "../../Molecules/UserStoryBox/UserStoryBox";
import Carousel from "react-multi-carousel";
function StoryBox() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 9,
      paritialVisibilityGutter: 60,
      slidesToSlide: 3 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30,
    },
  };
  return (
    <div className={styles.container}>
      <SelfStoryBox />
      <div className={styles.user_con}>
        <Carousel responsive={responsive} className={styles.carousel}>
          {[1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 3, 4, 2, 3, 3, 3].map(
            (item) => (
              <UserStoryBox />
            )
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default StoryBox;
