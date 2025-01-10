"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IncomingCallNotificationProps {
  callerName: string;
  callerImage: string;
  onAccept: () => void;
  onDecline: () => void;
}

export default function VideoCallNotification({ callerName, callerImage, onAccept, onDecline }: IncomingCallNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 30000); // Auto-hide after 30 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-4 right-4 z-50">
      <Card className="w-72">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={callerImage} alt={callerName} />
              <AvatarFallback>{callerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{callerName}</h3>
              <p className="text-sm text-muted-foreground">Incoming call</p>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="destructive" size="icon" onClick={onDecline} className="rounded-full">
              <PhoneOff className="h-4 w-4" />
            </Button>
            <Button variant="default" size="icon" onClick={onAccept} className="rounded-full">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
