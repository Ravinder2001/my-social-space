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
  Hash,
  Bell,
  Users,
  Search,
  Settings,
  Check,
  CheckCheck,
  MailOpen,
  BellDot,
  UserPlus,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Music,
  Trash2,Copy
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
    case "Search":
      return <Search color={props.color} size={props.size} />;
    case "Settings":
      return <Settings color={props.color} size={props.size} />;
    case "Check":
      return <Check color={props.color} size={props.size} />;
    case "CheckCheck":
      return <CheckCheck color={props.color} size={props.size} />;
    case "MailOpen":
      return <MailOpen color={props.color} size={props.size} />;
    case "BellDot":
      return <BellDot color={props.color} size={props.size} />;
    case "UserPlus":
      return <UserPlus color={props.color} size={props.size} />;
    case "MessageSquare":
      return <MessageSquare color={props.color} size={props.size} />;
    case "ArrowLeft":
      return <ArrowLeft color={props.color} size={props.size} />;
    case "ArrowRight":
      return <ArrowRight color={props.color} size={props.size} />;
    case "Music":
      return <Music color={props.color} size={props.size} />;
    case "Trash2":
      return <Trash2 color={props.color} size={props.size} />;
    case "Copy":
      return <Copy color={props.color} size={props.size} />;
    default:
      return <></>;
  }
}

export default LucideIcons;
