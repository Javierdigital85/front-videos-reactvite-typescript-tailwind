//maneja el drop down y hace el un map similar al de navbar.tsx
import Navbarlink from "./Navbarlink";
interface Props {
  links: { newVideo: string; path: string }[];
  setNavbarOpen: (open: boolean) => void;
}

const NavbarMenu = ({ links,setNavbarOpen }: Props) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link) => (
        <li>
          <Navbarlink link={link.newVideo} linkTo={link.path} setNavbarOpen={setNavbarOpen}/>
        </li>
      ))}
    </ul>
  );
};

export default NavbarMenu;
