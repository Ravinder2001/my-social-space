"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for notifications
const notifications = [
  {
    id: "1",
    type: "like",
    user: { name: "Emma Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    content: "liked your post",
    time: "2 minutes ago",
    read: false,
    postImage: "/placeholder.svg?height=60&width=60&text=Post+Image",
  },
  {
    id: "2",
    type: "comment",
    user: { name: "Noah Williams", avatar: "/placeholder.svg?height=40&width=40" },
    content: "commented on your post",
    time: "15 minutes ago",
    read: false,
    postImage: "/placeholder.svg?height=60&width=60&text=Beach+Photo",
  },
  {
    id: "3",
    type: "follow",
    user: { name: "Olivia Brown", avatar: "/placeholder.svg?height=40&width=40" },
    content: "started following you",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    type: "mention",
    user: { name: "Liam Davis", avatar: "/placeholder.svg?height=40&width=40" },
    content: "mentioned you in a comment",
    time: "3 hours ago",
    read: true,
    postImage: "/placeholder.svg?height=60&width=60&text=Group+Photo",
  },
  {
    id: "5",
    type: "like",
    user: { name: "Ava Wilson", avatar: "/placeholder.svg?height=40&width=40" },
    content: "liked your photo",
    time: "5 hours ago",
    read: true,
    postImage: "/placeholder.svg?height=60&width=60&text=Vacation",
  },
]

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false)
  const [notifs, setNotifs] = useState(notifications)

  const unreadCount = notifs.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-brand-red text-white">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <ScrollArea className="h-[300px]">
          {notifs.length > 0 ? (
            <div>
              {notifs.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 transition-colors ${!notification.read ? "bg-muted/30" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
                      <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{notification.user.name}</span> {notification.content}
                      </p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    {notification.postImage && (
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-md overflow-hidden border">
                          <img
                            src={notification.postImage || "/placeholder.svg"}
                            alt="Post preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    {!notification.read && (
                      <div className="ml-auto flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-brand-blue" />
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
  )
}
