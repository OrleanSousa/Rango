import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";

interface MenuItemProps {
  label: string; // O texto do item de menu
  withSwitch?: boolean; // Indica se o item deve ter um botão de alternância
  isSignOut?: boolean; // Indica se o item é para logout
}

// Define os tipos das props do HamburgerMenu
interface HamburgerMenuProps {
  menuOpen: boolean; // Indica se o menu está aberto
  toggleMenu: () => void; // Função para alternar o estado do menu
}

function HamburgerMenu({ menuOpen, toggleMenu }: HamburgerMenuProps) {
  const { user } = useUser(); // Obtém informações do usuário
  const menuRef = useRef<HTMLDivElement>(null); // Cria uma referência para o menu

  // Fecha o menu se o usuário clicar fora dele
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleMenu(); // Fecha o menu se o clique estiver fora do modal
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Limpa o evento ao desmontar
    };
  }, [menuOpen, toggleMenu]);

  if (!menuOpen) return null; // Não renderiza se o menu estiver fechado

  return (
    <div ref={menuRef} className="fixed top-0 left-0 h-full w-4/5 bg-white z-50" style={{ zIndex: 101 }}>
      {/* Foto do usuário e informações básicas */}
      <div className="p-8 mb-6 flex items-center gap-4 border-b border-gray-300">
        <img
          src={user?.imageUrl || "https://via.placeholder.com/150"}
          alt="user"
          className="w-16 h-16 rounded-2xl"
        />
        <div className="flex flex-col">
          <span className="text-lg font-medium text-main-color mb-1">{user?.firstName || "User Name"}</span>
          <span className="text-sm text-gray-600">
            {user?.emailAddresses?.map(email => email.emailAddress).join(", ") || "user@mail.com"}
          </span>
        </div>
      </div>

      {/* Opções do menu */}
      <ul className="px-5 pb-5">
        <MenuItem label="Personal Information" />
        <MenuItem label="My Orders" />
        <MenuItem label="Promocodes & Gift Cards" />
        <MenuItem label="Notifications" withSwitch />
        <MenuItem label="Face ID" withSwitch />
        <MenuItem label="Support Center" />
        <MenuItem label="Sign Out" isSignOut />
      </ul>
    </div>
  );
}

// Componente de item de menu reutilizável
function MenuItem({ label, withSwitch = false, isSignOut = false }: MenuItemProps) {
  return (
    <li className="flex justify-between items-center py-2.5 mb-2">
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
