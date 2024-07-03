import React from "react";
import * as Icons from "lucide-react";

interface LucideIconProps {
  name: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}

const LucideIcon: React.FC<LucideIconProps> = ({ name, size = 20, color = "currentColor" }) => {
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent size={size} color={color} style={{ cursor: "pointer" }} />;
};

export default LucideIcon;
