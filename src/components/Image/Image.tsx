import React from "react";
import styles from "./style.module.css";

type props = {
  src: string;
};

function Image(props:props) {
  return (
    <img
      src={props.src}
      alt=""
    />
  );
}

export default Image;
