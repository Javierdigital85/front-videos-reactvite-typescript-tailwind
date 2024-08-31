import { Link } from "react-router-dom";
// import bars from "../assets/bars.svg";
// import x from "../assets/x.svg";
import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Navbarlink from "./Navbarlink";
import NavbarMenu from "./NavbarMenu";

const navLinks = [{ newVideo: "Create a new video", path: "/video-form" }];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {});

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#3d4db1] bg-opacity-100">
      <div className="container mx-auto items-center flex justify-between text-white  text-lg shadow-lg p-2">
        <Link to={"/"}>Home</Link>
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
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link) => (
              <Navbarlink link={link.newVideo} linkTo={link.path} />
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
