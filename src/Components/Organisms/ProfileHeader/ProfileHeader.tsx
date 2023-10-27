import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import posts from "../../../Assets/Images/posts.png";
import friends from "../../../Assets/Images/friends.png";
import work from "../../../Assets/Images/work.png";
import locationIcon from "../../../Assets/Images/location.png";
import time from "../../../Assets/Images/time.png";
import edit from "../../../Assets/Images/edit.png";
import cancel from "../../../Assets/Images/cancel.png";
import approve from "../../../Assets/Images/approve.png";
import add_friend from "../../../Assets/Images/add_friend.png";
import AddProfilePictureModal from "../AddProfilePictureModal/AddProfilePictureModal";
import UserImage from "../../Atoms/UserImage/UserImage";
import GetProfileData from "../../../APIs/GetProfileData";
import { Request_Succesfull } from "../../../Utils/Constant";
import GetAnotherUserProfileData from "../../../APIs/GetAnotherUserProfileData";
import { useLocation } from "react-router-dom";
import SendFriendRequest from "../../../APIs/SendFriendRequest";
import { message } from "antd";
import DeleteFriendRequest from "../../../APIs/DeleteFriendRequest";
import AcceptFriendRequest from "../../../APIs/AcceptFriendRequest";
import moment from "moment";
import UnFriendModal from "../UnFriendModal/UnFriendModal";
type headerProps = {
  User: {
    id: string;
    name: string;
    image: string;
    user: boolean;
    theme: string;
  };
};

type ProfileDataType = {
  location: string;
  job: string;
  created_at: string;
  post_count: string;
  friend_count: string;
  profile_picture: string;
  name: string;
  isfriends?: string;

  friend_request_sent?: string;
  friend_request_received?: string;
  friend_Request_Id?: string;
};
function ProfileHeader(props: headerProps) {
  const location = useLocation();
  const { image } = props.User;
  const [open, setOpen] = useState<boolean>(false);
  const [unFriendModalOpen, setUnFriendModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<ProfileDataType>({
    location: "",
    job: "",
    name: "",
    created_at: "",
    post_count: "",
    friend_count: "",
    profile_picture: "",
  });

  const handleModal = () => {
    setOpen(!open);
  };
  const SendRequest = async () => {
    let user_id = location.search.split("=")[1];
    const res = await SendFriendRequest(user_id);
    if (res?.status == Request_Succesfull) {
      message.success("Request Send Successfully");
      FetchAnotherUserProfileData(user_id);
    }
  };
  const DeleteRequest = async () => {
    let user_id = location.search.split("=")[1];
    if (data.friend_Request_Id) {
      const res = await DeleteFriendRequest(data.friend_Request_Id);
      if (res?.status == Request_Succesfull) {
        message.success("Request Send Successfully");
        FetchAnotherUserProfileData(user_id);
      }
    }
  };
  const AcceptRequest = async () => {
    let user_id = location.search.split("=")[1];
    if (data.friend_Request_Id) {
      const res = await AcceptFriendRequest(data.friend_Request_Id, user_id);
      if (res?.status == Request_Succesfull) {
        message.success("Request Send Successfully");
        FetchAnotherUserProfileData(user_id);
      }
    }
  };
  const FetchProfileData = async () => {
    const res = await GetProfileData();
    if (res?.status == Request_Succesfull) {
      setData(res?.data);
    }
  };
  const FetchAnotherUserProfileData = async (user_id: string) => {
    const res = await GetAnotherUserProfileData(user_id);
    if (res?.status == Request_Succesfull) {
      setData(res?.data);
    }
  };
  useEffect(() => {
    if (!open) {
      if (location.search.includes("user")) {
        let user_id = location.search.split("=")[1];
        FetchAnotherUserProfileData(user_id);
      } else {
        FetchProfileData();
      }
    }
  }, [location, open]);
  return (
    <div className={styles.container}>
      <div className={styles.user_image}>
        <img src={data.profile_picture} alt="user_image" className={styles.img} />
      </div>
      <div className={styles.main_container}>
        <div className={styles.heading}>{data.name}</div>
        <div className={styles.menu}>
          <div className={styles.left_box}>
            <div className={styles.box}>
              <div className={styles.icon}>
                <img src={posts} alt="profile_icon" width="100%" height="100%" />
              </div>
              <div className={styles.text}>{data.post_count}</div>
            </div>
            <div className={styles.box}>
              <div className={styles.icon}>
                <img src={friends} alt="profile_icon" width="100%" height="100%" />
              </div>
              <div className={styles.text}>{data.friend_count}</div>
            </div>
            <div className={styles.box}>
              <div className={styles.icon}>
                <img src={work} alt="profile_icon" width="100%" height="100%" />
              </div>
              <div className={styles.text}>{data?.job == "" ? "Not Available" : data?.job}</div>
            </div>
          </div>
          <div className={styles.right_box}>
            <div className={styles.box}>
              <div className={styles.icon}>
                <img src={locationIcon} alt="profile_icon" width="100%" height="100%" />
              </div>
              <div className={styles.text}>{data?.location == "" ? "Not Available" : data?.location}</div>
            </div>
            <div className={styles.box}>
              <div className={styles.icon}>
                <img src={time} alt="profile_icon" width="100%" height="100%" />
              </div>
              <div className={styles.text}>
                {moment(data.created_at).format("MMMM")} {moment(data.created_at).format("YYYY")}
              </div>
            </div>
            {!location.search.includes("user") ? (
              <div className={`${styles.box} ${styles.edit}`} onClick={handleModal}>
                <div className={styles.icon}>
                  <img src={edit} alt="profile_icon" width="100%" height="100%" />
                </div>
                <div className={styles.text}>Edit</div>
              </div>
            ) : data.isfriends == "1" ? (
              <div className={`${styles.box} ${styles.edit}`} onClick={() => setUnFriendModalOpen(!unFriendModalOpen)}>
                <div className={styles.icon}>
                  <img src={friends} alt="profile_icon" width="100%" height="100%" />
                </div>
                <div className={styles.text}>Friends</div>
              </div>
            ) : data.friend_request_sent == "1" ? (
              <div className={`${styles.box} ${styles.edit}`} onClick={DeleteRequest}>
                <div className={styles.icon}>
                  <img src={cancel} alt="profile_icon" width="100%" height="100%" />
                </div>
                <div className={styles.text}>Cancel Request</div>
              </div>
            ) : data.friend_request_received == "1" ? (
              <div className={`${styles.box} ${styles.edit}`} onClick={AcceptRequest}>
                <div className={styles.icon}>
                  <img src={approve} alt="profile_icon" width="100%" height="100%" />
                </div>
                <div className={styles.text}>Confirm</div>
              </div>
            ) : (
              <div className={`${styles.box} ${styles.edit}`} onClick={SendRequest}>
                <div className={styles.icon}>
                  <img src={add_friend} alt="profile_icon" width="100%" height="100%" />
                </div>
                <div className={styles.text}>Add Friend</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {open && <AddProfilePictureModal open={open} setOpen={setOpen} closeable={true} />}
      {unFriendModalOpen && data.isfriends == "1" && (
        <UnFriendModal
          open={unFriendModalOpen}
          setOpen={setUnFriendModalOpen}
          image_url={data.profile_picture}
          name={data.name}
          user_id={location.search.split("=")[1]}
          FetchAnotherUserProfileData={FetchAnotherUserProfileData}
        />
      )}
    </div>
  );
}

export default ProfileHeader;
