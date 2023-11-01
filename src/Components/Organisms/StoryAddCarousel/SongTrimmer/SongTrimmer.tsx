import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import styles from "./style.module.scss";
import Rings from "./Rings";
import { timeFrame } from "../../../../Utils/Constant";

type SongTrimmerProps = {
  link: string;
};

const SongTrimmer: React.FC<SongTrimmerProps> = ({ link }) => {
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(timeFrame);
  const [progress, setProgress] = useState(0);
  const [handleWidth, setHandleWidth] = useState(0); // Initial handle width for 10 seconds

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
    }

    setHandleWidth(4.9);
  }, [startTime, link]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;

      setProgress((currentTime / duration) * 100);

      if (currentTime >= endTime) {
        audioRef.current.play();
      }

      if (currentTime < startTime || currentTime >= endTime) {
        audioRef.current.currentTime = startTime;
      }
    }
  };

  const handleDrag = (e: any, data: any) => {
    const newStartTime = calculateTime(data.x, audioRef);
    setStartTime(newStartTime);

    // Calculate the change in position during drag
    const deltaX = data.x - data.lastX;

    // Calculate new end time based on the change in position
    const newEndTime = endTime + (deltaX / (audioRef.current?.parentElement?.clientWidth || 1)) * (audioRef.current?.duration || timeFrame);
    setEndTime(newEndTime);

    // Set handle width dynamically based on 10 seconds
    const durationInSeconds = audioRef.current?.duration || timeFrame;
    setHandleWidth((timeFrame / durationInSeconds) * 100);

    // Set inline style for handle width
    const handleElement = document.querySelector(".handle") as HTMLElement | null;
    if (handleElement) {
      handleElement.style.width = `${handleWidth}%`;
    }
  };

  const handleDragStop = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const calculateTime = (x: number, audioRef: React.RefObject<HTMLAudioElement>) => {
    const percent = x / (audioRef.current?.parentElement?.clientWidth || 1);
    const time = percent * (audioRef.current?.duration || timeFrame);
    return time;
  };

  return (
    <div className={styles.container}>
      <audio ref={audioRef} src={link} onTimeUpdate={handleTimeUpdate} autoPlay />
      <Rings />
      <div className={styles.progress_bar} style={{ width: `${progress}%` }} />

      <Draggable axis="x" handle=".handle" bounds="parent" onDrag={handleDrag} onStop={handleDragStop}>
        <div className={`handle ${styles.handle}`} style={{ width: `${handleWidth}%` }}></div>
      </Draggable>
    </div>
  );
};

export default SongTrimmer;
