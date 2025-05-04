"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateStoryDialog } from "@/components/home/create-story-dialog";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { StoryType } from "../utils/CommanTypes";
import { StoryViewModal } from "./story-view-modal";

export function StoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [storyDialogOpen, setStoryDialogOpen] = React.useState(false);
  const [stories, setStories] = useState<StoryType[]>([]);
  const [storyViewOpen, setStoryViewOpen] = useState<{ selectedStory: StoryType | null; status: boolean }>({
    selectedStory: null,
    status: false,
  });

  const { fetchData: fetchStories } = useApiFetch(CONSTANTS.API_ROUTES.GET_STORIES);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleStoryChange = (story: StoryType | null) => {
    setStoryViewOpen({
      selectedStory: story,
      status: !storyViewOpen.status,
    });
  };

  useEffect(() => {
    fetchStories().then((res: any) => {
      if (res.success == 1) {
        setStories(res.data);
      }
    });
  }, []);

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
          <div className="flex flex-col items-center space-y-2 flex-shrink-0">
            <button
              onClick={() => setStoryDialogOpen(true)}
              className="relative w-16 h-16 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors group"
            >
              <div className="absolute inset-0.5 rounded-full bg-background flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
            </button>
            <span className="text-xs font-medium">Add Story</span>
          </div>
          {stories.map((story, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 flex-shrink-0" onClick={() => handleStoryChange(story)}>
              <button className="relative w-16 h-16 rounded-full group">
                <div
                  className={`absolute inset-0 rounded-full ${
                    false ? "bg-muted" : "bg-gradient-to-tr from-brand-pink via-brand-purple to-brand-blue animate-pulse"
                  }`}
                />
                <Avatar className="absolute inset-0.5 w-[calc(100%-4px)] h-[calc(100%-4px)] border-2 border-background group-hover:scale-105 transition-transform">
                  <AvatarImage src={story.profile_picture} alt={story.name} />
                  <AvatarFallback>{story.name[0]}</AvatarFallback>
                </Avatar>
              </button>

              <span className="text-xs font-medium">{story.name}</span>
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
      {storyViewOpen.status && storyViewOpen.selectedStory && (
        <StoryViewModal open={storyViewOpen.status} onOpenChange={() => handleStoryChange(null)} stories={storyViewOpen.selectedStory} />
      )}
    </div>
  );
}
