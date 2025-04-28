"use client";

import { useState } from "react";
import { UserPlus, Check, UserRoundCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SearchUserType } from "../utils/CommanTypes";

type UserCardProps = {
  user: SearchUserType;
};

export function UserCard({ user }: UserCardProps) {
  const [requestSent, setRequestSent] = useState(false);

  const sendFriendRequest = () => {
    setRequestSent(true);
    // Here you would typically call an API to send the friend request
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="pt-4">
        <div className="flex flex-col items-center">
          <Avatar className="h-20 w-20 border-2 border-background">
            <AvatarImage src={user.profile_picture} alt={user.user_name} />
            <AvatarFallback>{user.user_name[0]}</AvatarFallback>
          </Avatar>

          <div className="mt-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <h3 className="text-lg font-semibold">{user.user_name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{user.bio}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-0 pb-4">
        {user.isFriend ? (
          <Button variant="default" className="w-full gap-2 bg-green-700">
            <UserRoundCheck className="h-4 w-4" />
            Friends
          </Button>
        ) : (
          <Button variant={requestSent ? "secondary" : "default"} className="w-full gap-2" onClick={sendFriendRequest} disabled={requestSent}>
            {requestSent ? (
              <>
                <Check className="h-4 w-4" />
                Request Sent
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                Send Friend Request
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
