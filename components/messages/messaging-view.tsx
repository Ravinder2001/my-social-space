"use client"

import { useState } from "react"
import { Search, Send, Smile, Paperclip, ImageIcon, Mic, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for conversations
const conversations = [
  {
    id: "1",
    user: { name: "Emma Johnson", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    lastMessage: "Hey, how are you doing?",
    time: "2m",
    unread: 2,
  },
  {
    id: "2",
    user: { name: "Noah Williams", avatar: "/placeholder.svg?height=40&width=40", status: "offline" },
    lastMessage: "Let me know when you're free to catch up",
    time: "1h",
    unread: 0,
  },
  {
    id: "3",
    user: { name: "Olivia Brown", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    lastMessage: "Thanks for the help yesterday!",
    time: "3h",
    unread: 0,
  },
  {
    id: "4",
    user: { name: "Liam Davis", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
    lastMessage: "Did you see the latest project requirements?",
    time: "1d",
    unread: 0,
  },
  {
    id: "5",
    user: { name: "Ava Wilson", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    lastMessage: "I just sent you the design files",
    time: "2d",
    unread: 0,
  },
]

// Mock data for messages
const messages = [
  {
    id: "1",
    sender: "them",
    content: "Hey, how are you doing?",
    time: "10:32 AM",
  },
  {
    id: "2",
    sender: "me",
    content: "I'm good, thanks! Just working on that new project we discussed.",
    time: "10:34 AM",
  },
  {
    id: "3",
    sender: "them",
    content: "That sounds great! How's it coming along?",
    time: "10:35 AM",
  },
  {
    id: "4",
    sender: "me",
    content: "Making good progress. I've finished the initial designs and started on the implementation.",
    time: "10:38 AM",
  },
  {
    id: "5",
    sender: "them",
    content: "Awesome! Can't wait to see it. Do you think you'll be able to share a preview soon?",
    time: "10:40 AM",
  },
  {
    id: "6",
    sender: "me",
    content: "Definitely! I should have something to show by the end of the week.",
    time: "10:42 AM",
  },
  {
    id: "7",
    sender: "them",
    content: "Perfect timing. We have the team meeting on Friday, so that would work out well.",
    time: "10:45 AM",
  },
]

export function MessagingView() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [messageInput, setMessageInput] = useState("")
  const [chatMessages, setChatMessages] = useState(messages)

  const sendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage = {
      id: String(Date.now()),
      sender: "me",
      content: messageInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([...chatMessages, newMessage])
    setMessageInput("")

    // Simulate reply after a delay
    setTimeout(() => {
      const replyMessage = {
        id: String(Date.now() + 1),
        sender: "them",
        content: "Thanks for the update! Looking forward to our next chat.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setChatMessages((prev) => [...prev, replyMessage])
    }, 3000)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Conversations sidebar */}
      <div className="w-80 border-r bg-card hidden md:flex flex-col">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-9 bg-muted/40" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${activeConversation.id === conversation.id ? "bg-muted" : ""}`}
              onClick={() => setActiveConversation(conversation)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                    <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                      conversation.user.status === "online"
                        ? "bg-brand-green"
                        : conversation.user.status === "away"
                          ? "bg-brand-yellow"
                          : "bg-muted"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{conversation.user.name}</p>
                    <p className="text-xs text-muted-foreground">{conversation.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && <Badge className="ml-auto bg-brand-blue">{conversation.unread}</Badge>}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="h-16 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={activeConversation.user.avatar || "/placeholder.svg"}
                alt={activeConversation.user.name}
              />
              <AvatarFallback>{activeConversation.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{activeConversation.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {activeConversation.user.status === "online"
                  ? "Online"
                  : activeConversation.user.status === "away"
                    ? "Away"
                    : "Offline"}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Search in conversation</DropdownMenuItem>
              <DropdownMenuItem>Mute notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Block user</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message input */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Attach image</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Voice message</span>
            </Button>

            <div className="relative flex-1">
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                className="pr-10"
              />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                <Smile className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Add emoji</span>
              </Button>
            </div>

            <Button size="icon" className="rounded-full" onClick={sendMessage} disabled={!messageInput.trim()}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
