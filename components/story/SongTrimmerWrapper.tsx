import React, { useState } from "react";
import { Button } from "../ui/button";
import SongTrimmer from "./SongTrimmer";

// Wrapper for SongTrimmer that adds a close button and handles the trim data
const SongTrimmerWrapper = ({ songURL, onComplete, onCancel }: any) => {
  const [trimData, setTrimData] = useState({
    song: songURL,
    start: "0.00",
    end: "15.00",
    duration: "15.00",
  });

  // We only set trim data when explicitly called from the trimmer
  const handleTrimChange = (data: any) => {
    if (data) {
      setTrimData(data);
    }
  };

  const handleConfirm = () => {
    onComplete(trimData);
  };

  return (
    <div className="flex flex-col gap-4">
      <SongTrimmer songURL={songURL} onTrimChange={handleTrimChange} />

      <div className="flex gap-2 mt-4">
        <Button variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700" onClick={handleConfirm}>
          Confirm Selection
        </Button>
      </div>
    </div>
  );
};

export default SongTrimmerWrapper;
