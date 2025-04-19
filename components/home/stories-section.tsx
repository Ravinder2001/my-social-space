"use client"

import React, { useRef } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreateStoryDialog } from "@/components/home/create-story-dialog"

// Mock data for stories
const stories = [
  { id: "add", type: "add" },
  { id: "1", name: "Emma", avatar: "/placeholder.svg?height=64&width=64", seen: false },
  { id: "2", name: "Noah", avatar: "/placeholder.svg?height=64&width=64", seen: false },
  { id: "3", name: "Olivia", avatar: "/placeholder.svg?height=64&width=64", seen: true },
  { id: "4", name: "Liam", avatar: "/placeholder.svg?height=64&width=64", seen: false },
  { id: "5", name: "Ava", avatar: "/placeholder.svg?height=64&width=64", seen: true },
  { id: "6", name: "William", avatar: "/placeholder.svg?height=64&width=64", seen: false },
  { id: "7", name: "Sophia", avatar: "/placeholder.svg?height=64&width=64", seen: false },
  { id: "8", name: "James", avatar: "/placeholder.svg?height=64&width=64", seen: true },
  { id: "9", name: "Isabella", avatar: "/placeholder.svg?height=64&width=64", seen: false },
  { id: "10", name: "Benjamin", avatar: "/placeholder.svg?height=64&width=64", seen: false },
]

export function StoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [storyDialogOpen, setStoryDialogOpen] = React.useState(false)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative bg-card rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Stories</h2>

      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Scroll left</span>
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-2 flex-shrink-0">
              {story.type === "add" ? (
                <button
                  onClick={() => setStoryDialogOpen(true)}
                  className="relative w-16 h-16 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors group"
                >
                  <div className="absolute inset-0.5 rounded-full bg-background flex items-center justify-center">
                    <Plus className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                </button>
              ) : (
                <button className="relative w-16 h-16 rounded-full group">
                  <div
                    className={`absolute inset-0 rounded-full ${story.seen ? "bg-muted" : "bg-gradient-to-tr from-brand-pink via-brand-purple to-brand-blue animate-pulse"}`}
                  />
                  <Avatar className="absolute inset-0.5 w-[calc(100%-4px)] h-[calc(100%-4px)] border-2 border-background group-hover:scale-105 transition-transform">
                    <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.name} />
                    <AvatarFallback>{story.name[0]}</AvatarFallback>
                  </Avatar>
                </button>
              )}
              <span className="text-xs font-medium">{story.type === "add" ? "Add Story" : story.name}</span>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>

      <CreateStoryDialog open={storyDialogOpen} onOpenChange={setStoryDialogOpen} />
    </div>
  )
}
