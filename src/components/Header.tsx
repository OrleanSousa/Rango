import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FaShoppingCart } from "react-icons/fa";
import HamburguerMenu from "./HamburguerMenu";

function Header() {
  const { isSignedIn, user } = useUser(); // Dados do Clerk
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Usuário",
    imageUrl: "https://via.placeholder.com/150/150",
  });

  useEffect(() => {
    if (isSignedIn && user) {
      setUserData({
        firstName: user.firstName || "Usuário",
        imageUrl: user.imageUrl || "https://via.placeholder.com/150/150",
      });
    } else {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          firstName: parsedUser.firstName || "Usuário",
          imageUrl: parsedUser.imageUrl || "https://via.placeholder.com/150/150",
        });
      }
    }
  }, [isSignedIn, user]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isUserLoggedIn = isSignedIn || localStorage.getItem("loggedInUser");

  return (
    <header className="flex justify-between items-center h-16 bg-gray-100 px-5 shadow">
      {/* Ícone de voltar à esquerda */}
      {!isUserLoggedIn && (
        <Link to="/" className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" fill="none">
            <path
              fill="#0C1D2E"
              d="M7.707.293a1 1 0 0 1 0 1.414L2.414 7l5.293 5.293a1 1 0 1 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 0Z"
            />
          </svg>
        </Link>
      )}

      {/* Conteúdo central flexível: Foto do usuário e carrinho */}
      {isUserLoggedIn && (
        <div className="flex items-center justify-between w-full">
          <img
            src={userData.imageUrl}
            alt="Foto do usuário"
            className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer"
            onClick={toggleMenu}
          />

          <div className="ml-auto">
            <FaShoppingCart
              onClick={toggleMenu}
              className="text-gray-800 text-2xl cursor-pointer"
            />
          </div>
        </div>
      )}

      <HamburguerMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </header>
  );
}

export default Header;
