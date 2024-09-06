import axios from "axios";
import { Video } from "../interfaces/Video";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "@justinribeiro/lite-youtube";
import LiteYoutube from "./LiteYoutube";

const URL = import.meta.env.VITE_BACKEND_URL;
interface Props {
  video: Video;
  loadVideo: () => void;
}

const VideoItem = ({ video, loadVideo }: Props) => {
  const navigate = useNavigate();
  const handleDelete = async (id: number) => {
    await axios.delete(`${URL}/api/videos/video/${id}`);
    loadVideo();
    toast.success("Video Deleted!");
  };

  // Función para extraer el ID del video desde la URL de YouTube
  const getYoutubeVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  const videoId = getYoutubeVideoId(video.url);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-2">{video.title}</h2>
          <div className="space-x-3">
            <span
              className="cursor-pointer"
              onClick={() => navigate(`/video-form/${video.id}`)}
            >
              ✏️
            </span>
            <span
              onClick={() => video.id && handleDelete(video.id)}
              className="text-red-500 hover:font-medium cursor-pointer"
            >
              x
            </span>
          </div>
        </div>
        <h2 className="text-gray-700 mb-4">{video.description}</h2>
        <div className="relative pt-[56.25%]mt-4">
          {videoId ? (
            <LiteYoutube
              videoid={videoId}
              videotitle={video.title}
              posterquality="maxresdefault"
            />
          ) : (
            <p className="text-red-500">Invalid YouTube URL</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
