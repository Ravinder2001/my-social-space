import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import styles from "./style.module.scss";
import PostModalImages from "../PostModalImages/PostModalImages";
import PostImpression from "../PostImpression/PostImpression";
import PostAddComments from "../PostAddComments/PostAddComments";
import PostCommentsList from "../PostCommentsList/PostCommentsList";
import GetSinglePostById from "../../../APIs/GetSinglePostById";
import { Request_Succesfull } from "../../../Utils/Constant";
import GetPostComments from "../../../APIs/GetPostComments";
type props = {
  open: { open: boolean; post_id: string };
  handleModal: () => void;
};

type dataType = {
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
type commentType = {
  user_name: string;
  image_url: string;
  content: string;
  created_at: string;
  comment_id: number;
  editable: boolean;
};
const PostModal = (props: props) => {
  const { open, handleModal } = props;
  const [data, setData] = useState<dataType | undefined>(undefined);
  const [comments, setComments] = useState<commentType[]>([]);

  const FetchPost = async () => {
    const res = await GetSinglePostById(open.post_id);
    if (res?.status == Request_Succesfull) {
      setData(res.data);
    }
  };
  const FetchComments = async () => {
    const res = await GetPostComments(open.post_id);
    if (res?.status == Request_Succesfull) {
      setComments(res.data);
    }
  };

  useEffect(() => {
    if (open.open && open.post_id != "") {
      FetchPost();
      FetchComments();
    }
  }, [open.post_id]);
  return (
    <Modal
      // title="Post"
      open={open.open && open.post_id != ""}
      onOk={handleModal}
      onCancel={handleModal}
      footer={null}
      width={1000}
      centered
    >
      {data ? (
        <div className={styles.container}>
          <div className={styles.left_box}>
            <PostModalImages data={data} editable={data.editable} />
          </div>
          <div className={styles.right_box}>
            <PostImpression
              user_like={data.user_like}
              count={data.likes_count}
              privacy={{ like: data.like_allowed, share: data.share_allowed }}
              post_id={data.post_id}
              open={open.open}
            />
            <PostCommentsList
              FetchComments={FetchComments}
              data={comments}
              editable={data.editable}
            />
            {data.comment_allowed && (
              <PostAddComments
                post_id={data.post_id}
                open={open.open}
                FetchComments={FetchComments}
              />
            )}
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default PostModal;
