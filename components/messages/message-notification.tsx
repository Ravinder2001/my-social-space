"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type MessageNotificationProps = {
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  message: string;
  onClose: () => void;
};

export function MessageNotification({ sender, message, onClose }: MessageNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  // Animation effect
  useEffect(() => {
    // Delay to allow for animation
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto-dismiss after 5 seconds
    const hideTimeout = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Delay the actual close to allow for animation
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleClick = () => {
    // Navigate to the messages page
    router.push("/messages");
    handleClose();
  };

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 w-80 bg-card shadow-lg rounded-lg border overflow-hidden transition-all duration-300 transform",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      )}
    >
      <div className="p-3 flex items-start gap-3 cursor-pointer hover:bg-muted/50 transition-colors" onClick={handleClick}>
        <Avatar>
          <AvatarImage src={sender.avatar || "/placeholder.svg"} alt={sender.name} />
          <AvatarFallback>{sender.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium">{sender.name}</p>
            <p className="text-xs text-muted-foreground">now</p>
          </div>
          <p className="text-sm text-muted-foreground truncate">{message}</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-full -mt-1 -mr-1"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="h-1 bg-primary animate-progress"></div>
    </div>
  );
}
