"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

type ProfileFriendsProps = {
  friends: {
    id: string
    name: string
    avatar: string
    mutualFriends: number
  }[]
}

export function ProfileFriends({ friends }: ProfileFriendsProps) {
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({})

  const toggleFollow = (id: string) => {
    setFollowingState({
      ...followingState,
      [id]: !followingState[id],
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {friends.map((friend) => (
        <Card key={friend.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-3">
                <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                <AvatarFallback>{friend.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="font-medium">{friend.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{friend.mutualFriends} mutual friends</p>
              <Button
                variant={followingState[friend.id] ? "secondary" : "default"}
                size="sm"
                className="w-full"
                onClick={() => toggleFollow(friend.id)}
              >
                {followingState[friend.id] ? "Following" : "Follow"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
