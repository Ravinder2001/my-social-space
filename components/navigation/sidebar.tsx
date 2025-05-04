"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Compass, Bell, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setLoggedOutUser } from "@/lib/Slices/UserSlice";

const navItems = [
  { name: "Home", href: "/", icon: Home, color: "text-brand-blue" },
  { name: "Messages", href: "/messages", icon: MessageSquare, color: "text-brand-green" },
  { name: "Explore", href: "/explore", icon: Compass, color: "text-brand-purple" },
  { name: "Notifications", href: "/notifications", icon: Bell, color: "text-brand-orange" },
  { name: "Profile", href: "/profile", icon: User, color: "text-brand-pink" },
  { name: "Settings", href: "/settings", icon: Settings, color: "text-brand-yellow" },
];

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  return (
    <aside className="hidden md:flex flex-col w-16 lg:w-64 h-screen border-r bg-card transition-all duration-300 ease-in-out">
      <div className="p-4 flex items-center justify-center lg:justify-start">
        <Link href="/" className="flex items-center space-x-2">
          <div className="size-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="hidden lg:inline-block font-bold text-xl text-gradient">Nexus</span>
        </Link>
      </div>

      <nav className="flex-1 py-8">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={item.href}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          size="lg"
                          className={cn(
                            "w-full justify-start gap-4 transition-all",
                            isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                            "group relative overflow-hidden px-4"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "size-5",
                              isActive ? "text-primary-foreground" : item.color,
                              "transition-transform group-hover:scale-110 duration-200"
                            )}
                          />
                          <span className="hidden lg:inline-block">{item.name}</span>
                          {isActive && <span className="absolute inset-y-0 left-0 w-1 bg-primary-foreground" />}
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="lg:hidden">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                className="w-full justify-start gap-4 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  signOut();
                  dispatch(setLoggedOutUser());
                }}
              >
                <LogOut className="size-5" />
                <span className="hidden lg:inline-block">Logout</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="lg:hidden">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}
