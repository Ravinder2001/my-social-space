import React, { useEffect, useState } from "react";
import GetNotifications from "../../../APIs/GetNotifications";
import { Request_Succesfull } from "../../../Utils/Constant";
import styles from "./style.module.scss";
import { formatTime } from "../../../Utils/Function";
import { socket } from "../../../socket";
type NotificationsType = {
  id: number;
  notification_type: string;
  message: string;
  image_url: string;
  is_read: boolean;
  created_at: string;
};
function NotificationsContainer() {
  const [data, setData] = useState<NotificationsType[]>([]);
  const FetchNotifications = async () => {
    const res = await GetNotifications();
    if (res?.status == Request_Succesfull) {
      setData(res?.data);
    }
  };

  useEffect(() => {
    FetchNotifications();
    socket.on("Notification", () => {
      FetchNotifications();
    });
    return () => {
      socket.offAny();
    };
  }, []);

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <div className={styles.box}>
          <div>
            <img src={item.image_url} alt="" className={styles.img} />
          </div>
          <div className={styles.msg}>{item.message}</div>
          <div className={styles.time}>{formatTime(item.created_at)}</div>
        </div>
      ))}
    </div>
  );
}

export default NotificationsContainer;
