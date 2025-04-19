"use client"

import type React from "react"
import { useState, useRef } from "react"
import { X, ImageIcon, Camera, Loader2 } from "lucide-react"
import { useApp } from "@/components/providers/app-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function CreateStoryDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { user } = useApp()
  const { toast } = useToast()
  const [caption, setCaption] = useState("")
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setMediaFile(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setMediaPreview(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const removeFile = () => {
    setMediaFile(null)
    setMediaPreview(null)
  }

  const handleSubmit = async () => {
    if (!mediaPreview) {
      toast({
        title: "No media selected",
        description: "Please add a photo or video to your story",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Story created",
      description: "Your story has been published successfully",
    })

    // Reset form
    setCaption("")
    setMediaFile(null)
    setMediaPreview(null)
    setIsSubmitting(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">Create Story</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3 mt-2">
          <Avatar>
            <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} alt={user?.name || "User"} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <p className="font-medium">{user?.name || "User"}</p>
        </div>

        <div className="mt-4 space-y-4">
          {mediaPreview ? (
            <div className="relative group aspect-[9/16] max-h-[400px] rounded-md overflow-hidden mx-auto">
              <img
                src={mediaPreview || "/placeholder.svg"}
                alt="Story preview"
                className="w-full h-full object-cover"
              />
              <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={removeFile}>
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>

              <Textarea
                placeholder="Add a caption to your story..."
                className="absolute bottom-0 left-0 right-0 bg-black/50 text-white border-none resize-none placeholder:text-white/70 focus-visible:ring-0"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          ) : (
            <div
              className="aspect-[9/16] max-h-[400px] rounded-md border-2 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">Click to upload a photo or video for your story</p>
              <Button variant="secondary" className="mt-4">
                <ImageIcon className="mr-2 h-4 w-4" />
                Choose File
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <DialogFooter>
          <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting || !mediaPreview}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting Story...
              </>
            ) : (
              "Share to Story"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
