import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoList from "./components/VideoList";
import VideoForm from "./components/VideoForm";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<VideoList />} />
            <Route path="/video-form" element={<VideoForm />} />
            <Route path="/video-form/:id" element={<VideoForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
