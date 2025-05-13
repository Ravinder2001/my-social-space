import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Smile, Send } from "lucide-react";
import React, { type ChangeEvent, useRef, lazy, Suspense } from "react";

// Lazy load EmojiPicker to improve performance
const EmojiPicker = lazy(() =>
  import("emoji-picker-react").then((module) => {
    return { default: module.default };
  })
);
import type { EmojiClickData } from "emoji-picker-react";

interface MessageInputProps {
  messageInput: string;
  showEmojiPicker: boolean;
  isMobile: boolean;
  onMessageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onEmojiClick: (emojiData: EmojiClickData) => void;
  onToggleEmojiPicker: () => void;
}

export function MessageInput({
  messageInput,
  showEmojiPicker,
  isMobile,
  onMessageChange,
  onSendMessage,
  onEmojiClick,
  onToggleEmojiPicker,
}: MessageInputProps) {
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-t p-2 sm:p-4 bg-background">
      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
          <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <span className="sr-only">Attach image</span>
        </Button>
        <div className="relative flex-1">
          <Input
            placeholder="Type a message..."
            value={messageInput}
            onChange={onMessageChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSendMessage();
              }
            }}
            className="pr-8 sm:pr-10 h-8 sm:h-10 text-sm"
          />
          <div className="absolute right-0 top-0 h-full">
            {/* Emoji picker */}
            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-full right-0 z-50 mb-2"
                style={{
                  width: isMobile ? "calc(100vw - 2rem)" : "320px",
                  maxHeight: isMobile ? "40vh" : "400px",
                }}
              >
                <Suspense
                  fallback={
                    <div className="bg-background border rounded-lg shadow-lg p-4 w-full h-[40vh] sm:h-[400px] flex items-center justify-center">
                      <div className="text-sm text-muted-foreground">Loading emojis...</div>
                    </div>
                  }
                >
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    searchDisabled={false}
                    skinTonesDisabled={false}
                    width="100%"
                    height={isMobile ? "40vh" : "400px"}
                    previewConfig={{
                      showPreview: !isMobile,
                    }}
                    lazyLoadEmojis={true}
                  />
                </Suspense>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 sm:h-10 w-8 sm:w-10"
              onClick={onToggleEmojiPicker}
            >
              <Smile className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <span className="sr-only">Add emoji</span>
            </Button>
          </div>
        </div>
        <Button
          size="icon"
          className="rounded-full h-8 w-8 sm:h-10 sm:w-10 shrink-0"
          onClick={onSendMessage}
          disabled={!messageInput.trim()}
        >
          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}
