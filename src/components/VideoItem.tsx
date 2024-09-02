import axios from "axios";
import { Video } from "../interfaces/Video";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_BACKEND_URL 
interface Props {
  video: Video;
  loadVideo: () => void;
}

const VideoItem = ({ video, loadVideo }: Props) => {
  const navigate = useNavigate();
  const handleDelete = async (id: number) => {
    await axios.delete(`${URL}/api/videos/video/${id}`);
    loadVideo();
    toast.success("Video Deleted!")
  };
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
          <ReactPlayer
            url={video.url}
            width="100%"
            height="300px"
            controls={true}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
