import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Video } from "../interfaces/Video";
import VideoItem from "./VideoItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./Search";

const URL = import.meta.env.VITE_BACKEND_URL;
interface User {
  id: number;
  name: string;
}
interface RootState {
  user: User;
}

interface VideoProps {
  searchResult: Video[];
  isSearching: boolean;
  setSearchResult: (videos: Video[]) => void;
  setIsSearching: (searching: boolean) => void;
}

const VideoList = ({
  searchResult,
  isSearching,
  setSearchResult,
  setIsSearching,
}: VideoProps) => {
  const user = useSelector((state: RootState) => state.user);
  const userId = user.id;
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVideos = useCallback(async () => {
    try {
      if (userId) {
        const res = await axios.get(`${URL}/api/videos/videos`, {
          params: { userId: userId },
          withCredentials: true,
        });
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const handleSearchResult = (result: Video[]) => {
    console.log("Resultados de búsqueda:", result); // Verifica los resultados
    setSearchResult(result); //guardamos los resultados en el estado
    setIsSearching(result.length > 0);
  };

  return (
    <div className="container mx-auto mt-5 p-10">
      <Search onSearchResult={handleSearchResult} />
      {loading ? (
        <p className="text-gray-500 flex items-center justify-center h-screen text-xl">
          Loading videos...
        </p>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {(isSearching ? searchResult : videos).map((video) => (
            <VideoItem video={video} key={video.id} loadVideo={loadVideos} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="text-white mb-4 text-6xl">
            Add a new video to get started!
          </p>
          <Link
            to="/video-form"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create a New Video
          </Link>
        </div>
      )}
    </div>
  );
};

export default VideoList;
