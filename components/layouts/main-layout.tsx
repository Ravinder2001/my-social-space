"use client"

import type React from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { Navbar } from "@/components/navigation/navbar"
import { FloatingActionButton } from "@/components/ui/floating-action-button"
import { SocketProvider } from "@/components/providers/socket-provider"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SocketProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 max-h-screen overflow-hidden"> {/* fix: prevent sidebar from scrolling */}
          <Navbar />
          <main className="flex-1 overflow-auto">{children}</main> {/* scroll only here */}
        </div>
        <FloatingActionButton />
      </div>
    </SocketProvider>
  )
}
