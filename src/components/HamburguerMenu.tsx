import { useAuth, useUser } from "@clerk/clerk-react"; // Para login/logout e dados do usuário
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItemProps {
  label: string;
  withSwitch?: boolean;
  isSignOut?: boolean;
  onClick?: () => void;
}

interface HamburgerMenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

function HamburgerMenu({ menuOpen, toggleMenu }: HamburgerMenuProps) {
  const { signOut } = useAuth();
  const { user } = useUser(); // Dados do usuário autenticado via Clerk
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuContent, setMenuContent] = useState({
    imageUrl: "https://via.placeholder.com/150",
    firstName: "User Name",
    email: "user@mail.com",
  });

  useEffect(() => {
    if (user) {
      setMenuContent({
        imageUrl: user.imageUrl || "https://via.placeholder.com/150",
        firstName: user.firstName || "User Name",
        email: user.emailAddresses[0]?.emailAddress || "user@mail.com",
      });
    }

    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleMenu(); // Fecha o menu se o clique for fora dele
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen, toggleMenu, user]);

  const handleSignOut = async () => {
    try {
      await signOut(); // Logout usando Clerk
      localStorage.removeItem("loggedInUser"); // Remove do localStorage
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <>
      {/* Botão Hamburguer */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-main-color rounded-md text-white lg:hidden"
      >
        {/* Ícone hamburguer */}
        {menuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path stroke="#fff" strokeWidth="2" d="M5 5L19 19M5 19L19 5"></path> {/* X para fechar */}
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path stroke="#fff" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16"></path> {/* Linhas */}
          </svg>
        )}
      </button>

      {/* Menu lateral */}
      {menuOpen && (
        <div ref={menuRef} className="fixed top-0 left-0 h-full w-4/5 bg-white z-50 lg:w-1/4">
          <div className="p-8 mb-6 flex items-center gap-4 border-b border-gray-300">
            <img src={menuContent.imageUrl} alt="user" className="w-16 h-16 rounded-2xl" />
            <div className="flex flex-col">
              <span className="text-lg font-medium text-main-color mb-1">{menuContent.firstName}</span>
              <span className="text-sm text-gray-600">{menuContent.email}</span>
            </div>
          </div>

          <ul className="px-5 pb-5">
            <MenuItem label="Personal Information" />
            <MenuItem label="My Orders" />
            <MenuItem label="Notifications" withSwitch />
            <MenuItem label="Support Center" />
            <MenuItem label="Sign Out" isSignOut onClick={handleSignOut} />
          </ul>
        </div>
      )}
    </>
  );
}

function MenuItem({ label, withSwitch = false, isSignOut = false, onClick }: MenuItemProps) {
  return (
    <li
      onClick={onClick}
      className={`flex justify-between items-center py-2.5 mb-2 cursor-pointer ${
        isSignOut ? "hover:text-red-500" : "hover:text-main-color"
      }`}
    >
      <span className={`text-base ${isSignOut ? "text-red-500" : "text-main-color"}`}>{label}</span>

      {withSwitch ? (
        <button className="w-10 bg-gray-300 rounded-xl p-0.5 flex items-center cursor-pointer">
          <div className="w-5 h-5 bg-text-color rounded-full"></div>
        </button>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none">
          <path stroke="#222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m1 9 4-4-4-4"></path>
        </svg>
      )}
    </li>
  );
}

export default HamburgerMenu;
