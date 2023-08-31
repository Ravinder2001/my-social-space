import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./style.module.scss";
import SearchInput from "../../Atoms/InputBox/SearchInput/SearchInput";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import GetAllUsers from "../../../APIs/GetAllUsers";
import { Request_Succesfull } from "../../../Utils/Constant";
import UserImage from "../../Atoms/UserImage/UserImage";

type usersType = {
  id: string;
  name: string;
  image_url: string;
};
function NavBar() {
  const [text, setText] = useState<string>("");
  const [users, setUsers] = useState<usersType[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const FetchUsers = async () => {
    const res = await GetAllUsers(text);
    if (res?.status == Request_Succesfull) {
      setUsers(res?.data);
    }
  };
  useEffect(() => {
    if (text.length) {
      FetchUsers();
    } else {
      setUsers([]);
    }
  }, [text]);

  return (
    <div className={styles.container}>
      <div className={styles.input_box}>
        <SearchInput value={text} handleChange={handleChange} />
        {users.length ? (
          <div className={styles.search_result}>
            {users.map((user) => (
              <div id={user.id} className={styles.user_con}>
                <div className={styles.img_box}>
                  <img src={user.image_url} alt="" className={styles.img} />
                </div>
                <div className={styles.name}>{user.name}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className={styles.right_box}>
        <LucideIcons name="Bell" />
        <LucideIcons name="Users" />
      </div>
    </div>
  );
}

export default NavBar;
