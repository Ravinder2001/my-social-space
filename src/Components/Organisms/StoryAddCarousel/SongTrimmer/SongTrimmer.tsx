import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import Draggable from "react-draggable";
import styles from "./style.module.scss";
import Rings from "./Rings";
import { TimeFrame } from "../../../../Utils/Constant";

type SongTrimmerProps = {
  link: string;
  duration: number;
  setValues: Dispatch<SetStateAction<{ song: string; start: number; end: number; duration: number }>>;
};

const SongTrimmer: React.FC<SongTrimmerProps> = ({ link, setValues, duration }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState(0);
  const [handleWidth, setHandleWidth] = useState(0);

  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(TimeFrame);

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
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const newStartTime = calculateTime(data.x, audioRef);
    setStartTime(newStartTime);

    // Calculate the change in position during drag
    const deltaX = data.x - data.lastX;

    // Calculate new end time based on the change in position
    const newEndTime = endTime + (deltaX / (audioRef.current?.parentElement?.clientWidth || 1)) * (audioRef.current?.duration || TimeFrame);
    setEndTime(newEndTime);

    // Set handle width dynamically based on 10 seconds
    const durationInSeconds = audioRef.current?.duration || TimeFrame;
    console.log("🚀  file:eeeeee SongTrimmer.tsx:54  durationInSeconds:", durationInSeconds);
    setHandleWidth((TimeFrame / durationInSeconds) * 100);

    // Set inline style for handle width
    const handleElement = document.querySelector(".handle") as HTMLElement | null;
    if (handleElement) {
      handleElement.style.width = `${handleWidth}%`;
    }
  };

  const handleDragStop = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setValues((prev) => ({ ...prev, start: startTime, end: endTime }));
    }
  };

  const calculateTime = (x: number, audioRef: React.RefObject<HTMLAudioElement>) => {
    const percent = x / (audioRef.current?.parentElement?.clientWidth || 1);
    const time = percent * (audioRef.current?.duration || TimeFrame);
    return time;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
    }
  }, [startTime, link]);

  useEffect(() => {
    const durationInSeconds = duration || TimeFrame;

    setHandleWidth((TimeFrame / durationInSeconds) * 100);
  }, [duration]);
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
