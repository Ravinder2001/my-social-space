import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
function UserImage() {
  const userImage = useSelector((state: RootState) => state.UserReducer.image);
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    setImage(userImage);
  }, [userImage]);
  return <img src={image} alt="user_image" className={styles.image} />;
}

export default UserImage;
