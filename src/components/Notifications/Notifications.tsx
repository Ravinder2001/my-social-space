"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: number;
  message: string;
  time: string;
}

const dummyNotifications: Notification[] = [
  { id: 1, message: "John Doe liked your post", time: "2 minutes ago" },
  { id: 2, message: "New message from Jane Smith", time: "1 hour ago" },
  { id: 3, message: "You have a new follower", time: "3 hours ago" },
  { id: 4, message: "Your post was shared by Alice", time: "Yesterday" },
  { id: 5, message: "Reminder: Event starting soon", time: "Yesterday" },
];

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);

  const unreadCount = notifications.length;

  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2 font-semibold border-b">
          <span>Notifications</span>
          <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
            Mark all as read
          </Button>
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start px-4 py-2 space-y-1">
                <p className="text-sm">{notification.message}</p>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-center text-muted-foreground">No new notifications</div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
