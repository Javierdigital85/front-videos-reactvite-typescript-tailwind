import { Link } from "react-router-dom";
interface Props {
  link: string;
  linkTo: string;
  setNavbarOpen?: (open: boolean) => void;
}

const Navbarlink = ({ link, linkTo, setNavbarOpen }: Props) => {
  const handleClick = () => {
    if (setNavbarOpen) {
      setNavbarOpen(false);
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
