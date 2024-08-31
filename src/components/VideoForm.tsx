import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Video } from "../interfaces/Video";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type inputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const VideoForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const videoId = Number(params.id);

  const [video, setVideo] = useState<Video>({
    title: "",
    description: "",
    url: "",
  });

  const handleChange = (e: inputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoId) {
      try {
        await axios.post("http://localhost:8000/api/videos/video", video);
        toast.success("New video added!");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.put(
          `http://localhost:8000/api/videos/video/${videoId}`,
          video
        );
        navigate("/");
        toast.success("A video was updated!");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getVideo = async (id: number) => {
    const res = await axios.get(`http://localhost:8000/api/videos/video/${id}`);
    const { title, url, description } = res.data;
    setVideo({ title, url, description });
  };

  useEffect(() => {
    if (videoId) {
      getVideo(videoId);
    } else {
      setVideo({ title: "", description: "", url: "" });
    }
  }, [videoId]);

  return (
    <div className="flex flex-col items-center w-full justify-center py-10">
      <form
        className="w-full max-w-lg p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-semibold mb-6">
          {videoId ? "Update Video" : "Create a Video"}
        </h3>
        <div className="mb-4">
          <input
            type="text"
            value={video.title}
            onChange={handleChange}
            name="title"
            placeholder="Write a title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={video.url}
            onChange={handleChange}
            name="url"
            placeholder="Insert url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <textarea
            value={video.description}
            onChange={handleChange}
            name="description"
            placeholder="Write a description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
        >
          {videoId ? "Update Video" : "Create a video"}
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
