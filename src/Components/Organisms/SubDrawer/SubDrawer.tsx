import React, { useState, useEffect, ChangeEvent } from "react";
import SVGIcons from "../../../Assets/SVG/SvgIcon";
import styles from "./style.module.scss";
import InputBox1 from "../../Atoms/InputBox/InputBox1/InputBox1";
import ReactIcons from "../../../Utils/Icons/ReactIcons";
import GetAllUsers from "../../../APIs/GetAllUsers";
import { Request_Succesfull } from "../../../Utils/Constant";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type usersType = {
  id: string;
  name: string;
  image_url: string;
};
type props = {
  handleNavigate: (id: string) => void;
};
function SubDrawer(props: props) {
 
  const User = useSelector((state: RootState) => state.UserReducer.id);
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
      <div className={styles.background}>
        <SVGIcons name="Sub_Drawer_Background" />
      </div>
      <div className={styles.main_box}>
        <div className={styles.heading}>Search</div>
        <div className={styles.search_box}>
          <div className={styles.input_box}>
            <InputBox1
              type="text"
              placeholder="Search by Name"
              value={text}
              onChange={handleChange}
            />
          </div>
          {text.length ? (
            <div className={styles.icon} onClick={() => setText("")}>
              <ReactIcons name="RxCross2" color="white" size={25} />
            </div>
          ) : null}
        </div>
        <div className={styles.list_box}>
          {users.map((user) => (
            <div
              id={user.id}
              className={styles.user_con}
              onClick={() =>
                user.id == User
                  ? props.handleNavigate("/profile")
                  : props.handleNavigate(`/profile?user=${user.id}`)
              }
            >
              <div className={styles.img_box}>
                <img src={user.image_url} alt="" className={styles.img} />
              </div>
              <div className={styles.name}>
                {user.name} <span>{user.id == User && "(You)"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubDrawer;
