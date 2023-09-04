import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import FriendRequestBox from "../../Molecules/FriendRequestBox/FriendRequestBox";
import GetFriendRequestList from "../../../APIs/GetFriendRequestList";
import { Request_Succesfull } from "../../../Utils/Constant";
type ListType = {
  id: number;
  name: string;
  user_id: string;
  status: string;
  created_at: string;
  image_url: string;
};

function FriendRequestList() {
  const [list, setList] = useState<ListType[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const FetchList = async () => {
    const res = await GetFriendRequestList();
    if (res?.status == Request_Succesfull) {
      setList(res?.data);
    }
  };
  useEffect(() => {
    FetchList();
  }, [flag]);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {list.map((item) => (
          <FriendRequestBox
            key={item.id}
            id={item.id}
            name={item.name}
            status={item.status}
            image_url={item.image_url}
            created_at={item.created_at}
            user_id={item.user_id}
            flag={flag}
            setFlag={setFlag}
          />
        ))}
      </div>
    </div>
  );
}

export default FriendRequestList;
