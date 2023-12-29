import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal } from "antd";
import styles from "./style.module.scss";
import GetPostLikes from "../../../APIs/GetPostLikes";
import { Request_Succesfull } from "../../../Utils/Constant";
import GetFriendList from "../../../APIs/GetFriendList";
import InputBox1 from "../../Atoms/InputBox/InputBox1/InputBox1";
import DefaultToogle from "../../Atoms/ToogleButton/DefaultToogle/DefaultToogle";
import CreateRoom from "../../../APIs/CreateRoom";
type props = {
  open: boolean;
  handleModal: () => void;
};

type friend = {
  id: string;
  name: string;
  profile_picture: string;
};
type selectedfriend = {
  id: string;
  name: string;
  profile_picture: string;
  isWrite: boolean;
};

const CreateGroupModal = (props: props) => {
  const { open, handleModal } = props;

  const [friendsList, setFriendsList] = useState<friend[]>([]);
  const [selectedfriendsList, setSelectedFriendsList] = useState<selectedfriend[]>([]);
  const [query, setQuery] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleClick = (friend: friend) => {
    const index = selectedfriendsList.findIndex((item) => item.id == friend.id);
    if (index == -1) {
      let object = { ...friend, isWrite: true };
      setSelectedFriendsList((prev) => [...prev, object]);
      setFriendsList([]);
    }
  };

  const handleWriteChange = (id: string) => {
    setSelectedFriendsList((prev) => prev.map((friend) => (friend.id === id ? { ...friend, isWrite: !friend.isWrite } : friend)));
  };

  const FetchList = async () => {
    const res = await GetFriendList(query);
    if (res?.status == Request_Succesfull) {
      setFriendsList(res?.data);
    }
  };

  const handleSubmit = async () => {
    let users: { user_id: string; isMessageAllowed: boolean }[] = [];
    selectedfriendsList.map((selected) => {
      users.push({ user_id: selected.id, isMessageAllowed: selected.isWrite });
    });
    const res = await CreateRoom({ type: 2, name: groupName, users });

  };

  useEffect(() => {
    if (!query.length) {
      return setFriendsList([]);
    }
    const search = setTimeout(() => {
      if (query.length) {
        FetchList();
      }
    }, 2000);
    return () => clearTimeout(search);
  }, [query]);

  return (
    <Modal title="Create Group" open={open} onOk={handleModal} onCancel={handleModal} footer={null} width={700}>
      <div className={styles.container}>
        <div className={styles.labelBox}>
          <div className={styles.label}>Group Name</div>
          <InputBox1 type="text" value={groupName} onChange={handleGroupChange} placeholder="Enter Group Name" />
        </div>

        <div className={styles.grouplabelBox}>
          <div className={styles.label}>Add Group Members</div>
          <InputBox1 type="text" value={query} onChange={handleQueryChange} placeholder="Search by name" />
          {friendsList.length ? (
            <div className={styles.resultsBox}>
              {friendsList.map((friend) => (
                <div
                  className={styles.box}
                  onClick={() => {
                    handleClick(friend);
                  }}
                >
                  <img className={styles.img} src={friend.profile_picture} alt="" />

                  <div className={styles.name}>{friend.name}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.labelBox}>
          <div className={styles.label}>Added Members</div>
          <div className={styles.row}>
            <div className={styles.col1}>Name</div>
            <div className={styles.col2}>Write Access</div>
          </div>
          <div className={styles.body}>
            {selectedfriendsList.map((selected) => (
              <div className={styles.row}>
                <div className={styles.col1}>
                  <img className={styles.img} src={selected.profile_picture} alt="" />
                  <div className={styles.names}>{selected.name}</div>
                </div>
                <div className={styles.col2}>
                  <DefaultToogle
                    name=""
                    value={selected.isWrite}
                    handleChange={() => {
                      handleWriteChange(selected.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </Modal>
  );
};

export default CreateGroupModal;
