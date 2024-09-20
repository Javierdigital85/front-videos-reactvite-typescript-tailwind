import { ChangeEvent, FormEvent, useState } from "react";
import astronaut from "../assets/astronaut-walk.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";
const URL = import.meta.env.VITE_BACKEND_URL;
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${URL}/api/users/login`,
        userData,
        {
          withCredentials: true,
        }
      );
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
    <div className="flex justify-center text-2xl h-screen items-center">
      <div className="bg-black h-screen flex flex-col justify-center items-center w-full">
        <h1 className="text-white text-7xl font-lato">
          Welcome to universe Music!
        </h1>
        <div className="p-3">
          <img src={astronaut} alt="" className="rounded-full h-80 w-80" />
        </div>
        <p className="text-white mt-2 font">
          Once registered you can Sign up and start storing you videos.
        </p>
        <p className="text-white font-gothic text-6xl mt-10">Have fun</p>
      </div>
      <div className=" bg-green-900 h-screen flex items-center w-full justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-md  font-lato h-96"
        >
          <h2 className="text-white flex justify-center mb-3 text-6xl">
            Sign Up
          </h2>
          <input
            type="text"
            placeholder="email"
            className="border w-full p-2 px-3 rounded-lg mb-3"
            name="email"
            onChange={handleChange}
            autoFocus
          />
          <input
            type="text"
            placeholder="password"
            className="border w-full p-2 px-3 rounded-lg mb-3"
            name="password"
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-blue-600 p-2 hover:bg-blue-500 rounded-md text-white w-full"
            >
              Send
            </button>
          </div>
          <div className="mt-2">
          <Link to={"forgot-password"} className="text-white">
            Forgot password?
          </Link>
          </div>
       
        </form>
      </div>
    </div>
  );
};

export default Login;
