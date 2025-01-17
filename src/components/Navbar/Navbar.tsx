"use client";
import { signOut } from "next-auth/react";
import { PublicProjectRoutes } from "@/utils/constants/ProjectRoutes";
import { Mail, Search } from "lucide-react";
import Link from "next/link";
import { NotificationBell } from "../Notifications/Notifications";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            SocialApp
          </Link>
          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:shadow-outline"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/notifications" className="text-gray-600 hover:text-blue-600">
              <NotificationBell />
            </Link>
            <Link href="/messages" className="text-gray-600 hover:text-blue-600">
              <Mail className="w-6 h-6" />
            </Link>
            <Avatar onClick={() => signOut({ redirect: true, redirectTo: PublicProjectRoutes.LOGIN })}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
