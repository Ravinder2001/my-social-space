"use client"

import { useState } from "react"
import { Bell, Filter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for notifications
const allNotifications = [
  {
    id: "1",
    type: "like",
    user: { name: "Emma Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    content: 'liked your post "Just launched my new portfolio website!"',
    time: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    user: { name: "Noah Williams", avatar: "/placeholder.svg?height=40&width=40" },
    content: 'commented on your post: "This looks amazing! Great work!"',
    time: "15 minutes ago",
    read: false,
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
    content: 'mentioned you in a comment: "@user check this out!"',
    time: "3 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "like",
    user: { name: "Ava Wilson", avatar: "/placeholder.svg?height=40&width=40" },
    content: "liked your photo from your beach vacation",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "message",
    user: { name: "William Moore", avatar: "/placeholder.svg?height=40&width=40" },
    content: "sent you a message",
    time: "1 day ago",
    read: true,
  },
  {
    id: "7",
    type: "comment",
    user: { name: "Sophia Taylor", avatar: "/placeholder.svg?height=40&width=40" },
    content: 'replied to your comment: "I completely agree with you!"',
    time: "1 day ago",
    read: true,
  },
  {
    id: "8",
    type: "follow",
    user: { name: "James Anderson", avatar: "/placeholder.svg?height=40&width=40" },
    content: "started following you",
    time: "2 days ago",
    read: true,
  },
]

export function NotificationsView() {
  const [notifications, setNotifications] = useState(allNotifications)
  const [activeTab, setActiveTab] = useState("all")
  const [filters, setFilters] = useState({
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    messages: true,
  })

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const filterNotifications = () => {
    let filtered = [...allNotifications]

    // Apply type filters
    filtered = filtered.filter((n) => {
      if (n.type === "like" && !filters.likes) return false
      if (n.type === "comment" && !filters.comments) return false
      if (n.type === "follow" && !filters.follows) return false
      if (n.type === "mention" && !filters.mentions) return false
      if (n.type === "message" && !filters.messages) return false
      return true
    })

    // Apply tab filters
    if (activeTab === "unread") {
      filtered = filtered.filter((n) => !n.read)
    }

    return filtered
  }

  const filteredNotifications = filterNotifications()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6 text-brand-orange" />
          Notifications
          {unreadCount > 0 && (
            <span className="text-sm bg-brand-red text-white rounded-full px-2 py-0.5">{unreadCount}</span>
          )}
        </h1>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={filters.likes}
                onCheckedChange={(checked) => setFilters({ ...filters, likes: checked })}
              >
                Likes
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.comments}
                onCheckedChange={(checked) => setFilters({ ...filters, comments: checked })}
              >
                Comments
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.follows}
                onCheckedChange={(checked) => setFilters({ ...filters, follows: checked })}
              >
                Follows
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.mentions}
                onCheckedChange={(checked) => setFilters({ ...filters, mentions: checked })}
              >
                Mentions
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.messages}
                onCheckedChange={(checked) => setFilters({ ...filters, messages: checked })}
              >
                Messages
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border hover:bg-muted/50 transition-colors ${!notification.read ? "bg-muted/30" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p>
                      <span className="font-medium">{notification.user.name}</span> {notification.content}
                    </p>
                    <p className="text-sm text-muted-foreground">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="flex items-center">
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
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p>
                      <span className="font-medium">{notification.user.name}</span> {notification.content}
                    </p>
                    <p className="text-sm text-muted-foreground">{notification.time}</p>
                  </div>
                  <div className="flex items-center">
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
  )
}
