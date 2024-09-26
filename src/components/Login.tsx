import { ChangeEvent, FormEvent, useState } from "react";
import astronaut from "../assets/astronaut-walk.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";
import openEye from "../assets/OpenEye.svg";
import closeEye from "../assets/Eye.svg";

const URL = import.meta.env.VITE_BACKEND_URL;
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setEye(!eye);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/api/users/login`, userData, {
        withCredentials: true,
      });
      dispatch(setUser(res.data));
      toast.success("You have loggin!");
      navigate("/videolist");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data;
        toast.warning(errorMessage);
      } else {
        toast.warning("An unexpected error occured!");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center text-2xl h-screen items-center mt-10">
      <div className="bg-black h-screen flex flex-col justify-center items-center w-full mb-10">
        <h1 className="text-white text-4xl md:text-8xl font-poppins text-center mt-20">
          Welcome to Videos Online App
        </h1>
        <div className="p-3">
          <img src={astronaut} alt="" className="rounded-full h-80 w-80" />
        </div>
        <p className="text-white mt-2 font-poppins text-center">
          Once registered you can Sign up and start storing your videos from urls.
        </p>
      </div>
      <div className=" bg-green-900 h-screen flex items-center w-full justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-md font-lato h-96 max-w-3xl w-full"
        >
          <h2 className="text-white flex justify-center mb-5 text-6xl font-poppins">
            Sign Up
          </h2>
          <input
            type="email"
            placeholder="email"
            className="w-full p-2 rounded-lg mb-3 font-poppins px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            onChange={handleChange}
            autoFocus
            required
          />
          <div className="relative">
            <input
              type={eye ? "text" : "password"}
              placeholder="password"
              className="border w-full p-2 px-3 rounded-lg mb-3 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              onChange={handleChange}
              required
            />
            <div
              className="absolute inset-y-1 right-0 pr-3 mb-3 flex items-center cursor-pointer"
              onClick={handleClick}
            >
              {eye ? <img src={openEye} /> : <img src={closeEye} />}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-blue-600 p-2 hover:bg-blue-500 rounded-md text-white w-full font-poppins"
            >
              Send
            </button>
          </div>
          <div className="mt-2">
            <Link to={"forgot-password"} className="text-white font-poppins">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
