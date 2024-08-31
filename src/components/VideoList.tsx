import axios from "axios";
import { useEffect, useState } from "react";
import { Video } from "../interfaces/Video";
import VideoItem from "./VideoItem";
import { Link } from "react-router-dom";

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVideos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/videos/videos");
      setVideos(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-gray-500">Loading videos...</p>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-center">
          {videos.map((video) => (
            <VideoItem video={video} key={video.id} loadVideo={loadVideos} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-40">
          <p className="text-gray-500 mb-4">
            No videos available. Add a new video to get started!
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
