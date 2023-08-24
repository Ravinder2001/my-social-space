import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ReactIcons from "../../../Utils/Icons/ReactIcons";
import { Request_Succesfull } from "../../../Utils/Constant";
import GetPostComments from "../../../APIs/GetPostComments";
import { formatTime } from "../../../Utils/Function";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import RemoveComment from "../../../APIs/RemoveComment";
type commentType = {
  data: {
    user_name: string;
    image_url: string;
    content: string;
    created_at: string;
    comment_id: number;
    editable: boolean;
  }[];
  editable: boolean;
  FetchComments: () => void;
};
function PostCommentsList(props: commentType) {
  const handleDelete = async (id: number) => {
    const res = await RemoveComment(id);
    if (res?.status == Request_Succesfull) {
      props.FetchComments();
    }
  };
  return (
    <div className={styles.container}>
      {props.data.map((comment) => {
        let gif = comment.content.includes("giphy.com");
        return (
          <div className={styles.box}>
            <div className={styles.img_box}>
              <img src={comment.image_url} alt="" className={styles.img} />
            </div>
            <div className={styles.content_box}>
              <div className={styles.left_box}>
                <div className={styles.name}>{comment.user_name}</div>
                {gif ? (
                  <img src={comment.content} alt="" className={styles.gif} />
                ) : (
                  <div className={styles.content}>{comment.content}</div>
                )}

                <div className={styles.time}>
                  {formatTime(comment.created_at)}
                </div>
              </div>
              <div className={styles.right_box}>
                {comment.editable ? (
                  <div
                    className={styles.icon}
                    onClick={() => handleDelete(comment.comment_id)}
                  >
                    <ReactIcons name="MdDelete" size={18} />
                  </div>
                ) : null}

                <div className={styles.icon}>
                  <LucideIcons name="Heart" color="#494849" size={18} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostCommentsList;
