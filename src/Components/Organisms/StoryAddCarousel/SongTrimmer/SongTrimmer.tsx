import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import styles from "./style.module.scss";

type SongTrimmerProps = {
  link: string;
};

const SongTrimmer: React.FC<SongTrimmerProps> = ({ link }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [startTime, setStartTime] = useState(50);
  const [endTime, setEndTime] = useState(100);
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

    // Calculate new end time based on the handle position
    const handleWidth = data.node.clientWidth;
    setEndTime(newStartTime + handleWidth);
  };

  const handleDragStop = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const calculateTime = (x: number, audioRef: React.RefObject<HTMLAudioElement>) => {
    const percent = x / (audioRef.current?.parentElement?.clientWidth || 1);
    const time = percent * (audioRef.current?.duration || 10);
    return time;
  };

  return (
    <div className={styles.head}>
      <div className={styles.sss}>
        <audio ref={audioRef} src={link} onTimeUpdate={handleTimeUpdate} autoPlay />
        <div className="progress-bar" style={{ width: `${progress}%` }} />
        <div className={styles.container}>
          <Draggable axis="x" handle=".handle" bounds="parent" onDrag={handleDrag} onStop={handleDragStop}>
            <div className={`handle ${styles.handle}`}>Drag from here</div>
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default SongTrimmer;
