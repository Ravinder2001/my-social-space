import React, { useState } from "react";
import { Button } from "../ui/button";

const sampleSongs = [
  {
    id: 1,
    title: "Jiya Re",
    cover: "https://c.saavncdn.com/024/Jab-Tak-Hai-Jaan-Hindi-2012-20190329150717-500x500.jpg",
    url: "https://aac.saavncdn.com/024/636458df7eb4cb44b1e6e6566b1da871_320.mp4",
  },
  {
    id: 2,
    title: "Wavy",
    cover: "https://c.saavncdn.com/178/Wavy-Punjabi-2024-20241115004315-500x500.jpg",
    url: "http://aac.saavncdn.com/178/cae2af10f5a1d1b9dd9a65323ce87f76_320.mp4",
  },
  {
    id: 3,
    title: "Namo Namo",
    cover: "https://c.saavncdn.com/367/Kedarnath-Hindi-2019-20190219-500x500.jpg",
    url: "http://aac.saavncdn.com/367/c5de371dc840f6fd7d55d8b1fecefa0c_320.mp4",
  },
  {
    id: 4,
    title: "Chaleya",
    cover: "https://c.saavncdn.com/047/Jawan-Hindi-2023-20230921190854-500x500.jpg",
    url: "http://aac.saavncdn.com/047/d1366530468931703ac909e82a3ee788_320.mp4",
  },
];

const SongSelection = ({ onSelectSong, onClose }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSongs = sampleSongs.filter(
    (song) => song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <input
          type="text"
          placeholder="Search for a song..."
          className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="max-h-80 overflow-y-auto">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="flex items-center p-3 hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-700"
            onClick={() => onSelectSong(song)}
          >
            <img src={song.cover} alt={song.title} className="w-12 h-12 rounded mr-3" />
            <div className="flex-1">
              <p className="font-medium text-white">{song.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700">
        <Button variant="outline" className="w-full" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default SongSelection;
