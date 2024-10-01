import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoList from "./components/VideoList";
import VideoForm from "./components/VideoForm";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUser } from "./redux/user";
import ForgotPassword from "./components/ForgotPassword";
import RepeatPassword from "./components/RepeatPassword";
import { Video } from "./interfaces/Video";

function App() {
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState<Video[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const userName = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/me", {
          withCredentials: true,
        });
        dispatch(setUser(res.data));
        console.log("la data", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    userName();
  }, [dispatch]);

  const clearSearch = () => {
    setSearchResult([]);
    setIsSearching(false);
  };

  return (
    <>
      <div>
        <BrowserRouter>
          <ToastContainer />
          <Navbar clearSearch={clearSearch} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/videolist"
              element={
                <VideoList
                  searchResult={searchResult}
                  isSearching={isSearching}
                  setSearchResult={setSearchResult}
                  setIsSearching={setIsSearching}
                />
              }
            />
            <Route path="/video-form" element={<VideoForm />} />
            <Route path="/video-form/:id" element={<VideoForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/repeat-password/:token"
              element={<RepeatPassword />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
