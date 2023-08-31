import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import posts from "../../../Assets/Images/posts.png";
import friends from "../../../Assets/Images/friends.png";
import work from "../../../Assets/Images/work.png";
import location from "../../../Assets/Images/location.png";
import time from "../../../Assets/Images/time.png";
import edit from "../../../Assets/Images/edit.png";
import AddProfilePictureModal from "../AddProfilePictureModal/AddProfilePictureModal";
import UserImage from "../../Atoms/UserImage/UserImage";
import GetProfileData from "../../../APIs/GetProfileData";
import { Request_Succesfull } from "../../../Utils/Constant";
type headerProps = {
  User: {
    id: string;
    name: string;
    image: string;
    user: boolean;
    theme: string;
  };
};

function ProfileHeader(props: headerProps) {
  const { image } = props.User;
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<{ location: string; job: string }>({
    location: "",
    job: "",
  });

  const handleModal = () => {
    setOpen(!open);
  };
  const FetchProfileData = async () => {
    const res = await GetProfileData();
    if (res?.status == Request_Succesfull) {
      setData(res?.data);
    }
  };
  useEffect(() => {
    if (!open) {
      console.log("calling")
      FetchProfileData();
    }
  }, [open]);
  return (
    <div className={styles.container}>
      <div className={styles.user_image}>
        <UserImage />
      </div>
      <div className={styles.menu}>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={posts} alt="profile_icon" />
          </div>
          <div className={styles.text}>90</div>
        </div>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={friends} alt="profile_icon" />
          </div>
          <div className={styles.text}>1000</div>
        </div>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={work} alt="profile_icon" />
          </div>
          <div className={styles.text}>
            {data?.job == "" ? "Not Available" : data?.job}
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={location} alt="profile_icon" />
          </div>
          <div className={styles.text}>
            {data?.location == "" ? "Not Available" : data?.location}
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={time} alt="profile_icon" />
          </div>
          <div className={styles.text}>Joined from March</div>
        </div>
        <div className={`${styles.box} ${styles.edit}`} onClick={handleModal}>
          <div className={styles.icon}>
            <img src={edit} alt="profile_icon" />
          </div>
          <div className={styles.text}>Edit</div>
        </div>
      </div>
      {open && <AddProfilePictureModal open={open} setOpen={setOpen} closeable={true} />}
      
    </div>
  );
}

export default ProfileHeader;
