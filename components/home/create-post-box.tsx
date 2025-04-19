"use client"

import { useState } from "react"
import { ImageIcon, Video, Smile, Sparkles } from "lucide-react"
import { useApp } from "@/components/providers/app-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreatePostDialog } from "@/components/home/create-post-dialog"

export function CreatePostBox() {
  const { user } = useApp()
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} alt={user?.name || "User"} />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div
          onClick={() => setDialogOpen(true)}
          className="flex-1 bg-muted rounded-full px-4 py-2.5 text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors"
        >
          What's on your mind?
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-brand-pink hover:text-brand-pink hover:bg-brand-pink/10"
          onClick={() => setDialogOpen(true)}
        >
          <ImageIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Photo</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-brand-green hover:text-brand-green hover:bg-brand-green/10"
          onClick={() => setDialogOpen(true)}
        >
          <Video className="h-4 w-4" />
          <span className="hidden sm:inline">Video</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-brand-yellow hover:text-brand-yellow hover:bg-brand-yellow/10"
          onClick={() => setDialogOpen(true)}
        >
          <Smile className="h-4 w-4" />
          <span className="hidden sm:inline">Feeling</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-brand-purple hover:text-brand-purple hover:bg-brand-purple/10"
          onClick={() => setDialogOpen(true)}
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">AI Caption</span>
        </Button>
      </div>

      <CreatePostDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
