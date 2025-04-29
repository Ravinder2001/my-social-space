"use client";

import { useEffect, useState } from "react";
import { Bell, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationType } from "../utils/CommanTypes";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { formatTimeAgo } from "../utils/functions";

export function NotificationsView() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [unreadCount, setUnReadCount] = useState<number>(-1);

  const { fetchData: fetchNotifications } = useApiFetch("");
  const { fetchData: fetchUnReadCount } = useApiFetch("");

  const loadNotifications = (tab: string) => {
    const endpoint = `${CONSTANTS.API_ROUTES.GET_NOTIFICATIONS}${tab === 'unread' ? '?unRead=1' : ''}`;
    fetchNotifications(endpoint).then((res: any) => {
      if (res.success == 1) {
        setNotifications(res?.data);
      }
    });
  };

  // Effect for loading notifications on tab change
  useEffect(() => {
    loadNotifications(activeTab);
  }, [activeTab]);

  // Separate effect for loading unread count only once at initial mount
  useEffect(() => {
    fetchUnReadCount(CONSTANTS.API_ROUTES.GET_UN_READ_COUNT).then((res: any) => {
      if (res.success == 1) {
        setUnReadCount(Number(res?.data.unread_count));
      }
    });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6 text-brand-orange" />
          Notifications
          {unreadCount > 0 && <span className="text-sm bg-brand-red text-white rounded-full px-2 py-0.5">{unreadCount}</span>}
        </h1>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm">
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.notification_id}
                className={`p-4 rounded-lg border hover:bg-muted/50 transition-colors ${!notification.is_read ? "bg-muted/30" : ""}`}
              >
                <div className="flex gap-4 items-center">
                  {notification.profile_picture && (
                    <Avatar className="flex-shrink-0">
                      <AvatarImage src={notification.profile_picture} alt={notification.content} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}

                  <div className="flex-1 min-w-0">
                    <p>{notification.content}</p>
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
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium">No notifications</h3>
              <p>You're all caught up!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.notification_id} className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex gap-4">
                  {notification.profile_picture && (
                    <Avatar className="flex-shrink-0">
                      <AvatarImage src={notification.profile_picture} alt={notification.content} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1 min-w-0">
                    <p>{notification.content}</p>
                    <p className="text-sm text-muted-foreground">{formatTimeAgo(notification.created_at)}</p>
                  </div>
                  {notification.post_image_url && (
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-md overflow-hidden border">
                        <img src={notification.post_image_url} alt="Post preview" className="h-full w-full object-cover" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center flex-shrink-0">
                    <div className="h-3 w-3 rounded-full bg-brand-blue" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium">No unread notifications</h3>
              <p>You're all caught up!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
