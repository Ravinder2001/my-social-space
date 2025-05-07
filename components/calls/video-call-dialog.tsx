"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Video } from "lucide-react";
import { cn } from "@/lib/utils";

type VideoCallDialogProps = {
  caller: {
    id: string;
    name: string;
    avatar: string;
  };
  onAccept: () => void;
  onDecline: () => void;
};

export function VideoCallDialog({ caller, onAccept, onDecline }: VideoCallDialogProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [ringCount, setRingCount] = useState(0);

  // Play ringtone
  useEffect(() => {
    // Create audio element
    const audio = new Audio("/sounds/ringtone.mp3");
    audio.loop = true;
    audio.volume = 0.5;

    // In a real app, you would have an actual ringtone file
    // For now, we'll just simulate the ringing visually

    const ringInterval = setInterval(() => {
      setRingCount((prev) => prev + 1);
    }, 1000);

    return () => {
      // audio.pause()
      clearInterval(ringInterval);
    };
  }, []);

  const handleAccept = () => {
    setIsOpen(false);
    onAccept();
  };

  const handleDecline = () => {
    setIsOpen(false);
    onDecline();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 flex flex-col items-center">
          <div className={cn("mb-4 p-1 rounded-full bg-background/80 backdrop-blur-sm", ringCount % 2 === 0 ? "ring-4 ring-primary/30" : "")}>
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={caller.avatar || "/placeholder.svg"} alt={caller.name} />
              <AvatarFallback className="text-2xl">{caller.name[0]}</AvatarFallback>
            </Avatar>
          </div>

          <h3 className="text-xl font-semibold mb-1">{caller.name}</h3>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Video className="h-4 w-4" />
            <span>Incoming video call...</span>
          </div>

          <div className="animate-pulse text-sm text-muted-foreground mb-6">
            {ringCount % 3 === 0 ? "Ringing..." : ringCount % 3 === 1 ? "Ringing.." : "Ringing."}
          </div>
        </div>

        <div className="flex p-4 justify-center gap-4">
          <Button variant="destructive" size="lg" className="rounded-full h-14 w-14 p-0" onClick={handleDecline}>
            <PhoneOff className="h-6 w-6" />
            <span className="sr-only">Decline</span>
          </Button>

          <Button variant="default" size="lg" className="rounded-full h-14 w-14 p-0 bg-green-600 hover:bg-green-700" onClick={handleAccept}>
            <Phone className="h-6 w-6" />
            <span className="sr-only">Accept</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
