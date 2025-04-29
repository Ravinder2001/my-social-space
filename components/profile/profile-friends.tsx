"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { FriendsType } from "../utils/CommanTypes";

type ProfileFriendsProps = {
  friends: FriendsType[];
  onRemoveClick: (e:number) => void;
};

export function ProfileFriends({ friends,onRemoveClick }: ProfileFriendsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {friends.map((friend) => (
        <Card key={friend.friendship_id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-3">
                <AvatarImage src={friend.friend_picture} alt={friend.friend_name} />
                <AvatarFallback>{friend.friend_name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="font-medium">{friend.friend_name}</h3>
              <Button
                variant="destructive"
                size="sm"
                className="w-full mt-2"
                onClick={() => onRemoveClick(friend.friendship_id)}
              >
                Un Friend
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
