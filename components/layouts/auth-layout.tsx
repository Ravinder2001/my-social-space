"use client"

import type React from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "@/components/ui/button"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <header className="flex items-center justify-between p-4 md:p-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="size-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="font-bold text-xl text-gradient">Nexus</span>
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" asChild>
            <Link href={location.pathname === "/login" ? "/register" : "/login"}>
              {location.pathname === "/login" ? "Register" : "Login"}
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md animate-fade-in">{children}</div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Nexus. All rights reserved.</p>
      </footer>
    </div>
  )
}
