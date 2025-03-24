import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HamburguerMenu from "./HamburguerMenu";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Usuário",
    imageUrl: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsUserLoggedIn(parsedUser.isLoggedIn || false);
      setUserData({
        firstName: parsedUser.firstName || "Usuário",
        imageUrl: parsedUser.imageUrl || "https://via.placeholder.com/150",
      });
    }
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="flex justify-between items-center h-16 bg-gray-100 px-5 shadow">
      {isUserLoggedIn ? (
        <div className="flex items-center gap-2">
          <img
            src={userData.imageUrl}
            alt="Foto do usuário"
            className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer"
            onClick={toggleMenu}
          />
          <span className="text-gray-800 font-medium">{userData.firstName}</span>
        </div>
      ) : (
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" fill="none">
            <path fill="#0C1D2E" d="M7.707.293a1 1 0 0 1 0 1.414L2.414 7l5.293 5.293a1 1 0 1 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0Z" />
          </svg>
        </Link>
      )}
      <HamburguerMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </header>
  );
}

export default Header;
