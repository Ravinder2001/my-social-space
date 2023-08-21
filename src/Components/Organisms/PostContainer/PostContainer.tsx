import React, { useState } from "react";
import styles from "./style.module.scss";
import PostHeader from "../PostHeader/PostHeader";
import PostCaption from "../PostCaption/PostCaption";
import PostImages from "../PostImages/PostImages";
import PostImpression from "../PostImpression/PostImpression";
import PostAddComments from "../PostAddComments/PostAddComments";
import PostModal from "../PostModal/PostModal";

type props = {
  Data: {
    user_name: string;
    profile_picture: string;
    post_id: string;
    caption: string;
    created_at: string;
    images: { image_url: string }[];
    editable: boolean;
  };
};
function PostContainer(props: props) {
  const { Data } = props;
  const [ModalStatus, setModalStatus] = useState<{
    open: boolean;
    post_id: string;
  }>({
    open: false,
    post_id: "",
  });
  const handleModal = (e?: string) => {
    setModalStatus({
      open: !ModalStatus.open,
      post_id: e ?? "",
    });
  };
  return (
    <div className={styles.container}>
      <PostHeader
        user_name={Data.user_name}
        profile_picture={Data.profile_picture}
        created_at={Data.created_at}
        editable={Data.editable}
      />
      <PostCaption Caption={Data.caption} />
      <PostImages images={Data.images} />
      <PostImpression
        handleModal={handleModal}
        post_id={Data.post_id}
        open={ModalStatus.open}
      />
      <PostAddComments post_id={Data.post_id} open={ModalStatus.open} />
      <PostModal open={ModalStatus} handleModal={handleModal} />
    </div>
  );
}

export default PostContainer;
