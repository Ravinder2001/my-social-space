import React from "react";
import { AiFillEye, AiFillEyeInvisible,AiOutlineFileGif,AiOutlinePlus } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";

type IconsType = {
  name: string;
  size?: number;
  color?: string;
};
function ReactIcons(props: IconsType) {
  switch (props.name) {
    case "AiFillEye":
      return <AiFillEye size={props.size} color={props.color} />;
    case "AiFillEyeInvisible":
      return <AiFillEyeInvisible size={props.size} color={props.color} />;
    case "AiOutlineFileGif":
      return <AiOutlineFileGif size={props.size} color={props.color} />;
    case "BsEmojiSmile":
      return <BsEmojiSmile size={props.size} color={props.color} />;
    case "RxCross2":
      return <RxCross2 size={props.size} color={props.color} />;
    case "MdDelete":
      return <MdDelete size={props.size} color={props.color} />;
    case "AiOutlinePlus":
      return <AiOutlinePlus size={props.size} color={props.color} />;
    default:
      return <></>;
  }
}

export default ReactIcons;
