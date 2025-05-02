"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

// Types
interface AudioWaveProps {
  count?: number;
  active?: boolean;
}

interface DraggableHook {
  isDragging: boolean;
  setPosition: (x: number) => void;
}

interface SongTrimmerProps {
  songURL: string;
  defaultTrimDuration?: number; // Added configurable trim duration
  onTrimChange?: (data: any) => void;
}

// Audio wave component
const AudioWave: React.FC<AudioWaveProps> = ({ count = 40, active = false }) => {
  // Generate random heights for wave bars
  const generateBars = (): number[] => {
    return Array.from({ length: count }, () => {
      const height = Math.random() * 70 + 30; // Random height between 30% and 100%
      return height;
    });
  };

  const [bars] = useState<number[]>(generateBars());

  return (
    <div className="flex items-center justify-between h-full w-full absolute top-0 left-0">
      {bars.map((height, index) => (
        <div 
          key={index}
          className={`w-1 rounded-full ${active ? 'bg-blue-600' : 'bg-gray-400'}`}
          style={{ 
            height: `${height}%`,
            opacity: active ? 0.8 : 0.5
          }}
        />
      ))}
    </div>
  );
};

// Custom draggable hook
const useDraggable = (
  ref: React.RefObject<HTMLDivElement>, 
  onDrag: (x: number) => void, 
  onStop?: () => void
): DraggableHook => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const initialX = useRef<number>(0);
  const offsetX = useRef<number>(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent): void => {
      e.preventDefault();
      initialX.current = e.clientX - offsetX.current;
      setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging) return;
      const x = e.clientX - initialX.current;
      offsetX.current = x;
      onDrag(x);
    };

    const handleMouseUp = (): void => {
      if (isDragging) {
        setIsDragging(false);
        if (onStop) onStop();
      }
    };

    element.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [ref, isDragging, onDrag, onStop]);

  return {
    isDragging,
    setPosition: (x: number): void => {
      offsetX.current = x;
    }
  };
};

// Main component
const SongTrimmer: React.FC<SongTrimmerProps> = ({ 
  songURL, 
  defaultTrimDuration = 15, // Default to 15 seconds now
  onTrimChange 
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<any>(null);
  
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // Start playing by default
  const [duration, setDuration] = useState<number>(30); // Default duration
  const [progress, setProgress] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(defaultTrimDuration);
  const [handlePosition, setHandlePosition] = useState<number>(0);
  const [handleWidth, setHandleWidth] = useState<number>(50); // Will be recalculated

  // Calculate time based on position
  const calculateTime = (x: number): number => {
    if (!containerRef.current || !audioRef.current) return 0;
    
    const containerWidth = containerRef.current.offsetWidth;
    const percent = Math.max(0, Math.min(x, containerWidth)) / containerWidth;
    return percent * audioRef.current.duration;
  };

  // Handle drag movement
  const handleDrag = (x: number): void => {
    if (!containerRef.current || !audioRef.current) return;
    
    // Pause audio during drag
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    
    const containerWidth = containerRef.current.offsetWidth;
    const handleWidthPx = (handleWidth / 100) * containerWidth;
    
    // Calculate new position ensuring it stays within bounds
    let newPosition = Math.max(0, Math.min(x, containerWidth - handleWidthPx));
    setHandlePosition(newPosition);
    
    // Calculate new times
    const newStart = calculateTime(newPosition);
    const newEnd = calculateTime(newPosition + handleWidthPx);
    
    setStartTime(newStart);
    setEndTime(newEnd);
    
    // Update audio position without playing
    if (audioRef.current) {
      audioRef.current.currentTime = newStart;
    }
  };

  const handleDragStop = (): void => {
    if (audioRef.current && isPlaying) {
      // Resume playing after drag stops
      audioRef.current.play();
    }
    
    // Only notify about trim changes after dragging stops
    if (onTrimChange) {
      const trimData = {
        song: songURL,
        start: startTime.toFixed(2),
        end: endTime.toFixed(2),
        duration: (endTime - startTime).toFixed(2)
      };
      onTrimChange(trimData);
    }
  };

  // Use custom draggable hook
  const { isDragging } = useDraggable(handleRef, handleDrag, handleDragStop);

  // Load audio metadata and auto-play
  useEffect(() => {
    if (audioRef.current) {
      const handleMetadataLoaded = (): void => {
        setDuration(audioRef.current!.duration);
        
        // Use the configurable default trim duration
        const songTiming = defaultTrimDuration;
        const totalDuration = audioRef.current!.duration;
        
        // If the song is shorter than the default trim duration, use the whole song
        if (totalDuration <= songTiming) {
          setStartTime(0);
          setEndTime(totalDuration);
          setHandleWidth(100);
        } else {
          // Otherwise select the first portion based on songTiming
          setStartTime(0);
          setEndTime(songTiming);
          const width = (songTiming / totalDuration) * 100;
          setHandleWidth(width);
        }
        
        // Set the current time to the start position
        audioRef.current!.currentTime = 0;
        
        // Try to auto-play
        audioRef.current!.play().catch(err => {
          console.log("Auto-play failed:", err);
          setIsPlaying(false);
        });
      };
      
      audioRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
      
      // If audio is already loaded, call the handler directly
      if (audioRef.current.readyState >= 2) {
        handleMetadataLoaded();
      }
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
        }
      };
    }
  }, [songURL, defaultTrimDuration]);

  // Create separate effect for updating handle width when times change
  useEffect(() => {
    if (audioRef.current && audioRef.current.duration) {
      const width = ((endTime - startTime) / audioRef.current.duration) * 100;
      setHandleWidth(width);
    }
  }, [startTime, endTime]);

  // Handle time updates
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleTimeUpdate = (): void => {
      if (audio) {
        const currentTime = audio.currentTime;
        setProgress((currentTime / audio.duration) * 100);
        
        if (currentTime >= endTime) {
          audio.currentTime = startTime;
        }
      }
    };
    
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
    }
    
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [startTime, endTime]);

  // Handle play/pause
  const togglePlayPause = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = startTime;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full p-4 bg-gray-800 rounded-lg text-white shadow-lg">
      <audio ref={audioRef} src={songURL} preload="metadata" />
      
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={togglePlayPause}
          className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors shadow-md"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <div className="text-sm font-medium bg-gray-700 px-3 py-1 rounded">
          {startTime.toFixed(1)}s - {endTime.toFixed(1)}s
        </div>
      </div>
      
      <div 
        ref={containerRef} 
        className="w-full h-20 bg-gray-700 relative rounded-lg overflow-hidden shadow-inner"
      >
        {/* Audio waveform background */}
        <AudioWave count={50} />
        
        {/* Progress bar */}
        <div 
          className="h-full bg-gradient-to-r from-indigo-400 to-indigo-300 absolute top-0 left-0 pointer-events-none opacity-30"
          style={{ width: `${progress}%` }}
        />
        
        {/* Trimmer handle */}
        <div 
          ref={handleRef}
          className="h-full bg-indigo-600 absolute top-0 cursor-move flex items-center justify-center z-10"
          style={{ 
            left: `${handlePosition}px`, 
            width: `${handleWidth}%`,
            cursor: isDragging ? 'grabbing' : 'grab',
            boxShadow: '0 0 15px rgba(79, 70, 229, 0.6)'
          }}
        >
          {/* Active waves within the selection */}
          <AudioWave count={15} active={true} />
          
          {/* Handle borders */}
          <div className="h-full w-2 bg-white absolute left-0 z-20"></div>
          <div className="h-full w-2 bg-white absolute right-0 z-20"></div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400 flex items-center justify-center">
        <span className="px-2 py-1 bg-gray-700 rounded">Drag the indigo section to set your trim position ({defaultTrimDuration}s default)</span>
      </div>
    </div>
  );
};

export default SongTrimmer;