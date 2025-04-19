"use client"

import { useState } from "react"
import { UserPlus, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

type UserCardProps = {
  user: {
    id: string
    name: string
    avatar: string
    bio: string
    followers: number
    verified: boolean
  }
}

export function UserCard({ user }: UserCardProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  const toggleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="h-24 bg-gradient-to-r from-brand-purple to-brand-blue" />
      <CardContent className="pt-0 -mt-12">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>

          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              {user.verified && (
                <Badge variant="outline" className="h-5 rounded-full bg-brand-blue text-white px-1.5">
                  ✓
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="text-center">
              <p className="font-semibold">{user.followers.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="h-10 border-l" />
            <div className="text-center">
              <p className="font-semibold">42</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant={isFollowing ? "secondary" : "default"} className="w-full gap-2" onClick={toggleFollow}>
          {isFollowing ? (
            <>
              <Check className="h-4 w-4" />
              Following
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Follow
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
