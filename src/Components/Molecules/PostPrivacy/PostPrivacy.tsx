import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import DefaultToogle from "../../Atoms/ToogleButton/DefaultToogle/DefaultToogle";
import SelectBox from "../../Atoms/SelectBox/SelectBox";
import DateAndTimePicker from "../../Atoms/DateAndTimePicker/DateAndTimePicker";
import { Moment } from "moment";
type ImageProps = {
  handlePost: () => Promise<void>;
  handleEdit: () => Promise<void>;
  edit: boolean;
  Values: {
    comment: boolean;
    like: boolean;
    share: boolean;
  };
  handleToogle: (e: ChangeEvent<HTMLInputElement>) => void;
  VisibilityOptions: { value: string; label: string }[];
  setVisibilityOptions: (newValue: { value: string; label: string }) => void;
  value: { value: string; label: string };
  uploadAt: Moment;
  uploadTill: Moment;
  setUploadAt: Dispatch<SetStateAction<Moment>>;
  setUploadTill: Dispatch<SetStateAction<Moment>>;
};
function PostPrivacy(props: ImageProps) {
  const {
    edit,
    handlePost,
    Values,
    handleToogle,
    VisibilityOptions,
    setVisibilityOptions,
    value,
    handleEdit,
    uploadAt,
    uploadTill,
    setUploadAt,
    setUploadTill,
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Post Privacy</div>
      <div className={styles.option_box}>
        <div className={styles.row}>
          <div className={styles.label}>Allow Users to Comment</div>
          <div>
            <DefaultToogle name="comment" value={Values.comment} handleChange={handleToogle} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Allow Users to Like</div>
          <div>
            <DefaultToogle name="like" value={Values.like} handleChange={handleToogle} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Allow Users to Share</div>
          <div>
            <DefaultToogle name="share" value={Values.share} handleChange={handleToogle} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Visibility</div>
          <div>
            <SelectBox options={VisibilityOptions} value={value} setVisibilityOptions={setVisibilityOptions} />
          </div>
        </div>
        {!edit && (
          <>
            <div className={styles.row}>
              <div className={styles.label}>Schedule Post</div>
              <div>
                <DateAndTimePicker value={uploadAt} setTime={setUploadAt} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Schedule Delete</div>
              <div>
                <DateAndTimePicker value={uploadTill} setTime={setUploadTill} />
              </div>
            </div>
          </>
        )}
      </div>
      {edit ? (
        <button className={styles.btn} onClick={handleEdit}>
          Edit
        </button>
      ) : (
        <button className={styles.btn} onClick={handlePost}>
          Post
        </button>
      )}
    </div>
  );
}

export default PostPrivacy;
