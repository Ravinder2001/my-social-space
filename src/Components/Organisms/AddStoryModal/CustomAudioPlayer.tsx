import React, { useState, useRef, useEffect } from "react";
import "./style.css";

interface CustomAudioPlayerProps {
  audioSrc: string;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [startTime, setStartTime] = useState(50);
  const [endTime, setEndTime] = useState(100);
  const [isDraggingStart, setDraggingStart] = useState(false);
  const [isDraggingEnd, setDraggingEnd] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
      
    }
  }, [startTime]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;

      // Update progress
      setProgress((currentTime / duration) * 100);

      // Pause if currentTime is greater than or equal to endTime
      if (currentTime >= endTime) {
        // audioRef.current.pause();
        audioRef.current.play();
      }

      // Check if the current time is within the range of the draggable box
      if (currentTime < startTime || currentTime >= endTime) {
        // If the current time is before the start time or after the end time,
        // set the current time to the start time
        audioRef.current.currentTime = startTime;
      }
    }
  };

  const handleStartDrag = () => {
    setDraggingStart(true);
  };

  const handleEndDrag = () => {
    setDraggingEnd(true);
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingStart) {
      const newStartTime = calculateTime(e, audioRef);
      setStartTime(newStartTime);
      setEndTime(newStartTime + 10);
    }
  };

  const handleDragEnd = () => {
    setDraggingStart(false);
    setDraggingEnd(false);

    // Start playback when dragging ends
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const calculateTime = (e: React.MouseEvent<HTMLDivElement>, audioRef: React.RefObject<HTMLAudioElement>) => {
    const { clientX, target } = e;
    const percent = (clientX - (target as HTMLDivElement).getBoundingClientRect().left) / (target as HTMLDivElement).clientWidth;
    const time = percent * (audioRef.current?.duration || 10);
    return time;
  };

  return (
    <div>
      <audio ref={audioRef} src={audioSrc}  onTimeUpdate={handleTimeUpdate} autoPlay />
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className="time-range" onMouseDown={handleStartDrag} onMouseMove={handleDrag} onMouseUp={handleDragEnd}>
        <div className="start-point" style={{ left: `${(startTime / (audioRef.current?.duration || 1)) * 100}%` }} />
        <div className="end-point" style={{ left: `${(endTime / (audioRef.current?.duration || 1)) * 100}%` }} />
      </div>
      <CustomAudioPlayer audioSrc="https://aac.saavncdn.com/047/d1366530468931703ac909e82a3ee788_320.mp4" />
    </div>
  );
};

export default CustomAudioPlayer;
