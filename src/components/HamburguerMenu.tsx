import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

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
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [menuContent, setMenuContent] = useState({
    imageUrl: "https://via.placeholder.com/150",
    name: "User Name",
    email: "user@mail.com",
  });

  // Função para atualizar os dados do usuário
  const updateUserData = () => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (isSignedIn && user) {
      const userData = {
        imageUrl: user.imageUrl || "https://via.placeholder.com/150",
        name: user.firstName || "User Name",
        email: user.primaryEmailAddress?.emailAddress || "user@mail.com",
      };

      setMenuContent(userData);
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
    } else if (storedUser) {
      setMenuContent(JSON.parse(storedUser));
    }
  };

  // Atualiza os dados sempre que o usuário muda (logado pelo Clerk ou localStorage)
  useEffect(() => {
    updateUserData();
  }, [isSignedIn, user]);

  // Verifica o localStorage quando o menu for aberto
  useEffect(() => {
    if (menuOpen) {
      updateUserData();
    }
  }, [menuOpen]);

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
      await signOut();
      localStorage.removeItem("loggedInUser");
      setMenuContent({
        imageUrl: "https://via.placeholder.com/150",
        name: "User Name",
        email: "user@mail.com",
      });
      navigate("/");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <>
      {menuOpen && (
        <div ref={menuRef} className="absolute top-0 left-0 h-full w-4/5 bg-white z-[102] lg:w-2/4">
          <div className="p-8 mb-6 flex items-center gap-4 border-b border-gray-300">
            <img src={menuContent.imageUrl} alt="user" className="w-16 h-16 rounded-2xl" />
            <div className="flex flex-col">
              <span className="text-lg font-medium text-main-color mb-1">{menuContent.name}</span>
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
