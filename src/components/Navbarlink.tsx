import { Link } from "react-router-dom";
import { MouseEvent } from "react";
interface Props {
  link: string;
  linkTo: string;
  setNavbarOpen?: (open: boolean) => void;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const Navbarlink = ({ link, linkTo, setNavbarOpen, onClick }: Props) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    //cierra el menú cuando se hace clic en un enlace en pantallas pequeñas 
    if (setNavbarOpen) {
      setNavbarOpen(false);
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <Link
      to={linkTo}
      className="block py-1 pl-3 pr-4 sm:text-xl rounded text-white hover:font-extralight"
      onClick={handleClick}
    >
      {link}
    </Link>
  );
};

export default Navbarlink;
