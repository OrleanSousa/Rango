import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react"; // Importa o hook useClerk para deslogar do Clerk

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
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isSignedIn } = useUser(); // Obtém os dados do usuário logado com Clerk
  const { signOut } = useClerk(); // Hook para deslogar do Clerk
  const [menuContent, setMenuContent] = useState({
    imageUrl: "https://via.placeholder.com/150",
    firstName: "User Name",
    email: "user@mail.com",
  });

  // Atualiza os dados do menu com base no usuário logado
  useEffect(() => {
    if (isSignedIn && user) {
      setMenuContent({
        imageUrl: user.imageUrl || "https://via.placeholder.com/150",
        firstName: user.firstName || "User Name",
        email: user.primaryEmailAddress?.emailAddress || "user@mail.com",
      });
    } else {
      // Caso o usuário não esteja logado, verifica o localStorage
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        setMenuContent({
          imageUrl: parsedUser.imageUrl || "https://via.placeholder.com/150",
          firstName: parsedUser.firstName || "User Name",
          email: parsedUser.email || "user@mail.com",
        });
      }
    }
  }, [isSignedIn, user]);

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleMenu();
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen, toggleMenu]);

  const handleSignOut = async () => {
    try {
      await signOut(); // Desloga do Clerk
      localStorage.removeItem("loggedInUser"); // Remove o usuário do localStorage
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <>
      {/* Menu lateral */}
      {menuOpen && (
        <div ref={menuRef} className="absolute top-0 left-0 h-full w-4/5 bg-white z-101 lg:w-2/4 ">
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