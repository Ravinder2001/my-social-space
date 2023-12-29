import React, { useState } from "react";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import styles from "./style.module.scss";
import CreateGroupModal from "../CreateGroupModal/CreateGroupModal";
import { useLocation } from "react-router-dom";
import { Messages_Route } from "../../../Utils/Constant";
function Navbar() {
  const location = useLocation();

  const [GroupOpen, setGroupOpen] = useState<boolean>(false);
  const handleGroup = () => {
    setGroupOpen(!GroupOpen);
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>My Social Space</div>
      <div className={styles.right_box}>
        <div className={styles.icon} id={styles.bell}>
          <LucideIcons name="BellDot" color="#124aba" />
        </div>
        <div className={styles.icon} id={styles.plus}>
          <LucideIcons name="UserPlus" color="#620684" />
        </div>
        {location.pathname.includes(Messages_Route) ? (
          <div className={styles.icon} id={styles.group} onClick={handleGroup}>
            <LucideIcons name="Users" color="#620684" />
          </div>
        ) : null}
      </div>
      {location.pathname.includes(Messages_Route) ? <CreateGroupModal open={GroupOpen} handleModal={handleGroup} /> : null}
    </div>
  );
}

export default Navbar;
