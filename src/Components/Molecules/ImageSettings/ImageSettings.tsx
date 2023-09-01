import React from "react";
import styles from "./style.module.scss";
import DefaultToogle from "../../Atoms/ToogleButton/DefaultToogle/DefaultToogle";
import SelectBox from "../../Atoms/SelectBox/SelectBox";
import DateAndTimePicker from "../../Atoms/DateAndTimePicker/DateAndTimePicker";
type ImageProps = {
  handlePost: () => Promise<void>;
};
function ImageSettings(props: ImageProps) {
  const Visibility = [
    { value: "Public", label: "Public" },
    { value: "Friends", label: "Friends" },
    { value: "Private", label: "Private" },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Post Privacy</div>
      <div className={styles.option_box}>
        <div className={styles.row}>
          <div className={styles.label}>Allow Users to Comment</div>
          <div>
            <DefaultToogle />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Allow Users to Like</div>
          <div>
            <DefaultToogle />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Allow Users to Share</div>
          <div>
            <DefaultToogle />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Visibility</div>
          <div>
            <SelectBox options={Visibility} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Show Only to</div>
          <div>
            <DefaultToogle />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Hide from Certain Users</div>
          <div>
            <DefaultToogle />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Save Settings</div>
          <div>
            <DefaultToogle />
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
      </div>
      <button className={styles.btn} onClick={props.handlePost}>
        Post
      </button>
    </div>
  );
}

export default ImageSettings;
