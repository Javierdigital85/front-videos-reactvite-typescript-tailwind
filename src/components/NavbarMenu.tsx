//maneja el drop down y hace el un map similar al de navbar.tsx
// Es el componente que se encarga de renderizar el menú en pantallas pequeñas
import Navbarlink from "./Navbarlink";
interface Props {
  links: { newVideo: string; path: string }[];
  setNavbarOpen: (open: boolean) => void;
  logout: (e: React.MouseEvent<HTMLAnchorElement>) => Promise<void>;
}

const NavbarMenu = ({ links, setNavbarOpen, logout }: Props) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link) => (
        <li key={link.path}>
          <Navbarlink
            link={link.newVideo}
            linkTo={link.path}
            setNavbarOpen={setNavbarOpen}
            onClick={
              link.newVideo === "Log out"
                ? async (e) => {
                    await logout(e);
                    setNavbarOpen(false);
                  }
                : undefined
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default NavbarMenu;
