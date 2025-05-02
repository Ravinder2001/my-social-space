"use client";

import { useState, useRef, useEffect } from "react";
import { X, ImageIcon, Camera, Loader2, Music } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import SongSelection from "../story/SongSelection";
import SongTrimmerWrapper from "../story/SongTrimmerWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { UploadFile } from "../utils/functions";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { showToast } from "../utils/toast";

// Enhanced CreateStoryDialog component with music functionality
export function CreateStoryDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const UserDetails = useSelector((state: RootState) => state.user);

  const [caption, setCaption] = useState("");
  const [mediaPreview, setMediaPreview] = useState<{ url: string; key: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Music related states
  const [showSongSelection, setShowSongSelection] = useState(false);
  const [showSongTrimmer, setShowSongTrimmer] = useState(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [trimmedSongData, setTrimmedSongData] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [pendingAutoPlay, setPendingAutoPlay] = useState(false);

  const { fetchData: CreateStory,isLoading:StoryUploadLoading } = useApiFetch("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadResponse = await UploadFile([file]);
    const uploadedFiles = uploadResponse; // Array of {key, URL}

    // Update state
    setMediaPreview(uploadedFiles[0]);
  };

  const removeFile = () => {
    setMediaPreview(null);

    // Stop and destroy music when image is removed
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ""; // Clear the source
    }
    setSelectedSong(null);
    setTrimmedSongData(null);
    setIsAudioPlaying(false);
    setPendingAutoPlay(false);
  };

  const handleSelectSong = (song: any) => {
    setSelectedSong(song);
    setShowSongSelection(false);
    setShowSongTrimmer(true);

    // Stop current audio playback when selecting a new song
    if (audioRef.current) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleTrimComplete = (trimData: any) => {
    setTrimmedSongData(trimData);
    setShowSongTrimmer(false);
    setPendingAutoPlay(true); // Set flag to attempt autoplay when dialog is fully loaded/visible
  };

  // Handle trying to play audio when closed trimmer dialog
  useEffect(() => {
    if (pendingAutoPlay && trimmedSongData && !showSongTrimmer) {
      // Short delay to ensure the UI has settled after closing the trimmer
      const timer = setTimeout(() => {
        attemptAutoPlay();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pendingAutoPlay, trimmedSongData, showSongTrimmer]);

  // Attempt to autoplay audio
  const attemptAutoPlay = () => {
    if (!audioRef.current || !trimmedSongData) return;

    // Set up the audio source and start time
    audioRef.current.src = trimmedSongData.song;
    audioRef.current.currentTime = parseFloat(trimmedSongData.start);

    // Try to play
    const playPromise = audioRef.current.play();

    // Handle autoplay restrictions
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsAudioPlaying(true);
          setPendingAutoPlay(false);
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error);
          setIsAudioPlaying(false);
          // Keep pendingAutoPlay true, so user can manually trigger it
        });
    }
  };

  // Handle audio looping based on trim values
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio && trimmedSongData) {
        const endTime = parseFloat(trimmedSongData.end);
        if (audio.currentTime >= endTime) {
          audio.currentTime = parseFloat(trimmedSongData.start);
        }
      }
    };

    // Reset audio state if media is removed
    if (!mediaPreview) {
      if (audio) {
        audio.pause();
        audio.src = "";
      }
      setIsAudioPlaying(false);
      setSelectedSong(null);
      setTrimmedSongData(null);
      setPendingAutoPlay(false);
    }

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.pause();
      }
    };
  }, [trimmedSongData, mediaPreview]);

  const removeSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ""; // Clear the source
    }
    setSelectedSong(null);
    setTrimmedSongData(null);
    setIsAudioPlaying(false);
    setPendingAutoPlay(false);
  };

  const handleSubmit = async () => {
    if (!mediaPreview) {
      return;
    }

    await CreateStory(CONSTANTS.API_ROUTES.CREATE_STORY, {
      method: "POST",
      data: {
        caption,
        media_url: mediaPreview.key,
        media_type: "IMAGE",
        song_name: trimmedSongData.song,
        song_start_time: Number(trimmedSongData.start),
        song_end_time: Number(trimmedSongData.end),
      },
    }).then((res) => {
      if (res.success == 1) {
        showToast({ message: "Story Uploaded Succesfully", type: "success" });
        onOpenChange(false);
      }
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">Create Story</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-3 mt-2">
            <Avatar>
              <AvatarImage src={UserDetails.profile_picture} alt={UserDetails.name} />
              <AvatarFallback>{UserDetails.name[0]}</AvatarFallback>
            </Avatar>
            <p className="font-medium">{UserDetails.name}</p>
          </div>

          <div className="mt-4 space-y-4">
            {mediaPreview ? (
              <div className="relative group aspect-[9/16] max-h-[400px] rounded-md overflow-hidden mx-auto">
                <img src={mediaPreview.url || "/placeholder.svg"} alt="Story preview" className="w-full h-full object-cover" />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={removeFile}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>

                {/* Music badge when song is selected */}
                {selectedSong && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white rounded-full px-3 py-1 flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    <span className="text-xs truncate max-w-[120px]">{selectedSong.title}</span>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0 text-white hover:bg-white/20" onClick={removeSong}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                <Textarea
                  placeholder="Add a caption to your story..."
                  className="absolute bottom-0 left-0 right-0 bg-black/50 text-white border-none resize-none placeholder:text-white/70 focus-visible:ring-0"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
            ) : (
              <div
                className="aspect-[9/16] max-h-[400px] rounded-md border-2 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-muted/50 transition-colors w-full"
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

            <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />

            {/* Audio player (hidden) */}
            <audio ref={audioRef} />
          </div>

          {/* Music controls - only show when media is uploaded */}
          {mediaPreview && (
            <div className="flex gap-2 my-2">
              {selectedSong ? null : (
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowSongSelection(true)}>
                  <Music className="mr-2 h-4 w-4" />
                  Add Music
                </Button>
              )}
            </div>
          )}

          <DialogFooter>
            <Button className="w-full" onClick={handleSubmit} disabled={StoryUploadLoading || !mediaPreview}>
              {StoryUploadLoading ? (
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

      {/* Song Selection Dialog */}
      <Dialog open={showSongSelection} onOpenChange={setShowSongSelection}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-center">Select Music</DialogTitle>
          </DialogHeader>
          <SongSelection onSelectSong={handleSelectSong} onClose={() => setShowSongSelection(false)} />
        </DialogContent>
      </Dialog>

      {/* Song Trimmer Dialog */}
      <Dialog open={showSongTrimmer} onOpenChange={setShowSongTrimmer}>
        <DialogContent className="sm:max-w-[500px] bg-gray-900 p-0">
          <DialogHeader className="p-4">
            <DialogTitle className="text-center">Trim Song</DialogTitle>
          </DialogHeader>
          {selectedSong && (
            <div className="px-4 pb-4 bg-gray-900">
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-800 rounded-md">
                <img src={selectedSong.cover} alt={selectedSong.title} className="w-12 h-12 rounded" />
                <div>
                  <p className="font-medium text-white">{selectedSong.title}</p>
                  <p className="text-sm text-gray-400">{selectedSong.artist}</p>
                </div>
              </div>

              <SongTrimmerWrapper songURL={selectedSong.url} onComplete={handleTrimComplete} onCancel={() => setShowSongTrimmer(false)} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateStoryDialog;
