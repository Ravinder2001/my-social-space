import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import SelfStoryBox from "../../Molecules/SelfStoryBox/SelfStoryBox";
import UserStoryBox from "../../Molecules/UserStoryBox/UserStoryBox";
import Carousel from "react-multi-carousel";
import GetAllStory from "../../../APIs/GetAllStory";
import { Request_Succesfull } from "../../../Utils/Constant";

type props = {
  handleModal: () => void;
};

type StoryType = {
  profile_picture: string;
  user_id: string;
  story: [{ id: number; story_image: string; song: string; start_time: number; end_time: number; created_at: string }];
};
function StoryBox(props: props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 9,
      paritialVisibilityGutter: 60,
      slidesToSlide: 3,
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

  const [AllStory, setAllStory] = useState<StoryType[]>([]);

  const FetchAllStory = async () => {
    const res = await GetAllStory();
    if (res?.status == Request_Succesfull) {
      setAllStory(res?.data);
    }
  };

  useEffect(() => {
    FetchAllStory();
  }, []);
  return (
    <div className={styles.container}>
      <SelfStoryBox handleModal={props.handleModal} />
      <div className={styles.user_con}>
        <Carousel responsive={responsive} className={styles.carousel}>
          {AllStory.map((item) => (
            <UserStoryBox key={item.user_id} data={item} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default StoryBox;
