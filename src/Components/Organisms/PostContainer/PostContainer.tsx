import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PostHeader from "../../Molecules/PostHeader/PostHeader";
import PostCaption from "../../Molecules/PostCaption/PostCaption";
import PostImages from "../../Molecules/PostImages/PostImages";
import Data from "../../../data.json";
import PostImpression from "../../Molecules/PostImpression/PostImpression";
import PostCommentBox from "../../Molecules/PostCommentBox/PostCommentBox";

import { RootState } from "../../../store/store";

import styles from "./styles.module.scss";
import GetProfilePosts from "../../../APIs/GetProfilePosts";
import PostModal from "../PostModal/PostModal";

type DataType = {
  user_name: string;
  profile_picture: string;
  post_id: string;
  caption: string;
  created_at: string;
  images: { src: string; width: number; height: number }[];
};
function PostContainer() {
  const User = useSelector((state: RootState) => state.UserReducer);

  const [data, setData] = useState<DataType[]>([]);
  const [open, setOpen] = useState<{
    open: boolean;
    post_id: string;
  }>({
    open: false,
    post_id: "",
  });

  const handleModal = (post_id: string) => {
    setOpen({
      open: !open.open,
      post_id: post_id ?? "",
    });
  };

  const FetchPost = async () => {
    const res = await GetProfilePosts(User.id);
    if (res?.status === 200) {
      setData(res.data);
    }
  };
  useEffect(() => {
    FetchPost();
  }, []);
  return (
    <div className={styles.container}>
      {data.map((post) => (
        <div
          key={post.post_id}
          className={`${styles.post_box} ${
            User.theme == "dark" ? styles.dark_post_box : styles.light_post_box
          }`}
        >
          <PostHeader
            profile_picture={post.profile_picture}
            username={post.user_name}
            created_at={post.created_at}
          />
          <PostCaption caption={post.caption} />
          <PostImages Images={post.images} />
          <PostImpression post_id={post.post_id} handleModal={handleModal} />
          <PostCommentBox post_id={post.post_id} />
        </div>
      ))}
      <PostModal
        handleModal={handleModal}
        open={open.open}
        post_id={open.post_id}
      />
    </div>
  );
}

export default PostContainer;
