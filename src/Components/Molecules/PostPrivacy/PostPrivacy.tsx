import React, { useState, ChangeEvent } from "react";
import styles from "./style.module.scss";
import DefaultToogle from "../../Atoms/ToogleButton/DefaultToogle/DefaultToogle";
import SelectBox from "../../Atoms/SelectBox/SelectBox";
import DateAndTimePicker from "../../Atoms/DateAndTimePicker/DateAndTimePicker";
type ImageProps = {
  handlePost: () => Promise<void>;
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
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Post Privacy</div>
      <div className={styles.option_box}>
        <div className={styles.row}>
          <div className={styles.label}>Allow Users to Comment</div>
          <div>
            <DefaultToogle
              name="comment"
              value={Values.comment}
              handleChange={handleToogle}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Allow Users to Like</div>
          <div>
            <DefaultToogle
              name="like"
              value={Values.like}
              handleChange={handleToogle}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Allow Users to Share</div>
          <div>
            <DefaultToogle
              name="share"
              value={Values.share}
              handleChange={handleToogle}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Visibility</div>
          <div>
            <SelectBox
              options={VisibilityOptions}
              value={value}
              setVisibilityOptions={setVisibilityOptions}
            />
          </div>
        </div>
        {!edit && (
          <>
            <div className={styles.row}>
              <div className={styles.label}>Show Only to</div>
              <div>{/* <DefaultToogle handleChange={handleToogle} /> */}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Hide from Certain Users</div>
              <div>{/* <DefaultToogle /> */}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Save Settings</div>
              <div>
                {/* <DefaultToogle name="settings" value={Values.settings} /> */}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Schedule Post</div>
              <div>
                <DateAndTimePicker />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Schedule Delete</div>
              <div>
                <DateAndTimePicker />
              </div>
            </div>
          </>
        )}
      </div>
      <button className={styles.btn} onClick={handlePost}>
        Post
      </button>
    </div>
  );
}

export default PostPrivacy;
