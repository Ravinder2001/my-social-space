import React from "react";
import {
  Briefcase,
  Clock,
  Compass,
  Heart,
  Home,
  LogOut,
  MapPin,
  MessageCircle,
  MessageCircleIcon,
  Palette,
  PlusSquare,
  UserCircle,
  Hash,Bell,Users
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
    case "Heart":
      return <Heart color={props.color} size={props.size} />;
    case "MessageCircleIcon":
      return <MessageCircleIcon color={props.color} size={props.size} />;
    case "Palette":
      return <Palette color={props.color} size={props.size} />;
    case "Hash":
      return <Hash color={props.color} size={props.size} />;
    case "Bell":
      return <Bell color={props.color} size={props.size} />;
    case "Users":
      return <Users color={props.color} size={props.size} />;
    default:
      return <></>;
  }
}

export default LucideIcons;
