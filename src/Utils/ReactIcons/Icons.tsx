import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type IconsType = {
  name: string;
  size?: number;
  color?: string;
};
function Icons(props: IconsType) {
  switch (props.name) {
    case "AiFillEye":
      return <AiFillEye size={props.size} color={props.color} />;
    case "AiFillEyeInvisible":
      return <AiFillEyeInvisible size={props.size} color={props.color} />;
    default:
      return <></>;
  }
}

export default Icons;
