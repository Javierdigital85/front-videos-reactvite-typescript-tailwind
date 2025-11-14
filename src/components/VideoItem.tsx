import axios from "axios";
import { Video } from "../interfaces/Video";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "@justinribeiro/lite-youtube";
import LiteYoutube from "./LiteYoutube";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFavs } from "../redux/favs";

const URL = import.meta.env.VITE_BACKEND_URL;
interface Props {
  video: Video;
  loadVideo?: () => void;
  loadFav?: () => void;
}

interface User {
  id: number;
  name: string;
}

interface Favs {
  id: number;
  videoId: number;
}

interface RootState {
  user: User;
  favoritos: Favs[];
}

const VideoItem = ({ video, loadVideo, loadFav }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const favs = useSelector((state: RootState) => state.favoritos);
  console.log(favs, "showme your value");
  const userId = user.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Identificar el `favId` del video específico en favoritos
  const favItem = favs.find((fav) => fav.videoId === video.id);
  const favId = favItem?.id;

  const handleDeleteFav = async (favId: number) => {
    console.log("handleDeleteFav called with favId:", favId);
    try {
      await axios.delete(`${URL}/api/fav/delete/${favId}`);
      if (loadFav) {
        loadFav(); // Llamamos a loadFav si está definido
      }
      toast.success("favs Deleted!");
      console.log("llega la eliminación?????");
    } catch (error) {
      console.log("Error removing favourite:", error);
    }
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${URL}/api/videos/video/${id}`);
    if (loadVideo) {
      loadVideo(); // Llamamos a loadVideo si está definido
    }
    toast.success("Video Deleted!");
    console.log("llega??");
  };

  // Función para extraer el ID del video desde la URL de YouTube
  const getYoutubeVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  const videoId = getYoutubeVideoId(video.url);

  const handleClick = async () => {
    try {
      const res = await axios.post(`${URL}/api/fav/register`, {
        userId: userId,
        videoId: video.id,
      });

      dispatch(setFavs([...favs, res.data]));
      toast.success("Video added to favourites!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-5">
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
            {favId ? (
              <span
                onClick={() => favId && handleDeleteFav(favId)}
                className="text-red-500 hover:font-medium cursor-pointer"
              >
                x
              </span>
            ) : (
              <span
                onClick={() => video.id && handleDelete(video.id)}
                className="text-red-500 hover:font-medium cursor-pointer"
              >
                x
              </span>
            )}

            <span onClick={handleClick} className="cursor-pointer">
              💙
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
