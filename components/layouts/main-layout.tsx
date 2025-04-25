"use client"

import type React from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { Navbar } from "@/components/navigation/navbar"
import { FloatingActionButton } from "@/components/ui/floating-action-button"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 max-h-screen overflow-hidden"> {/* fix: prevent sidebar from scrolling */}
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main> {/* scroll only here */}
      </div>
      <FloatingActionButton />
    </div>
  )
}
