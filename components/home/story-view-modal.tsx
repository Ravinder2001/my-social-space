"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Volume2, VolumeX, Pause, Play, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatTimeAgo } from "../utils/functions";
import { useMediaQuery } from "@/hooks/use-media-query";
import { StoryType } from "../utils/CommanTypes";

type StoryViewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stories: StoryType;
};

export function StoryViewModal({ open, onOpenChange, stories }: StoryViewModalProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallHeight = useMediaQuery("(max-height: 700px)");

  const currentStory = stories.stories[currentStoryIndex];
  const storyDuration = 5000; // 5 seconds per story without music

  // Calculate actual duration based on song if present
  const calculateDuration = () => {
    if (currentStory.song_name && currentStory.song_start_time && currentStory.song_end_time) {
      const startTime = Number.parseInt(currentStory.song_start_time);
      const endTime = Number.parseInt(currentStory.song_end_time);
      return (endTime - startTime) * 1000; // Convert to milliseconds
    }
    return storyDuration;
  };

  const duration = calculateDuration();

  // Helper function to clean up timers and audio
  const cleanupResources = () => {
    // Clear timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    // Stop and clean up audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = ""; // Clear source to fully stop audio
    }
  };

  // Handle story navigation
  const goToNextStory = () => {
    cleanupResources();

    // Reset states
    setImageLoaded(false);
    setProgress(0);
    setAudioLoaded(false);

    // Move to next story
    if (currentStoryIndex < stories.stories.length - 1) {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    } else {
      // Loop back to the first story
      setCurrentStoryIndex(0);
    }
  };

  const goToPrevStory = () => {
    cleanupResources();

    // Reset states
    setImageLoaded(false);
    setProgress(0);
    setAudioLoaded(false);

    // Move to previous story
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
    } else {
      // Loop to the last story
      setCurrentStoryIndex(stories.stories.length - 1);
    }
  };

  // Handle pause/play
  const togglePause = () => {
    setIsPaused(!isPaused);
    if (audioRef.current) {
      if (isPaused) {
        audioRef.current.play().catch((err) => console.error("Error playing audio:", err));
      } else {
        audioRef.current.pause();
      }
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  // Initialize audio when modal opens or story changes
  useEffect(() => {
    if (!open) return;

    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      const audio = new Audio();
      audio.addEventListener("canplaythrough", () => {
        setAudioLoaded(true);
        if (!isPaused && open) {
          audio.play().catch((err) => console.error("Error auto-playing audio:", err));
        }
      });
      audioRef.current = audio;
    }

    // Reset audio loaded state
    setAudioLoaded(false);

    // Set up the audio if there's a song
    if (currentStory.song_name) {
      audioRef.current.src = currentStory.song_name;
      audioRef.current.currentTime = currentStory.song_start_time ? Number.parseInt(currentStory.song_start_time) : 0;
      audioRef.current.muted = isMuted;
      audioRef.current.load(); // Force load the audio
    } else {
      // No song for this story, mark as loaded
      setAudioLoaded(true);
    }

    return () => {
      if (audioRef.current && !open) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Clear source to fully stop audio
      }
    };
  }, [open, currentStoryIndex, currentStory.song_name]);

  // Setup timer and progress for story advancement
  useEffect(() => {
    if (!open) return;

    // Don't start timers if paused
    if (isPaused) return;

    // Wait for both image and audio to be loaded before starting timers
    const shouldWaitForAudio = !!currentStory.song_name;
    if ((shouldWaitForAudio && !audioLoaded) || !imageLoaded) {
      return;
    }

    // Play audio if it exists and is loaded
    if (currentStory.song_name && audioRef.current && audioLoaded) {
      audioRef.current.play().catch((err) => console.error("Error playing audio:", err));
    }

    // Setup progress interval
    const progressStep = 100 / (duration / 100); // Update every 100ms
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressStep;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    // Setup timer for next story
    timerRef.current = setTimeout(() => {
      goToNextStory();
    }, duration);

    return () => {
      // Cleanup
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentStoryIndex, open, isPaused, audioLoaded, imageLoaded]);

  // Handle progress completion
  useEffect(() => {
    if (progress >= 100) {
      goToNextStory();
    }
  }, [progress]);

  // Handle modal close
  useEffect(() => {
    if (!open) {
      cleanupResources();
      setProgress(0);
      setIsPaused(false);
      setAudioLoaded(false);
      setImageLoaded(false);
      setCurrentStoryIndex(0); // Reset to first story when modal closes
    }
  }, [open]);

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      cleanupResources();
    };
  }, []);

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Custom onOpenChange handler to ensure audio stops when dialog closes
  const handleOpenChange = (newOpenState: boolean) => {
    if (!newOpenState) {
      cleanupResources();
    }
    onOpenChange(newOpenState);
  };

  if (!currentStory) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 sm:max-w-screen-md w-full h-[85vh] sm:h-[80vh] max-h-[90vh] flex flex-col bg-black text-white overflow-hidden">
        {/* Story header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-2 sm:p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
          {/* Progress indicators */}
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-1 sm:p-2">
            {stories.stories.map((_, index) => (
              <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full bg-white transition-all duration-100 ease-linear",
                    index < currentStoryIndex ? "w-full" : index > currentStoryIndex ? "w-0" : ""
                  )}
                  style={index === currentStoryIndex ? { width: `${progress}%` } : undefined}
                />
              </div>
            ))}
          </div>

          {/* User info */}
          <div className="flex items-center gap-2 sm:gap-3 mt-4">
            <Avatar className={cn("border-2 border-primary", isMobile ? "h-8 w-8" : "h-10 w-10")}>
              <AvatarImage src={stories.profile_picture || "/placeholder.svg"} alt={stories.name} />
              <AvatarFallback>{stories.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className={cn("font-semibold", isMobile ? "text-sm" : "text-base")}>{stories.name}</p>
              <p className="text-xs text-gray-300">{formatTimeAgo(currentStory.created_at)}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "icon"}
              className={cn("rounded-full text-white hover:bg-white/20", isMobile ? "h-7 w-7" : "h-8 w-8")}
              onClick={togglePause}
            >
              {isPaused ? <Play className={cn(isMobile ? "h-3 w-3" : "h-4 w-4")} /> : <Pause className={cn(isMobile ? "h-3 w-3" : "h-4 w-4")} />}
            </Button>

            <Button
              variant="ghost"
              size={isMobile ? "sm" : "icon"}
              className={cn("rounded-full text-white hover:bg-white/20", isMobile ? "h-7 w-7" : "h-8 w-8")}
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className={cn(isMobile ? "h-3 w-3" : "h-4 w-4")} /> : <Volume2 className={cn(isMobile ? "h-3 w-3" : "h-4 w-4")} />}
            </Button>

            {currentStory.ownStory && (
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "icon"}
                className={cn("rounded-full text-white hover:bg-white/20", isMobile ? "h-7 w-7" : "h-8 w-8")}
              >
                <MoreVertical className={cn(isMobile ? "h-3 w-3" : "h-4 w-4")} />
              </Button>
            )}

            <Button
              variant="ghost"
              size={isMobile ? "sm" : "icon"}
              className={cn("rounded-full text-white hover:bg-white/20", isMobile ? "h-7 w-7" : "h-8 w-8")}
              onClick={() => handleOpenChange(false)}
            >
              <X className={cn(isMobile ? "h-3 w-3" : "h-4 w-4")} />
            </Button>
          </div>
        </div>

        {/* Story content */}
        <div className="relative flex-1 flex items-center justify-center bg-black">
          {currentStory.media_type === "IMAGE" ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                ref={imageRef}
                src={currentStory.media_url || "/placeholder.svg?height=800&width=600"}
                alt="Story"
                className={cn("max-h-full max-w-full object-contain transition-opacity duration-300", imageLoaded ? "opacity-100" : "opacity-0")}
                style={{
                  objectFit: "contain",
                  maxHeight: isSmallHeight ? "65vh" : "75vh",
                }}
                onLoad={handleImageLoad}
              />

              {/* Caption overlay - only show if there's a caption and image is loaded */}
              {currentStory.caption && imageLoaded && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 z-10">
                  <p className="text-white font-medium leading-snug text-sm sm:text-base">{currentStory.caption}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <video
                src={currentStory.media_url}
                autoPlay
                muted={isMuted}
                playsInline
                className="max-h-full max-w-full object-contain"
                style={{
                  objectFit: "contain",
                  maxHeight: isSmallHeight ? "65vh" : "75vh",
                }}
                onLoadedData={() => setImageLoaded(true)}
              />

              {/* Caption overlay for videos */}
              {currentStory.caption && imageLoaded && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 z-10">
                  <p className="text-white font-medium leading-snug text-sm sm:text-base">{currentStory.caption}</p>
                </div>
              )}
            </>
          )}

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 text-white hover:bg-black/40",
              isMobile ? "h-8 w-8" : "h-10 w-10"
            )}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevStory();
            }}
          >
            <ChevronLeft className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")} />
            <span className="sr-only">Previous story</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 text-white hover:bg-black/40",
              isMobile ? "h-8 w-8" : "h-10 w-10"
            )}
            onClick={(e) => {
              e.stopPropagation();
              goToNextStory();
            }}
          >
            <ChevronRight className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")} />
            <span className="sr-only">Next story</span>
          </Button>

          {/* Invisible buttons for left/right click navigation */}
          <button className="absolute left-0 top-0 w-1/2 h-full opacity-0" onClick={goToPrevStory} aria-hidden="true" />
          <button className="absolute right-0 top-0 w-1/2 h-full opacity-0" onClick={goToNextStory} aria-hidden="true" />
        </div>

        {/* Loading indicator for audio */}
        {currentStory.song_name && !audioLoaded && !isPaused && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full text-xs">
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Loading audio...</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
