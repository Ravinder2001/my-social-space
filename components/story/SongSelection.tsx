import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Button } from "../ui/button";
import useApiFetch from "@/hooks/use-api-fetch";
import CONSTANTS from "../utils/constants";
import { Loader2, Search, Music, X } from "lucide-react";

const SongSelection = ({ onSelectSong, onClose }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const searchInputRef = useRef<any>(null);

  // Default songs to show when no search is performed
  const sampleSongs = [
    {
      id: 1,
      title: "Jiya Re",
      cover: "https://c.saavncdn.com/024/Jab-Tak-Hai-Jaan-Hindi-2012-20190329150717-500x500.jpg",
      url: "https://aac.saavncdn.com/024/636458df7eb4cb44b1e6e6566b1da871_320.mp4",
      artist: "",
    },
    {
      id: 2,
      title: "Wavy",
      cover: "https://c.saavncdn.com/178/Wavy-Punjabi-2024-20241115004315-500x500.jpg",
      url: "http://aac.saavncdn.com/178/cae2af10f5a1d1b9dd9a65323ce87f76_320.mp4",
      artist: "",
    },
    {
      id: 3,
      title: "Namo Namo",
      cover: "https://c.saavncdn.com/367/Kedarnath-Hindi-2019-20190219-500x500.jpg",
      url: "http://aac.saavncdn.com/367/c5de371dc840f6fd7d55d8b1fecefa0c_320.mp4",
      artist: "",
    },
    {
      id: 4,
      title: "Chaleya",
      cover: "https://c.saavncdn.com/047/Jawan-Hindi-2023-20230921190854-500x500.jpg",
      url: "http://aac.saavncdn.com/047/d1366530468931703ac909e82a3ee788_320.mp4",
      artist: "",
    },
  ];

  // API search functionality
  const { fetchData: searchSongs, isLoading } = useApiFetch("");

  // Handle search when typing
  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Only search if at least 3 characters are typed
    if (value.length >= 3) {
      try {
        await searchSongs(`${CONSTANTS.JIO_SAAVN_API}${value}`).then((res: any) => {
          const formattedSongs = res.data.results.map((item: any) => ({
            id: item.id,
            title: item.name,
            cover: item.image ? item.image[item.image.length - 1].url : null,
            url: item.downloadUrl ? item.downloadUrl[item.downloadUrl.length - 1].url : null,
            artist: item.artists.primary[0].name,
          }));
          setSongs(formattedSongs);
        });
      } catch (error) {
        console.error("Error searching songs:", error);
      } 
    } else {
      // Reset to sample songs when search is cleared
      setSongs([]);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchTerm("");
    setSongs([]);
    searchInputRef.current?.focus();
  };

  // Focus input on component mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Songs to display (search results or sample songs)
  const displayedSongs = songs.length > 0 ? songs : sampleSongs;

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl w-full max-w-md">
      <div className="p-4 border-b border-gray-700 bg-gray-800">
        <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
          <Music className="mr-2" size={18} />
          Select a Song
        </h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for a song..."
            className="w-full bg-gray-700 text-white pl-10 pr-10 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {searchTerm.length > 0 && searchTerm.length < 3 && <p className="text-xs text-gray-400 mt-1">Type at least 3 characters to search</p>}
      </div>

      <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
            <span className="ml-2 text-gray-300">Searching...</span>
          </div>
        ) : displayedSongs.length > 0 ? (
          displayedSongs.map((song) => (
            <div
              key={song.id}
              className="flex items-center p-3 hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-700"
              onClick={() => onSelectSong(song)}
            >
              {song.cover ? (
                <img src={song.cover} alt={song.title} className="w-12 h-12 rounded-md object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-md bg-gray-700 flex items-center justify-center">
                  <Music className="text-gray-400" size={24} />
                </div>
              )}
              <div className="flex-1 ml-3">
                <p className="font-medium text-white truncate">{song.title}</p>
                <p className="text-xs text-gray-400 truncate">{song.artist || "Unknown Artist"}</p>
              </div>
            </div>
          ))
        ) : searchTerm.length >= 3 ? (
          <div className="p-8 text-center text-gray-400">No songs found. Try a different search term.</div>
        ) : null}
      </div>

      <div className="p-3 border-t border-gray-700 bg-gray-800 flex justify-between">
        <Button variant="outline" className="w-full mr-2 hover:bg-gray-700" onClick={onClose}>
          Cancel
        </Button>
        {searchTerm.length >= 3 && (
          <Button
            className="w-full ml-2 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => searchSongs(`${CONSTANTS.JIO_SAAVN_API}${searchTerm}`)}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
            Search
          </Button>
        )}
      </div>
    </div>
  );
};

export default SongSelection;
