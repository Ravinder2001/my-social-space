"use client"

import React from "react"
import { Users, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for suggested users
const suggestedUsers = [
  { id: "1", name: "Jessica Lee", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 12, verified: true },
  { id: "2", name: "Michael Brown", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 8, verified: false },
  { id: "3", name: "Sarah Johnson", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 5, verified: true },
  { id: "4", name: "David Wilson", avatar: "/placeholder.svg?height=64&width=64", mutualFriends: 3, verified: false },
]

export function SuggestedUsers() {
  const [users, setUsers] = React.useState(suggestedUsers)
  const [followingState, setFollowingState] = React.useState<Record<string, boolean>>({})

  const toggleFollow = (id: string) => {
    setFollowingState({
      ...followingState,
      [id]: !followingState[id],
    })
  }

  const removeUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-brand-green" />
          Suggested for You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{user.name}</span>
                  {user.verified && (
                    <Badge variant="outline" className="h-4 rounded-full bg-brand-blue text-white px-1.5 text-[10px]">
                      ✓
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{user.mutualFriends} mutual friends</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant={followingState[user.id] ? "secondary" : "default"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => toggleFollow(user.id)}
              >
                {followingState[user.id] ? "Following" : "Follow"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeUser(user.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </div>
        ))}

        {users.length === 0 && <p className="text-center text-muted-foreground py-4">No suggestions to show</p>}
      </CardContent>
    </Card>
  )
}
