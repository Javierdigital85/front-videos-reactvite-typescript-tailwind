import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Navbarlink from "./Navbarlink";
import NavbarMenu from "./NavbarMenu";
import { useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";
import { MouseEvent } from "react";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_BACKEND_URL;
interface User {
  id: number;
}
interface RootState {
  user: User;
}

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const logout = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const res: AxiosResponse = await axios.post(
        `${URL}/api/users/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Server response:", res.data);
      dispatch(setUser({ id: 0 }));
      navigate("/");
      toast.success("You have logout!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Si el error es una respuesta de Axios
        if (error.response) {
          console.log("Error response data:", error.response.data);
          console.log("Error response status:", error.response.status);
        } else if (error.request) {
          // No se recibió respuesta del servidor
          console.log("No response received:", error.request);
        }
      } else {
        // Otro tipo de error (no relacionado con Axios)
        console.log("Error:", (error as Error).message);
      }
    }
  };

  const navLinks = user.id
    ? [
        { newVideo: "Create New Video", path: "/video-form" },
        { newVideo: "Log out", path: "/", onClick: logout },
      ]
    : [
        { newVideo: "Register", path: "/register" },
        { newVideo: "Login", path: "/" },
      ];

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#263285] bg-opacity-100">
      <div className="container mx-auto items-center flex justify-between text-white text-2xl shadow-lg p-2 font-lato">
        <div>{user.id ? <Link to={"/videolist"}>Home</Link> : ""}</div>
        <div className="block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded"
            >
              <Bars3Icon className="h-5 w-5 transition-all duration-300" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded"
            >
              <XMarkIcon className="h-5 w-5 transition-all duration-300" />
            </button>
          )}
        </div>

        <div className="hidden md:block md:w-auto">
          <ul className="flex p-4 md:p-0 md:flex-row mt-0">
            {navLinks.map((link) => (
              <Navbarlink
                key={link.path}
                link={link.newVideo}
                linkTo={link.path}
                onClick={link.onClick ? link.onClick : undefined}
              />
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? (
        <NavbarMenu links={navLinks} setNavbarOpen={setNavbarOpen} />
      ) : null}
    </nav>
  );
};

export default Navbar;
