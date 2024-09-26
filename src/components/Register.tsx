import { ChangeEvent, FormEvent, useState } from "react";
import astronaut from "../assets/astro1.webp";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BACKEND_URL;
const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/users/register`, user);
      toast.success("You have Registered!");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || "An error occured";
        toast.warning(errorMessage);
      } else {
        toast.warning("An unexpected error occured!");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center text-2xl h-screen items-center mt-5">
      <div className=" bg-black flex flex-col justify-center items-center  w-full sm:h-full md:h-screen">
        <h1 className="sm:text-7xl text-white text-7xl font-poppins text-center mt-40 md:mt-0">
          Videos Online App
        </h1>
        <div className="p-3">
          <img
            src={astronaut}
            alt="Astronaut"
            className="rounded-full h-80 w-80 sm:h-80 sm:w-80"
          />
        </div>

        <p className="text-white mt-2 font py-5 text-center font-poppins">
          Get access to your personal library!
        </p>
      </div>

      <div className=" bg-green-900 flex items-center w-full sm:h-full md:h-screen h-screen justify-center py-8 ">
        <form
          onSubmit={handleSubmit}
          className="p-4 max-w-md rounded-md  font-lato mx-auto"
        >
          <h2 className="text-white flex justify-center mb-2 font-poppins">Register</h2>
          <input
            type="text"
            placeholder="name"
            className="w-full p-2 px-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
            onChange={handleChange}
            name="name"
            value={user.name}
            autoFocus
            required
          />
          <input
            type="email"
            placeholder="email"
            className="border w-full p-2 px-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
            onChange={handleChange}
            name="email"
            value={user.email}
            required
          />
          <input
            type="text"
            placeholder="password"
            className="border w-full p-2 px-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
            onChange={handleChange}
            name="password"
            value={user.password}
            required
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="border bg-blue-600 p-2 hover:bg-blue-500 rounded-md text-white w-full font-poppins"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
