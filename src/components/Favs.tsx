import axios from "axios";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import VideoItem from "./VideoItem";
import { Video } from "../interfaces/Video";
import { useDispatch } from "react-redux";
import { setFavs } from "../redux/favs";

const URL = import.meta.env.VITE_BACKEND_URL;

const Favs = () => {
  interface User {
    id: number;
  }

  interface Favs {
    id: number;
    video: Video;
  }

  interface RootState {
    user: User;
    favoritos: Favs[];
  }

  //const [fav, setFavs] = useState<{ id: number; video: Video }[]>([]);
  //aca tengo que hacer un llamado a la api para traer los favoritos
  const user = useSelector((state: RootState) => state.user);
  const favs = useSelector((state: RootState) => state.favoritos);
  const userId = user.id;
  const dispatch = useDispatch();

  const loadFav = useCallback(async () => {
    try {
      if (userId) {
        const res = await axios.get(`${URL}/api/fav/favs`, {
          params: { userId: userId },
          withCredentials: true,
        });
        console.log("favoritosss", res.data);
        dispatch(setFavs(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  }, [userId, dispatch]);
  //realizar un map y voy a usar el componente item.tsx

  useEffect(() => {
    loadFav();
  }, [loadFav]);
  console.log("Favoritos en el componente:", favs);
  return (
    <div className="container mx-auto mt-5 p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {favs.length > 0 ? (
          favs.map((favorite) =>
            favorite.video ? (
              <VideoItem
                video={{
                  id: favorite.video.id,
                  title: favorite.video.title,
                  description: favorite.video.description,
                  url: favorite.video.url,
                }}
                key={favorite.id}
                loadFav={loadFav}
              />
            ) : (
              <div className="text-white">Video data not available</div>
            )
          )
        ) : (
          <div className="col-span-full flex justify-center items-center h-screen text-white">
            No favourite video available
          </div>
        )}
      </div>
    </div>
  );
};

export default Favs;
