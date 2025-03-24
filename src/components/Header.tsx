import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import HamburguerMenu from "./HamburguerMenu";
// Importa o menu hambúrguer

function Header() {
  const { user, isSignedIn } = useUser(); // Dados do usuário e status de autenticação
  const [menuOpen, setMenuOpen] = useState(false); // Controla o menu hambúrguer

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna o menu
  };

  return (
    <header className="flex justify-between items-center h-16 bg-gray-100 px-5 shadow">
      {/* Quando o usuário está logado: foto e nome aparecem */}
      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <img
            src={user.imageUrl || "https://via.placeholder.com/150"}
            alt="Foto do usuário"
            className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer"
            onClick={toggleMenu} // Clicando na foto, abre o menu hambúrguer
          />
          <span className="text-gray-800 font-medium">{user?.firstName || "Usuário"}</span>
        </div>
      ) : (
        // Quando não está logado, volta o ícone padrão de seta
        <div className="absolute left-0 h-full flex items-center px-5 cursor-pointer">
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" fill="none">
              <path
                fill="#0C1D2E"
                fillRule="evenodd"
                d="M7.707.293a1 1 0 0 1 0 1.414L2.414 7l5.293 5.293a1 1 0 1 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      )}

      {/* Renderiza o menu hambúrguer */}
      <HamburguerMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </header>
  );
}

export default Header;
