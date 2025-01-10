import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Circle } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  lastMessage?: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Marketing Team",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    lastMessage: "Let's brainstorm some new blog post",
  },
  {
    id: "2",
    name: "Design Team",
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    lastMessage: "The new mockups are ready",
  },
  {
    id: "3",
    name: "Development Team",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    lastMessage: "Sprint planning at 2 PM",
  },
];

interface UserListProps {
  onSelectUser: (userId: string) => void;
  selectedUserId: string;
}

export default function UserList({ onSelectUser, selectedUserId }: UserListProps) {
  return (
    <div className="w-full max-w-xs border-r bg-background">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-2">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                selectedUserId === user.id ? "bg-accent" : "hover:bg-muted"
              }`}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                {user.online && <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{user.name}</div>
                {user.lastMessage && <div className="text-sm text-muted-foreground line-clamp-1">{user.lastMessage}</div>}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
