"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Paperclip, Play, Send } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: string;
  type: "text" | "audio";
  audioLength?: string;
}

const messages: Message[] = [
  {
    id: "1",
    content: "",
    sender: {
      id: "2",
      name: "Alex",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    timestamp: "5:24 pm",
    type: "audio",
    audioLength: "0:42",
  },
  {
    id: "2",
    content: "We can showcase our team members and highlight unique things.",
    sender: {
      id: "2",
      name: "Alex",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    timestamp: "5:25 pm",
    type: "text",
  },
  {
    id: "3",
    content: "Let's also brainstorm some new blog post",
    sender: {
      id: "3",
      name: "Sarah",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    timestamp: "5:25 pm",
    type: "text",
  },
  {
    id: "4",
    content: "I like that idea, Sarah",
    sender: {
      id: "2",
      name: "Alex",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    timestamp: "5:26 pm",
    type: "text",
  },
];

export default function ChatSection() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Marketing Team" />
            <AvatarFallback>MT</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Marketing Team</h2>
            <p className="text-sm text-muted-foreground">Someone is typing...</p>
          </div>
        </div>
        <div className="flex items-center -space-x-2">
          {[1, 2, 3].map((i) => (
            <Avatar key={i} className="border-2 border-background">
              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={`Member ${i}`} />
              <AvatarFallback>M{i}</AvatarFallback>
            </Avatar>
          ))}
          <div className="ml-2 bg-muted rounded-full px-2 py-1 text-sm">+3</div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start gap-3 ${message.sender.id === "2" ? "flex-row-reverse" : ""}`}>
              <Avatar className="mt-1">
                <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
              </Avatar>
              <div className={`flex flex-col ${message.sender.id === "2" ? "items-end" : ""}`}>
                {message.type === "audio" ? (
                  <Card className="flex items-center gap-3 p-3 w-64">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Play className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-primary opacity-50" />
                    </div>
                    <span className="text-sm text-muted-foreground">{message.audioLength}</span>
                  </Card>
                ) : (
                  <div className={`px-4 py-2 rounded-lg max-w-md ${message.sender.id === "2" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    {message.content}
                  </div>
                )}
                <span className="text-sm text-muted-foreground mt-1">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input placeholder="Write a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-1" />
          <Button size="icon" variant="ghost">
            <Mic className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
