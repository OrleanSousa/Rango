import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // Para obter dados do Clerk
import HamburguerMenu from "./HamburguerMenu";

function Header() {
  const { isSignedIn, user } = useUser(); // Dados do Clerk (caso logado)
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Usuário",
    email: "user@mail.com",
    imageUrl: "https://via.placeholder.com/150/150",
  });

  useEffect(() => {
    if (isSignedIn && user) {
      // Caso esteja logado com Clerk
      setUserData({
        firstName: user.firstName || "Usuário",
        email: user.emailAddresses[0]?.emailAddress || "user@mail.com", // Pegando email do Clerk
        imageUrl: user.imageUrl || "https://via.placeholder.com/150/150",
      });
    } else {
      // Verifica dados no localStorage se não estiver logado com Clerk
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          firstName: parsedUser.firstName || "Usuário",
          email: parsedUser.email || "user@mail.com",
          imageUrl: parsedUser.imageUrl || "https://via.placeholder.com/150/150",
        });
      }
    }
  }, [isSignedIn, user]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="flex justify-between items-center h-16 bg-gray-100 px-5 shadow">
      {(isSignedIn || userData.firstName !== "Usuário") ? (
        <div className="flex items-center gap-2">
          <img
            src={userData.imageUrl}
            alt="Foto do usuário"
            className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer"
            onClick={toggleMenu}
          />
          <div className="flex flex-col">
            <span className="text-gray-800 font-medium">{userData.firstName}</span>
            <span className="text-gray-500 text-sm">{userData.email}</span>
          </div>
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
