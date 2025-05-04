"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NotificationType } from "../utils/CommanTypes";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { formatTimeAgo } from "../utils/functions";

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [unreadCount, setUnReadCount] = useState<number>(-1);

  const { fetchData: fetchNotifications } = useApiFetch("");
  const { fetchData: fetchUnReadCount } = useApiFetch("");

  // Effect for loading notifications on tab change
  useEffect(() => {
    const endpoint = `${CONSTANTS.API_ROUTES.GET_NOTIFICATIONS}`;
    fetchNotifications(endpoint).then((res: any) => {
      if (res.success == 1) {
        setNotifications(res?.data);
      }
    });
    fetchUnReadCount(CONSTANTS.API_ROUTES.GET_UN_READ_COUNT).then((res: any) => {
      if (res.success == 1) {
        setUnReadCount(Number(res?.data.unread_count));
      }
    });
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-brand-red text-white">{unreadCount}</Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <Separator />
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.notification_id}
                  className={`p-4 hover:bg-muted/50 transition-colors ${!notification.is_read ? "bg-muted/30" : ""}`}
                  // onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    {notification.profile_picture && (
                      <Avatar className="flex-shrink-0">
                        <AvatarImage src={notification.profile_picture} alt={notification.content} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{notification.content}</p>
                      <p className="text-sm text-muted-foreground">{formatTimeAgo(notification.created_at)}</p>
                    </div>
                    {notification.post_image_url && (
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-md overflow-hidden border">
                          <img src={notification.post_image_url} alt="Post preview" className="h-full w-full object-cover" />
                        </div>
                      </div>
                    )}
                    {!notification.is_read && (
                      <div className="flex items-center flex-shrink-0">
                        <div className="h-3 w-3 rounded-full bg-brand-blue" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">No notifications to show</div>
          )}
        </ScrollArea>
        <Separator />
        <div className="p-2">
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <a href="/notifications">View all notifications</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
