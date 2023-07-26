import React, { useState, MouseEvent } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setIndex } from "../../../store/Slices/LoginPageSlice";
function LoginNavHeader() {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state: RootState) => state.LoginPageReducer.index
  );

  const handleIndex = (e: MouseEvent<HTMLDivElement>) => {
    dispatch(setIndex(e.currentTarget.id));
  };
  return (
    <div className={styles.header_box}>
      <div className={styles.left_box}>
        <div
          id="0"
          onClick={handleIndex}
          style={{ color: selectedIndex === "0" ? "white" : "grey" }}
        >
          Login
        </div>
        <div
          id="1"
          onClick={handleIndex}
          style={{ color: selectedIndex === "1" ? "white" : "grey" }}
        >
          Create An Account
        </div>
      </div>
      <div className={styles.right_box}>
        <div
          id="2"
          onClick={handleIndex}
          style={{ color: selectedIndex === "2" ? "white" : "grey" }}
        >
          About Us
        </div>
        <div
          id="3"
          onClick={handleIndex}
          style={{ color: selectedIndex === "3" ? "white" : "grey" }}
        >
          Contact Us
        </div>
      </div>
    </div>
  );
}

export default LoginNavHeader;
