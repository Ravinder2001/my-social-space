"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreatePostDialog } from "@/components/home/create-post-dialog"
import { usePathname } from "next/navigation"

export function FloatingActionButton() {
  const [postDialogOpen, setPostDialogOpen] = useState(false)
  const pathname = usePathname()

  // Only show on home page
  if (pathname !== "/") {
    return null
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="size-14 rounded-full shadow-lg transition-all duration-300 ease-in-out bg-primary hover:bg-primary/90"
          onClick={() => setPostDialogOpen(true)}
        >
          <Plus className="size-6 transition-transform animate-in" />
          <span className="sr-only">Create Post</span>
        </Button>
      </div>

      <CreatePostDialog open={postDialogOpen} onOpenChange={setPostDialogOpen} />
    </>
  )
}
