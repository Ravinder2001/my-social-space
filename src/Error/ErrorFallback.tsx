import React from "react";
import { useNavigate } from "react-router-dom";
import server from "../Assets/Images/404.png";
import styles from "./style.module.scss"
// import { Home_Route } from "../Utils/Constant";
function ErrorFallback() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img src={server} alt="" className={styles.img} />
      <button className={styles.button} onClick={()=>navigate("/")}>Home</button>
    </div>
  );
}

export default ErrorFallback;
