"use client";

import { useState } from "react";
import { UserPlus, Check, UserRoundCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SearchUserType } from "../utils/CommanTypes";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";

type UserCardProps = {
  user: SearchUserType;
};

export function UserCard({ user }: UserCardProps) {
  const [requestSent, setRequestSent] = useState(user.isRequested);

  const { fetchData } = useApiFetch("");

  const handleSendRequest = async () => {
    await fetchData(CONSTANTS.API_ROUTES.SEND_REQUEST, {
      method: "POST",
      data: {
        receiver_id: user.user_id,
      },
    }).then((res: any) => {
      if (res.success == 1) {
        setRequestSent(true);
      }
    });
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
          <Button variant={requestSent ? "secondary" : "default"} className="w-full gap-2" onClick={handleSendRequest} disabled={requestSent}>
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
