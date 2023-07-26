import React from "react";
import {
  Briefcase,
  Clock,
  Compass,
  Home,
  LogOut,
  MapPin,
  MessageCircle,
  PlusSquare,
  UserCircle,
} from "lucide-react";

type IconsType = {
  name: string;
  color?: string;
  size?: number;
};
function LucideIcons(props: IconsType) {
  switch (props.name) {
    case "LogOut":
      return <LogOut color={props.color} size={props.size} />;
    case "Home":
      return <Home color={props.color} size={props.size} />;
    case "User":
      return <UserCircle color={props.color} size={props.size} />;
    case "Compass":
      return <Compass color={props.color} size={props.size} />;
    case "Message":
      return <MessageCircle color={props.color} size={props.size} />;
    case "PlusSquare":
      return <PlusSquare color={props.color} size={props.size} />;
    case "Briefcase":
      return <Briefcase color={props.color} size={props.size} />;
    case "MapPin":
      return <MapPin color={props.color} size={props.size} />;
    case "Clock":
      return <Clock color={props.color} size={props.size} />;
    default:
      return <></>;
  }
}

export default LucideIcons;
