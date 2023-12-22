import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import SelfStoryBox from "../../Molecules/SelfStoryBox/SelfStoryBox";
import UserStoryBox from "../../Molecules/UserStoryBox/UserStoryBox";
import Carousel from "react-multi-carousel";
import GetAllStory from "../../../APIs/GetAllStory";
import { Request_Succesfull } from "../../../Utils/Constant";
import GetStoryByUserId from "../../../APIs/GetStoryByUserId";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type props = {
  handleModal: () => void;
  setStoryModalOpen: Dispatch<
    SetStateAction<{
      status: boolean;
      data: {
        profile_picture: string;
        username: string;
        user_id: string;
        story: { id: number; story_image: string; song: string; start_time: number; end_time: number; created_at: string }[];
      };
    }>
  >;
  flag: boolean;
};

type StoryType = {
  profile_picture: string;
  username: string;
  user_id: string;
  editable?: boolean;
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
  const User = useSelector((state: RootState) => state.UserReducer);

  const [AllStory, setAllStory] = useState<StoryType[]>([]);

  const FetchAllStory = async () => {
    const res = await GetAllStory();
    if (res?.status == Request_Succesfull) {
      setAllStory((prev) => [...prev, ...res?.data]);
    }
  };
  const FetchStoryByUserId = async () => {
    const res = await GetStoryByUserId(User.id);
    if (res?.status == Request_Succesfull) {
      if (res.data.length) {
        setAllStory([{ profile_picture: User.image, username: User.name, user_id: User.id, story: res.data, editable: true }]);
      }
      FetchAllStory();
    }
  };

  const handleClick = (data: any) => {
    props.setStoryModalOpen({ data: data, status: true });
  };

  useEffect(() => {
    FetchStoryByUserId();
  }, [props.flag]);
  return (
    <div className={styles.container}>
      <SelfStoryBox handleModal={props.handleModal} />
      <div className={styles.user_con}>
        <Carousel responsive={responsive} className={styles.carousel}>
          {AllStory.map((item) => (
            <UserStoryBox key={item.user_id} data={item} handleClick={handleClick} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default StoryBox;
