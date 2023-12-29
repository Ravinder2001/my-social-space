import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Gallery from "react-photo-gallery";
import PostContainer from "../PostContainer/PostContainer";
import { NewsAPI, Request_Succesfull } from "../../../Utils/Constant";
import GetSelfPosts from "../../../APIs/GetSelfPosts";
import GetAllPost from "../../../APIs/GetAllPost";
import FriendRequestList from "../FriendRequestList/FriendRequestList";
import Loader1 from "../../Atoms/Loader/Loader1/Loader1";
import Loader2 from "../../Atoms/Loader/Loader2/Loader2";
import InfinityLoader from "../../Atoms/Loader/InfinityLoader/InfinityLoader";
import { socket } from "../../../socket";
import axios from "axios";
import NewsContainer from "../NewsContainer/NewsContainer";
import NotificationsContainer from "../NotificationsContainer/NotificationsContainer";
type postData = {
  user_name: string;
  profile_picture: string;
  post_id: string;
  caption: string;
  created_at: string;
  likes_count: string;
  user_like: string;
  images: { image_url: string }[];
  editable: boolean;
  like_allowed: boolean;
  comment_allowed: boolean;
  share_allowed: boolean;
};
function HomeBody() {
  const [data, setData] = useState<postData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const FetchPost = async () => {
    const res = await GetAllPost();
    if (res?.status == Request_Succesfull) {
      setData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    FetchPost();

    return () => {
      socket.offAny();
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.left_box}>
        {/* <FriendRequestList /> */}
        <NotificationsContainer />
      </div>
      <div className={styles.right_box}>
        {loading ? (
          <InfinityLoader />
        ) : (
          <>
            {data.map((post) => (
              <PostContainer key={post.post_id} Data={post} />
            ))}
          </>
        )}
      </div>
      <div className={styles.suggest}>
        <NewsContainer />
      </div>
    </div>
  );
}

export default HomeBody;
